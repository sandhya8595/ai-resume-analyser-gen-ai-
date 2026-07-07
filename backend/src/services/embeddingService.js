const { GoogleGenerativeAI } = require('@google/generative-ai');
const { getPineconeIndex } = require('../config/pinecone');
const { v4: uuidv4 } = require('uuid');

let genAIClient = null;

const getGenAIClient = () => {
  if (!genAIClient) {
    if (!process.env.GOOGLE_API_KEY) {
      throw new Error('GOOGLE_API_KEY is not set in environment variables');
    }
    genAIClient = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);
  }
  return genAIClient;
};

const getEmbeddingsModel = () => {
  const client = getGenAIClient();
  return client.getGenerativeModel({ model: 'gemini-embedding-001' });
};

/**
 * Generate an embedding vector for a single text string.
 * @param {string} text
 * @returns {Promise<number[]>}
 */
const generateEmbedding = async (text) => {
  const model = getEmbeddingsModel();
  const result = await model.embedContent({
    content: { parts: [{ text }] },
    outputDimensionality: 768,
  });
  return result.embedding.values;
};

/**
 * Upsert an array of text chunks into Pinecone.
 * @param {string[]} chunks      - Text chunks to embed and store
 * @param {string}   namespace   - Pinecone namespace (resumeId)
 * @param {object}   metadata    - Extra metadata to attach to each vector
 * @returns {Promise<{ vectorIds: string[], count: number }>}
 */
const upsertChunksToPinecone = async (chunks, namespace, metadata = {}) => {
  const index = getPineconeIndex();
  const model = getEmbeddingsModel();

  console.log(`🔢 Generating embeddings for ${chunks.length} chunks…`);

  // Batch embed chunks in smaller groups to prevent 'fetch failed' payload/timeout issues
  const embeddings = [];
  const EMBED_BATCH_SIZE = 10;
  for (let i = 0; i < chunks.length; i += EMBED_BATCH_SIZE) {
    const chunkBatch = chunks.slice(i, i + EMBED_BATCH_SIZE);
    const result = await model.batchEmbedContents({
      requests: chunkBatch.map((chunk) => ({
        content: { parts: [{ text: chunk }] },
        outputDimensionality: 768,
      })),
    });
    embeddings.push(...result.embeddings.map((e) => e.values));
  }

  // Build Pinecone vectors
  const vectors = chunks.map((chunk, i) => ({
    id: `${namespace}-chunk-${i}-${uuidv4().slice(0, 8)}`,
    values: embeddings[i],
    metadata: {
      ...metadata,
      namespace,
      chunkIndex: i,
      text: chunk.substring(0, 1000), // Pinecone metadata limit
    },
  }));

  // Upsert in batches of 100 (Pinecone limit)
  const BATCH_SIZE = 100;
  for (let i = 0; i < vectors.length; i += BATCH_SIZE) {
    const batch = vectors.slice(i, i + BATCH_SIZE);
    await index.namespace(namespace).upsert(batch);
    console.log(`📤 Upserted batch ${Math.floor(i / BATCH_SIZE) + 1}/${Math.ceil(vectors.length / BATCH_SIZE)}`);
  }

  const vectorIds = vectors.map((v) => v.id);
  console.log(`✅ Upserted ${vectorIds.length} vectors to Pinecone namespace: ${namespace}`);

  return { vectorIds, count: vectorIds.length };
};

/**
 * Delete all vectors in a Pinecone namespace.
 * @param {string} namespace
 */
const deleteNamespace = async (namespace) => {
  const index = getPineconeIndex();
  await index.namespace(namespace).deleteAll();
  console.log(`🗑️  Deleted Pinecone namespace: ${namespace}`);
};

module.exports = { generateEmbedding, upsertChunksToPinecone, deleteNamespace };
