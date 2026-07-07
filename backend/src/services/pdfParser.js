const pdfParse = require('pdf-parse');
const fs = require('fs');

/**
 * Parse a PDF file and extract its text content.
 * @param {string} filePath - Absolute path to the PDF file
 * @returns {Promise<{ text: string, pageCount: number, info: object }>}
 */
const parsePDF = async (filePath) => {
  try {
    const dataBuffer = fs.readFileSync(filePath);
    const data = await pdfParse(dataBuffer);

    const cleanedText = data.text
      .replace(/\r\n/g, '\n')
      .replace(/\r/g, '\n')
      .replace(/\n{3,}/g, '\n\n')
      .replace(/[^\S\n]+/g, ' ')
      .trim();

    console.log(`📄 Parsed PDF: ${data.numpages} pages, ${cleanedText.length} chars`);

    return {
      text: cleanedText,
      pageCount: data.numpages,
      info: data.info || {},
      wordCount: cleanedText.split(/\s+/).filter(Boolean).length,
    };
  } catch (error) {
    console.error('❌ PDF parsing error:', error.message);
    throw new Error(`Failed to parse PDF: ${error.message}`);
  }
};

module.exports = { parsePDF };
