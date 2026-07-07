const { processResumeUpload } = require('../services/analysisService');
const fs = require('fs');

/**
 * POST /api/upload-resume
 * Upload a PDF resume, parse it, chunk it, and vectorize to Pinecone.
 */
const uploadResume = async (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        error: 'NO_FILE',
        message: 'No PDF file uploaded. Please attach a file using the "resume" field.',
      });
    }

    const { path: filePath, originalname, filename } = req.file;

    console.log(`📤 Uploading resume: ${originalname}`);

    const resume = await processResumeUpload(filePath, originalname, filename);

    res.status(201).json({
      success: true,
      message: 'Resume uploaded and processed successfully',
      data: {
        resumeId: resume._id,
        fileName: resume.originalName,
        wordCount: resume.wordCount,
        chunkCount: resume.chunkCount,
        isProcessed: resume.isProcessed,
        uploadedAt: resume.createdAt,
      },
    });
  } catch (error) {
    // Clean up uploaded file on error
    if (req.file?.path && fs.existsSync(req.file.path)) {
      try {
        fs.unlinkSync(req.file.path);
      } catch (unlinkError) {
        console.error('⚠️ Failed to delete uploaded file during error cleanup:', unlinkError.message);
      }
    }
    next(error);
  }
};

/**
 * GET /api/resume/:id
 * Fetch a stored resume by ID.
 */
const getResume = async (req, res, next) => {
  try {
    const Resume = require('../models/Resume');
    const resume = await Resume.findById(req.params.id).select('-parsedText');
    if (!resume) {
      return res.status(404).json({ success: false, message: 'Resume not found' });
    }
    res.json({ success: true, data: resume });
  } catch (error) {
    next(error);
  }
};

module.exports = { uploadResume, getResume };
