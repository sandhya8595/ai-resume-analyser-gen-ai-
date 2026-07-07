const { RecursiveCharacterTextSplitter } = require('langchain/text_splitter');

/**
 * Split resume text into overlapping chunks for embedding.
 * @param {string} text - Raw resume text
 * @param {object} options
 * @returns {Promise<string[]>} Array of text chunks
 */
const chunkText = async (text, options = {}) => {
  const {
    chunkSize = 1000,
    chunkOverlap = 200,
  } = options;

  const splitter = new RecursiveCharacterTextSplitter({
    chunkSize,
    chunkOverlap,
    separators: ['\n\n', '\n', '. ', ' ', ''],
  });

  const documents = await splitter.createDocuments([text]);
  const chunks = documents.map((doc) => doc.pageContent);

  console.log(`✂️  Chunked text into ${chunks.length} chunks (size=${chunkSize}, overlap=${chunkOverlap})`);
  return chunks;
};

module.exports = { chunkText };
