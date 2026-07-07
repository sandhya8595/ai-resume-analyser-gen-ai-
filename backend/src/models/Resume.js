const mongoose = require('mongoose');

const resumeSchema = new mongoose.Schema(
  {
    fileName: {
      type: String,
      required: [true, 'File name is required'],
      trim: true,
    },
    originalName: {
      type: String,
      required: [true, 'Original file name is required'],
      trim: true,
    },
    filePath: {
      type: String,
      required: [true, 'File path is required'],
    },
    parsedText: {
      type: String,
      required: [true, 'Parsed text is required'],
    },
    wordCount: {
      type: Number,
      default: 0,
    },
    vectorNamespace: {
      type: String,
      default: '',
    },
    chunkCount: {
      type: Number,
      default: 0,
    },
    isProcessed: {
      type: Boolean,
      default: false,
    },
    metadata: {
      type: mongoose.Schema.Types.Mixed,
      default: {},
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Virtual: truncated preview
resumeSchema.virtual('preview').get(function () {
  return this.parsedText ? this.parsedText.substring(0, 300) + '…' : '';
});

module.exports = mongoose.model('Resume', resumeSchema);
