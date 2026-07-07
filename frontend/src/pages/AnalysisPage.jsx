import { useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useAnalysis } from '../context/AnalysisContext'
import { getAnalysis } from '../services/api'
import Dashboard from '../components/dashboard/Dashboard'
import { AlertCircle, ArrowLeft } from 'lucide-react'

export default function AnalysisPage() {
  const { resumeId } = useParams()
  const navigate = useNavigate()
  
  const { 
    analysis, setAnalysis, 
    matchResult, jobDescription, 
    interviewQs, 
    error, setError,
    setResumeId
  } = useAnalysis()

  // On mount, if we don't have analysis in context but have an ID in URL, fetch it
  useEffect(() => {
    let isMounted = true

    const fetchExistingAnalysis = async () => {
      try {
        const data = await getAnalysis(resumeId)
        if (isMounted) {
          setAnalysis(data)
          setResumeId(resumeId)
        }
      } catch (err) {
        if (isMounted) setError(err.message || 'Failed to fetch analysis')
      }
    }

    if (!analysis && resumeId) {
      fetchExistingAnalysis()
    }

    return () => { isMounted = false }
  }, [resumeId, analysis, setAnalysis, setResumeId, setError])

  if (error) {
    return (
      <div className="min-h-[calc(100vh-64px)] flex flex-col items-center justify-center p-6 text-center">
        <div className="w-20 h-20 rounded-full bg-red-500/10 flex items-center justify-center mb-6">
          <AlertCircle size={40} className="text-red-400" />
        </div>
        <h2 className="text-2xl font-display font-bold text-white mb-4">Analysis Not Found</h2>
        <p className="text-white/60 mb-8 max-w-md">
          {error}
        </p>
        <button onClick={() => navigate('/')} className="btn-secondary">
          <ArrowLeft size={18} /> Back to Home
        </button>
      </div>
    )
  }

  if (!analysis) {
    return (
      <div className="min-h-[calc(100vh-64px)] flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-8 h-8 rounded-full border-2 border-primary-500 border-t-transparent animate-spin" />
          <p className="text-white/50 text-sm font-medium animate-pulse">Loading analysis data...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-[calc(100vh-64px)] py-8 px-4 sm:px-6 lg:px-8 relative z-10">
      <Dashboard 
        analysis={analysis} 
        matchResult={matchResult} 
        interviewQs={interviewQs} 
        jobDescription={jobDescription}
      />
    </div>
  )
}
