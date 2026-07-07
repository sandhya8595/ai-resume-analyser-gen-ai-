const { ChatGoogleGenerativeAI } = require('@langchain/google-genai');
const { HumanMessage } = require('@langchain/core/messages');

let geminiModel = null;
let activeModelName = null;

const DEFAULT_MODEL = process.env.GOOGLE_MODEL_NAME || 'gemini-2.5-flash';
const FALLBACK_MODELS = (process.env.GEMINI_FALLBACK_MODELS || 'gemini-3.5-flash,gemini-2.5-flash-lite,gemini-2.5-pro')
  .split(',')
  .map((model) => model.trim())
  .filter(Boolean);

const RETRYABLE_ERROR_PATTERN = /\b(429|500|503|504)\b|RESOURCE_EXHAUSTED|INTERNAL|UNAVAILABLE|DEADLINE_EXCEEDED|overloaded|high demand|temporarily/i;

const createGeminiInstance = (modelName) => {
  if (!process.env.GOOGLE_API_KEY) {
    throw new Error('GOOGLE_API_KEY is not set in environment variables');
  }

  return new ChatGoogleGenerativeAI({
    apiKey: process.env.GOOGLE_API_KEY,
    modelName,
    temperature: 0.3,
    maxOutputTokens: 8192,
  });
};

const getGeminiModel = (modelName = DEFAULT_MODEL) => {
  if (!geminiModel || activeModelName !== modelName) {
    geminiModel = createGeminiInstance(modelName);
    activeModelName = modelName;
    console.log(`Gemini model initialized: ${modelName}`);
  }

  return geminiModel;
};

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const isRetryableGeminiError = (error) => {
  const status = error?.status || error?.statusCode || error?.response?.status || '';
  const message = error?.message || '';
  return RETRYABLE_ERROR_PATTERN.test(`${status} ${message}`);
};

const parseGeminiJson = (rawContent) => {
  const jsonString = String(rawContent || '')
    .replace(/```json\n?/gi, '')
    .replace(/```\n?/gi, '')
    .trim();

  try {
    return JSON.parse(jsonString);
  } catch (parseError) {
    const jsonMatch = jsonString.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      return JSON.parse(jsonMatch[0]);
    }
    throw new Error(`Failed to parse Gemini JSON response: ${parseError.message}`);
  }
};

const invokeGeminiWithRetries = async (prompt, modelName, maxAttempts = 3) => {
  let lastError;

  for (let attempt = 1; attempt <= maxAttempts; attempt += 1) {
    try {
      const model = getGeminiModel(modelName);
      const startTime = Date.now();
      console.log(`Sending request to Gemini model ${modelName} (attempt ${attempt}/${maxAttempts})`);

      const response = await model.invoke([new HumanMessage(prompt)]);
      const elapsed = Date.now() - startTime;
      console.log(`Gemini model ${modelName} responded in ${elapsed}ms`);

      return parseGeminiJson(response.content);
    } catch (error) {
      lastError = error;

      if (!isRetryableGeminiError(error) || attempt === maxAttempts) {
        throw error;
      }

      const waitMs = 1000 * attempt;
      console.warn(`Gemini model ${modelName} is temporarily unavailable. Retrying in ${waitMs}ms...`);
      await sleep(waitMs);
    }
  }

  throw lastError;
};

/**
 * Send a prompt to Gemini and parse the JSON response.
 * @param {string} prompt
 * @returns {Promise<object>} Parsed JSON result
 */
const callGemini = async (prompt) => {
  const triedModels = [DEFAULT_MODEL];

  try {
    return await invokeGeminiWithRetries(prompt, DEFAULT_MODEL);
  } catch (error) {
    console.error('Gemini API error:', error.message);

    const shouldTryFallbacks = isRetryableGeminiError(error) || /not found|404/i.test(error.message);
    if (shouldTryFallbacks) {
      for (const candidate of FALLBACK_MODELS) {
        if (triedModels.includes(candidate)) continue;

        triedModels.push(candidate);

        try {
          console.log(`Retrying Gemini call with fallback model: ${candidate}`);
          return await invokeGeminiWithRetries(prompt, candidate, 2);
        } catch (retryError) {
          console.error(`Fallback model ${candidate} failed:`, retryError.message);
        }
      }
    }

    throw new Error(`Gemini analysis failed after trying ${triedModels.join(', ')}. Last error: ${error.message}`);
  }
};

/**
 * Call Gemini with a raw text prompt and return string content (no JSON parsing).
 * @param {string} prompt
 * @returns {Promise<string>}
 */
const callGeminiRaw = async (prompt) => {
  const model = getGeminiModel();
  const response = await model.invoke([new HumanMessage(prompt)]);
  return response.content;
};

module.exports = { callGemini, callGeminiRaw };
