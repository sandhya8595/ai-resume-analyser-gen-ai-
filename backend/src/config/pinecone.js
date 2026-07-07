const { Pinecone } = require('@pinecone-database/pinecone');

let pineconeClient = null;

/**
 * Initialize and return the Pinecone client (singleton).
 */
const getPineconeClient = () => {
  if (!pineconeClient) {
    if (!process.env.PINECONE_API_KEY) {
      throw new Error('PINECONE_API_KEY is not set in environment variables');
    }
    pineconeClient = new Pinecone({
      apiKey: process.env.PINECONE_API_KEY,
    });
    console.log('✅ Pinecone client initialized');
  }
  return pineconeClient;
};

/**
 * Return the target Pinecone index.
 */
const getPineconeIndex = () => {
  const client = getPineconeClient();
  const indexName = process.env.PINECONE_INDEX_NAME || 'resume-analyser';
  return client.Index(indexName);
};

module.exports = { getPineconeClient, getPineconeIndex };
