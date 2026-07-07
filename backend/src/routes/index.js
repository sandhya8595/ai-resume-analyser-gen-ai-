const express = require('express');
const router = express.Router();

const upload = require('../middleware/upload');
const { validateAnalyze, validateMatchJob, validateInterviewQuestions } = require('../middleware/validate');

const { uploadResume, getResume } = require('../controllers/uploadController');
const { analyzeResumeController, getAnalysis } = require('../controllers/analyzeController');
const { matchJobController } = require('../controllers/matchController');
const { generateInterviewQuestionsController } = require('../controllers/interviewController');

// ── Upload ─────────────────────────────────────────────────────────────────────
// POST /api/upload-resume
router.post('/upload-resume', upload.single('resume'), uploadResume);

// GET /api/resume/:id
router.get('/resume/:id', getResume);

// ── Analysis ───────────────────────────────────────────────────────────────────
// POST /api/analyze-resume
router.post('/analyze-resume', validateAnalyze, analyzeResumeController);

// GET /api/analysis/:resumeId
router.get('/analysis/:resumeId', getAnalysis);

// ── Job Matching ───────────────────────────────────────────────────────────────
// POST /api/match-job
router.post('/match-job', validateMatchJob, matchJobController);

// ── Interview Questions ────────────────────────────────────────────────────────
// POST /api/generate-interview-questions
router.post('/generate-interview-questions', validateInterviewQuestions, generateInterviewQuestionsController);

module.exports = router;
