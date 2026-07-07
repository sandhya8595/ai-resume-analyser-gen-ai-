import { useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAnalysis } from '../context/AnalysisContext'
import {
  uploadResume as apiUpload,
  analyzeResume as apiAnalyze,
  matchJob as apiMatchJob,
  generateInterviewQuestions as apiGenQs,
} from '../services/api'

/**
 * Custom hook that orchestrates the full upload → analyze → match → interview Qs flow.
 */
export function useAnalysisFlow() {
  const navigate = useNavigate()
  const {
    resumeId, setResumeId,
    setResumeMeta,
    jobDescription,
    setAnalysis,
    setMatchResult,
    setInterviewQs,
    setUploading,
    setAnalyzing,
    setMatching,
    setGeneratingQs,
    setError,
    clearError,
  } = useAnalysis()

  /**
   * Step 1: Upload PDF → vectorize → return resumeId
   */
  const handleUpload = useCallback(async (file, onProgress) => {
    clearError()
    setUploading(true)
    try {
      const data = await apiUpload(file, onProgress)
      setResumeId(data.resumeId)
      setResumeMeta({
        fileName:   data.fileName,
        wordCount:  data.wordCount,
        chunkCount: data.chunkCount,
        uploadedAt: data.uploadedAt,
      })
      return data.resumeId
    } catch (err) {
      setError(err.message)
      throw err
    } finally {
      setUploading(false)
    }
  }, [clearError, setUploading, setResumeId, setResumeMeta, setError])

  /**
   * Step 2: Full AI analysis (RAG + Gemini)
   */
  const handleAnalyze = useCallback(async (id, jd = '') => {
    clearError()
    setAnalyzing(true)
    try {
      const data = await apiAnalyze(id || resumeId, jd || jobDescription)
      setAnalysis(data)
      return data
    } catch (err) {
      setError(err.message)
      throw err
    } finally {
      setAnalyzing(false)
    }
  }, [clearError, setAnalyzing, resumeId, jobDescription, setAnalysis, setError])

  /**
   * Step 3: Job description matching
   */
  const handleMatchJob = useCallback(async (id, jd) => {
    clearError()
    setMatching(true)
    try {
      const data = await apiMatchJob(id || resumeId, jd || jobDescription)
      setMatchResult(data)
      return data
    } catch (err) {
      setError(err.message)
      throw err
    } finally {
      setMatching(false)
    }
  }, [clearError, setMatching, resumeId, jobDescription, setMatchResult, setError])

  /**
   * Step 4: Generate interview questions
   */
  const handleGenerateQuestions = useCallback(async (id, jd = '') => {
    clearError()
    setGeneratingQs(true)
    try {
      const data = await apiGenQs(id || resumeId, jd || jobDescription)
      setInterviewQs(data)
      return data
    } catch (err) {
      setError(err.message)
      throw err
    } finally {
      setGeneratingQs(false)
    }
  }, [clearError, setGeneratingQs, resumeId, jobDescription, setInterviewQs, setError])

  /**
   * Full pipeline: upload → analyze → match (if JD) → interview Qs → navigate
   */
  const runFullPipeline = useCallback(async (file, jd = '', onProgress) => {
    try {
      // 1. Upload
      const id = await handleUpload(file, onProgress)

      // 2. Analyze (includes JD matching in one call if JD provided)
      await handleAnalyze(id, jd)

      // 3. Match job separately for detailed match data if JD provided
      if (jd.trim().length >= 50) {
        await handleMatchJob(id, jd)
      }

      // 4. Generate interview questions
      await handleGenerateQuestions(id, jd)

      // 5. Navigate to dashboard
      navigate(`/analysis/${id}`)
    } catch (err) {
      console.error('Pipeline error:', err.message)
      // Error already set in individual handlers
    }
  }, [handleUpload, handleAnalyze, handleMatchJob, handleGenerateQuestions, navigate])

  return {
    handleUpload,
    handleAnalyze,
    handleMatchJob,
    handleGenerateQuestions,
    runFullPipeline,
  }
}
