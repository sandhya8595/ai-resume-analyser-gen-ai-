import axios from 'axios'

// In production: VITE_API_URL = https://your-backend.onrender.com
// In development: falls back to local proxy via vite.config.js
const BASE_URL = 'https://ai-resume-analyser-gen-ai-backend.onrender.com/api'

const api = axios.create({
  baseURL: BASE_URL,
  timeout: 120000, // 2 min — Gemini calls can be slow
  headers: { 'Content-Type': 'application/json' },
  withCredentials: true,
})

// Response interceptor — unwrap data or throw clean error
api.interceptors.response.use(
  (res) => res.data,
  (err) => {
    const message =
      err.response?.data?.message ||
      err.response?.data?.error ||
      err.message ||
      'Something went wrong'
    return Promise.reject(new Error(message))
  }
)

/**
 * Upload a PDF resume file.
 * @param {File} file
 * @param {Function} onProgress - (percent: number) => void
 * @returns {Promise<{ resumeId, fileName, wordCount, chunkCount }>}
 */
export const uploadResume = async (file, onProgress) => {
  const formData = new FormData()
  formData.append('resume', file)

  const res = await api.post('/upload-resume', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
    onUploadProgress: (e) => {
      if (onProgress && e.total) {
        onProgress(Math.round((e.loaded / e.total) * 100))
      }
    },
  })
  // Interceptor returns { success, data, message } — backend payload is in .data
  return res.data
}

/**
 * Run full AI analysis on an uploaded resume.
 * @param {string} resumeId
 * @param {string} jobDescription
 * @returns {Promise<Analysis>}
 */
export const analyzeResume = async (resumeId, jobDescription = '') => {
  const res = await api.post('/analyze-resume', { resumeId, jobDescription })
  // Interceptor already unwrapped axios res.data → { success, data, message }
  // res here = { success, data, message }, so return res.data for the payload
  return res
}

/**
 * Match resume against a specific job description.
 * @param {string} resumeId
 * @param {string} jobDescription
 * @returns {Promise<MatchResult>}
 */
export const matchJob = async (resumeId, jobDescription) => {
  const res = await api.post('/match-job', { resumeId, jobDescription })
  // Interceptor already unwrapped → res = { success, data, message }
  return res
}

/**
 * Generate tailored interview questions.
 * @param {string} resumeId
 * @param {string} jobDescription
 * @returns {Promise<InterviewQuestions>}
 */
export const generateInterviewQuestions = async (resumeId, jobDescription = '') => {
  const res = await api.post('/generate-interview-questions', { resumeId, jobDescription })
  // Interceptor already unwrapped → res = { success, data, message }
  return res
}

/**
 * Fetch stored analysis for a resume.
 * @param {string} resumeId
 * @returns {Promise<Analysis>}
 */
export const getAnalysis = async (resumeId) => {
  const res = await api.get(`/analysis/${resumeId}`)
  // Interceptor already unwrapped → res = { success, data }
  return res
}

export default api
