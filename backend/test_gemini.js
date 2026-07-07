require('dotenv').config();
const axios = require('axios');

async function run() {
  const apiKey = process.env.GOOGLE_API_KEY;
  console.log("API Key exists:", !!apiKey);
  console.log("API Key start:", apiKey ? apiKey.substring(0, 10) : "none");

  try {
    const url = `https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`;
    console.log("Fetching models list from Gemini API...");
    const res = await axios.get(url);
    console.log("SUCCESS! Models found:");
    if (res.data && res.data.models) {
      res.data.models.forEach(m => {
        console.log(`- ${m.name} (supports: ${m.supportedGenerationMethods.join(', ')})`);
      });
    } else {
      console.log("Response structure:", res.data);
    }
  } catch (err) {
    console.error("API Call failed!");
    if (err.response) {
      console.error("Status Code:", err.response.status);
      console.error("Status Text:", err.response.statusText);
      console.error("Headers:", err.response.headers);
      console.error("Response Data:", JSON.stringify(err.response.data, null, 2));
    } else {
      console.error(err.message);
    }
  }
}

run();
