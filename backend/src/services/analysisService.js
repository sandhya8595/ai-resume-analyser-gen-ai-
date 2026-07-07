const Resume = require('../models/Resume');
const Analysis = require('../models/Analysis');
const { parsePDF } = require('./pdfParser');
const { chunkText } = require('../utils/chunker');
const { upsertChunksToPinecone } = require('./embeddingService');
const { retrieveFullResumeContext, retrieveRelevantContext } = require('./ragService');
const { callGemini } = require('./geminiService');
const {
  RESUME_ANALYSIS_PROMPT,
  JOB_MATCH_PROMPT,
  INTERVIEW_QUESTIONS_PROMPT,
} = require('../utils/promptTemplates');

/**
 * Full pipeline: parse PDF → chunk → embed → store in Pinecone + MongoDB
 * @param {string} filePath
 * @param {string} originalName
 * @param {string} fileName
 * @returns {Promise<Resume>}
 */
const processResumeUpload = async (filePath, originalName, fileName) => {
  // 1. Parse PDF
  const { text, pageCount, wordCount } = await parsePDF(filePath);
  if (!text || text.length < 50) {
    throw new Error('Could not extract meaningful text from PDF. Please ensure the PDF is not scanned/image-only.');
  }

  // 2. Chunk the text
  const chunks = await chunkText(text, { chunkSize: 1000, chunkOverlap: 200 });

  // 3. Create resume record (get the ID for namespace)
  const resume = await Resume.create({
    fileName,
    originalName,
    filePath,
    parsedText: text,
    wordCount,
    isProcessed: false,
    metadata: { pageCount },
  });

  // 4. Embed chunks and upsert to Pinecone using resumeId as namespace
  const namespace = resume._id.toString();
  const { count } = await upsertChunksToPinecone(chunks, namespace, {
    resumeId: resume._id.toString(),
    fileName,
  });

  // 5. Update resume record as processed
  resume.vectorNamespace = namespace;
  resume.chunkCount = count;
  resume.isProcessed = true;
  await resume.save();

  console.log(`✅ Resume processed: ${resume._id} | ${chunks.length} chunks | ${wordCount} words`);
  return resume;
};

/**
 * Full AI analysis using RAG + Gemini.
 * @param {string} resumeId
 * @param {string} jobDescription
 * @returns {Promise<Analysis>}
 */
const analyzeResume = async (resumeId, jobDescription = '') => {
  const startTime = Date.now();

  // 1. Fetch resume from DB
  const resume = await Resume.findById(resumeId);
  if (!resume) throw new Error('Resume not found');
  if (!resume.isProcessed) throw new Error('Resume is still being processed. Please try again.');

  // 2. RAG: Retrieve relevant context from Pinecone
  const query = jobDescription
    ? `skills experience ${jobDescription.substring(0, 500)}`
    : 'skills experience education achievements projects';

  const context = await retrieveRelevantContext(query, resume.vectorNamespace, 10);

  // Use full parsed text as fallback if RAG retrieval is sparse
  const resumeText = context.length > 200 ? context : resume.parsedText;

  // 3. Build prompt and call Gemini
  const prompt = RESUME_ANALYSIS_PROMPT(resumeText, jobDescription);
  const result = await callGemini(prompt);

  // 4. Persist analysis to MongoDB
  const processingTime = Date.now() - startTime;

  const analysis = await Analysis.create({
    resumeId,
    jobDescription,
    summary: result.summary || '',
    atsScore: Math.min(100, Math.max(0, result.atsScore || 0)),
    matchPercentage: Math.min(100, Math.max(0, result.matchPercentage || 0)),
    extractedSkills: result.extractedSkills || { technical: [], soft: [], tools: [] },
    missingSkills: result.missingSkills || [],
    strengths: result.strengths || [],
    weaknesses: result.weaknesses || [],
    improvements: result.improvements || [],
    hiringRecommendation: result.hiringRecommendation || {
      verdict: 'Consider',
      reasoning: '',
      confidenceScore: 0,
    },
    interviewQuestions: { technical: [], behavioral: [], situational: [] },
    processingTime,
  });

  console.log(`✅ Analysis complete: ${analysis._id} | ${processingTime}ms`);
  return analysis;
};

/**
 * Job description matching analysis.
 * @param {string} resumeId
 * @param {string} jobDescription
 * @returns {Promise<object>}
 */
const matchJob = async (resumeId, jobDescription) => {
  const resume = await Resume.findById(resumeId);
  if (!resume) throw new Error('Resume not found');

  const context = await retrieveRelevantContext(
    jobDescription.substring(0, 500),
    resume.vectorNamespace,
    10
  );

  const resumeText = context.length > 200 ? context : resume.parsedText;
  const prompt = JOB_MATCH_PROMPT(resumeText, jobDescription);
  const result = await callGemini(prompt);

  // Update the existing analysis if present
  await Analysis.findOneAndUpdate(
    { resumeId },
    {
      jobDescription,
      matchPercentage: Math.min(100, Math.max(0, result.matchPercentage || 0)),
      missingSkills: result.missingSkills || [],
      hiringRecommendation: result.hiringRecommendation || {},
    },
    { sort: { createdAt: -1 } }
  );

  return result;
};

/**
 * Generate tailored interview questions.
 * @param {string} resumeId
 * @param {string} jobDescription
 * @returns {Promise<object>}
 */
const generateInterviewQuestions = async (resumeId, jobDescription = '') => {
  const resume = await Resume.findById(resumeId);
  if (!resume) throw new Error('Resume not found');

  const context = await retrieveFullResumeContext(resume.vectorNamespace, 15);
  const resumeText = context.length > 200 ? context : resume.parsedText;

  const prompt = INTERVIEW_QUESTIONS_PROMPT(resumeText, jobDescription);
  const result = await callGemini(prompt);

  // Update analysis record with interview questions
  await Analysis.findOneAndUpdate(
    { resumeId },
    {
      interviewQuestions: {
        technical: result.technical || [],
        behavioral: result.behavioral || [],
        situational: result.situational || [],
      },
    },
    { sort: { createdAt: -1 } }
  );

  return result;
};

module.exports = {
  processResumeUpload,
  analyzeResume,
  matchJob,
  generateInterviewQuestions,
};
