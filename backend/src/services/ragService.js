const { getPineconeIndex } = require('../config/pinecone');
const { generateEmbedding } = require('./embeddingService');

/**
 * Perform semantic similarity search in Pinecone.
 * @param {string} query      - Query text to search against
 * @param {string} namespace  - Pinecone namespace (resumeId)
 * @param {number} topK       - Number of results to return
 * @returns {Promise<string>} - Concatenated context from top matching chunks
 */
const retrieveRelevantContext = async (query, namespace, topK = 5) => {
  try {
    const index = getPineconeIndex();

    // Generate query embedding
    const queryEmbedding = await generateEmbedding(query);

    // Query Pinecone
    const queryResponse = await index.namespace(namespace).query({
      vector: queryEmbedding,
      topK,
      includeMetadata: true,
    });

    if (!queryResponse.matches || queryResponse.matches.length === 0) {
      console.warn(`⚠️  No matches found in namespace: ${namespace}`);
      return '';
    }

    // Extract and concatenate relevant text chunks
    const context = queryResponse.matches
      .filter((match) => match.score > 0.3) // Minimum similarity threshold
      .map((match) => match.metadata?.text || '')
      .filter(Boolean)
      .join('\n\n---\n\n');

    console.log(`🔍 Retrieved ${queryResponse.matches.length} chunks (${context.length} chars) from Pinecone`);
    return context;
  } catch (error) {
    console.error('❌ RAG retrieval error:', error.message);
    throw new Error(`Failed to retrieve context: ${error.message}`);
  }
};

/**
 * Retrieve full resume context for a given namespace.
 * @param {string} namespace
 * @param {number} topK
 * @returns {Promise<string>}
 */
const retrieveFullResumeContext = async (namespace, topK = 20) => {
  return retrieveRelevantContext(
    'resume professional experience skills education achievements projects',
    namespace,
    topK
  );
};

module.exports = { retrieveRelevantContext, retrieveFullResumeContext };
