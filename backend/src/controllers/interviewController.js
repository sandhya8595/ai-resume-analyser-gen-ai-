const { generateInterviewQuestions } = require('../services/analysisService');

/**
 * POST /api/generate-interview-questions
 * Generate tailored technical, behavioral, and situational interview questions.
 */
const generateInterviewQuestionsController = async (req, res, next) => {
  try {
    const { resumeId, jobDescription = '' } = req.body;

    console.log(`📝 Generating interview questions for resume: ${resumeId}`);

    const result = await generateInterviewQuestions(resumeId, jobDescription);

    res.status(200).json({
      success: true,
      message: 'Interview questions generated successfully',
      data: {
        resumeId,
        technical: result.technical || [],
        behavioral: result.behavioral || [],
        situational: result.situational || [],
        roleSpecific: result.roleSpecific || [],
        totalQuestions:
          (result.technical?.length || 0) +
          (result.behavioral?.length || 0) +
          (result.situational?.length || 0) +
          (result.roleSpecific?.length || 0),
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { generateInterviewQuestionsController };
