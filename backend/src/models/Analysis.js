const mongoose = require('mongoose');

const analysisSchema = new mongoose.Schema(
  {
    resumeId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Resume',
      required: true,
      index: true,
    },
    jobDescription: {
      type: String,
      default: '',
    },
    // ── Core Results ────────────────────────────────────────────────────────
    summary: {
      type: String,
      default: '',
    },
    atsScore: {
      type: Number,
      min: 0,
      max: 100,
      default: 0,
    },
    matchPercentage: {
      type: Number,
      min: 0,
      max: 100,
      default: 0,
    },
    // ── Skills ──────────────────────────────────────────────────────────────
    extractedSkills: {
      technical: { type: [String], default: [] },
      soft: { type: [String], default: [] },
      tools: { type: [String], default: [] },
    },
    missingSkills: {
      type: [String],
      default: [],
    },
    // ── Recommendations ─────────────────────────────────────────────────────
    improvements: {
      type: [String],
      default: [],
    },
    strengths: {
      type: [String],
      default: [],
    },
    weaknesses: {
      type: [String],
      default: [],
    },
    // ── Interview Questions ──────────────────────────────────────────────────
    interviewQuestions: {
      technical: { type: [String], default: [] },
      behavioral: { type: [String], default: [] },
      situational: { type: [String], default: [] },
    },
    // ── Hiring Recommendation ────────────────────────────────────────────────
    hiringRecommendation: {
      verdict: {
        type: String,
        enum: ['Strong Hire', 'Hire', 'Consider', 'Reject'],
        default: 'Consider',
      },
      reasoning: { type: String, default: '' },
      confidenceScore: { type: Number, min: 0, max: 100, default: 0 },
    },
    // ── Metadata ─────────────────────────────────────────────────────────────
    processingTime: {
      type: Number, // ms
      default: 0,
    },
    model: {
      type: String,
      default: 'gemini-2.5-flash',
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

module.exports = mongoose.model('Analysis', analysisSchema);
