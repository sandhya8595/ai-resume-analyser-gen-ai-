const { body, param, validationResult } = require('express-validator');

/**
 * Run validation rules and return 400 if any fail.
 */
const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      error: 'VALIDATION_ERROR',
      message: errors.array()[0].msg,
      errors: errors.array(),
    });
  }
  next();
};

// Validation rule sets
const validateAnalyze = [
  body('resumeId')
    .notEmpty().withMessage('resumeId is required')
    .isMongoId().withMessage('resumeId must be a valid MongoDB ObjectId'),
  validate,
];

const validateMatchJob = [
  body('resumeId')
    .notEmpty().withMessage('resumeId is required')
    .isMongoId().withMessage('resumeId must be a valid MongoDB ObjectId'),
  body('jobDescription')
    .notEmpty().withMessage('jobDescription is required')
    .isLength({ min: 50 }).withMessage('jobDescription must be at least 50 characters'),
  validate,
];

const validateInterviewQuestions = [
  body('resumeId')
    .notEmpty().withMessage('resumeId is required')
    .isMongoId().withMessage('resumeId must be a valid MongoDB ObjectId'),
  validate,
];

module.exports = {
  validate,
  validateAnalyze,
  validateMatchJob,
  validateInterviewQuestions,
};
