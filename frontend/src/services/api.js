import axios from 'axios'

const BASE_URL = import.meta.env.VITE_API_URL || '/api'

const api = axios.create({
  baseURL: BASE_URL,
  timeout: 120000, // 2 min — Gemini calls can be slow
  headers: { 'Content-Type': 'application/json' },
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
  return res.data
}

/**
 * Match resume against a specific job description.
 * @param {string} resumeId
 * @param {string} jobDescription
 * @returns {Promise<MatchResult>}
 */
export const matchJob = async (resumeId, jobDescription) => {
  const res = await api.post('/match-job', { resumeId, jobDescription })
  return res.data
}

/**
 * Generate tailored interview questions.
 * @param {string} resumeId
 * @param {string} jobDescription
 * @returns {Promise<InterviewQuestions>}
 */
export const generateInterviewQuestions = async (resumeId, jobDescription = '') => {
  const res = await api.post('/generate-interview-questions', { resumeId, jobDescription })
  return res.data
}

/**
 * Fetch stored analysis for a resume.
 * @param {string} resumeId
 * @returns {Promise<Analysis>}
 */
export const getAnalysis = async (resumeId) => {
  const res = await api.get(`/analysis/${resumeId}`)
  return res.data
}

export default api
