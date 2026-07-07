import { createContext, useContext, useState, useCallback } from 'react'

const AnalysisContext = createContext(null)

export const useAnalysis = () => {
  const ctx = useContext(AnalysisContext)
  if (!ctx) throw new Error('useAnalysis must be used inside AnalysisProvider')
  return ctx
}

export function AnalysisProvider({ children }) {
  // Upload state
  const [resumeId, setResumeId]       = useState(null)
  const [resumeMeta, setResumeMeta]   = useState(null) // { fileName, wordCount, chunkCount }

  // Job Description
  const [jobDescription, setJobDescription] = useState('')

  // Analysis results
  const [analysis, setAnalysis]             = useState(null)
  const [matchResult, setMatchResult]       = useState(null)
  const [interviewQs, setInterviewQs]       = useState(null)

  // Loading states
  const [uploading, setUploading]           = useState(false)
  const [analyzing, setAnalyzing]           = useState(false)
  const [matching, setMatching]             = useState(false)
  const [generatingQs, setGeneratingQs]     = useState(false)

  // Errors
  const [error, setError]                   = useState(null)

  const clearError = useCallback(() => setError(null), [])

  const reset = useCallback(() => {
    setResumeId(null)
    setResumeMeta(null)
    setJobDescription('')
    setAnalysis(null)
    setMatchResult(null)
    setInterviewQs(null)
    setError(null)
  }, [])

  const value = {
    // State
    resumeId, setResumeId,
    resumeMeta, setResumeMeta,
    jobDescription, setJobDescription,
    analysis, setAnalysis,
    matchResult, setMatchResult,
    interviewQs, setInterviewQs,
    // Loading
    uploading, setUploading,
    analyzing, setAnalyzing,
    matching, setMatching,
    generatingQs, setGeneratingQs,
    // Errors
    error, setError, clearError,
    // Actions
    reset,
  }

  return (
    <AnalysisContext.Provider value={value}>
      {children}
    </AnalysisContext.Provider>
  )
}
