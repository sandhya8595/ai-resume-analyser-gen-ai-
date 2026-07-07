const { matchJob } = require('../services/analysisService');

/**
 * POST /api/match-job
 * Match a resume against a job description, return skill gaps + match score.
 */
const matchJobController = async (req, res, next) => {
  try {
    const { resumeId, jobDescription } = req.body;

    console.log(`🎯 Matching job for resume: ${resumeId}`);

    const result = await matchJob(resumeId, jobDescription);

    res.status(200).json({
      success: true,
      message: 'Job matching analysis completed',
      data: {
        resumeId,
        matchPercentage: result.matchPercentage,
        matchedSkills: result.matchedSkills || [],
        missingSkills: result.missingSkills || [],
        keywordMatches: result.keywordMatches || [],
        experienceMatch: result.experienceMatch || {},
        educationMatch: result.educationMatch || {},
        roleCompatibility: result.roleCompatibility || '',
        hiringRecommendation: result.hiringRecommendation || {},
        improvements: result.improvements || [],
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { matchJobController };
