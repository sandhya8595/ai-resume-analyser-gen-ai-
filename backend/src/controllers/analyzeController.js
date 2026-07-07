const { analyzeResume } = require('../services/analysisService');
const Analysis = require('../models/Analysis');

/**
 * POST /api/analyze-resume
 * Run full RAG + Gemini analysis on an uploaded resume.
 */
const analyzeResumeController = async (req, res, next) => {
  try {
    const { resumeId, jobDescription = '' } = req.body;

    console.log(`🔍 Analyzing resume: ${resumeId}`);

    const analysis = await analyzeResume(resumeId, jobDescription);

    res.status(200).json({
      success: true,
      message: 'Resume analyzed successfully',
      data: {
        analysisId: analysis._id,
        resumeId: analysis.resumeId,
        summary: analysis.summary,
        atsScore: analysis.atsScore,
        matchPercentage: analysis.matchPercentage,
        extractedSkills: analysis.extractedSkills,
        missingSkills: analysis.missingSkills,
        strengths: analysis.strengths,
        weaknesses: analysis.weaknesses,
        improvements: analysis.improvements,
        hiringRecommendation: analysis.hiringRecommendation,
        processingTime: analysis.processingTime,
        analyzedAt: analysis.createdAt,
      },
    });
  } catch (error) {
    next(error);
  }
};

/**
 * GET /api/analysis/:resumeId
 * Fetch the latest analysis for a resume.
 */
const getAnalysis = async (req, res, next) => {
  try {
    const analysis = await Analysis.findOne({ resumeId: req.params.resumeId })
      .sort({ createdAt: -1 });

    if (!analysis) {
      return res.status(404).json({
        success: false,
        message: 'No analysis found for this resume. Please run an analysis first.',
      });
    }

    res.json({ success: true, data: analysis });
  } catch (error) {
    next(error);
  }
};

module.exports = { analyzeResumeController, getAnalysis };
