import { useState, useEffect } from 'react'
import { Sparkles, ArrowRight, CheckCircle2 } from 'lucide-react'
import UploadZone from '../components/upload/UploadZone'
import JobDescriptionInput from '../components/upload/JobDescriptionInput'
import Loader from '../components/common/Loader'
import { useAnalysisFlow } from '../hooks/useAnalysis'
import { useAnalysis } from '../context/AnalysisContext'

export default function HomePage() {
  const [file, setFile] = useState(null)
  const [jd, setJd] = useState('')
  const [uploadProgress, setUploadProgress] = useState(0)

  const { runFullPipeline } = useAnalysisFlow()
  const { uploading, analyzing, matching, generatingQs, error, reset } = useAnalysis()

  // Reset state on mount
  useEffect(() => {
    reset()
  }, [reset])

  const handleAnalyze = () => {
    if (!file) return
    runFullPipeline(file, jd, setUploadProgress)
  }

  // Determine current loader step
  const getLoaderState = () => {
    if (uploading) return { step: 0, msg: `Uploading & Vectorizing PDF (${uploadProgress}%)` }
    if (analyzing) return { step: 1, msg: 'Analyzing with Gemini 1.5 Pro' }
    if (matching) return { step: 2, msg: 'Matching Job Description & Finding Skill Gaps' }
    if (generatingQs) return { step: 3, msg: 'Generating Tailored Interview Questions' }
    return null
  }

  const loaderState = getLoaderState()
  const steps = [
    'Vectorizing Document',
    'AI Core Analysis',
    jd.length >= 50 ? 'Job Description Matching' : 'Extracting Insights',
    'Generating Interview Prep'
  ]

  return (
    <div className="relative min-h-[calc(100vh-64px)] flex flex-col items-center justify-center p-6 lg:p-12">
      
      {loaderState && (
        <Loader 
          steps={steps} 
          currentStep={loaderState.step} 
          message={loaderState.msg} 
        />
      )}

      {/* Hero Content */}
      <div className="w-full max-w-3xl text-center mb-12 animate-slide-up">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary-500/30 bg-primary-500/10 text-primary-300 font-medium text-sm mb-6">
          <Sparkles size={16} /> Powered by Gemini 1.5 Pro + RAG
        </div>
        <h1 className="font-display text-5xl md:text-6xl font-extrabold tracking-tight mb-6 leading-tight">
          Intelligent <span className="gradient-text">Resume Analysis</span>
        </h1>
        <p className="text-lg md:text-xl text-white/60 max-w-2xl mx-auto leading-relaxed">
          Upload your resume and a target job description. Our AI will grade your ATS compatibility, find skill gaps, and generate tailored interview questions.
        </p>
      </div>

      {/* Main Card */}
      <div className="w-full max-w-2xl glass-card p-6 md:p-10 animate-slide-up animation-delay-200">
        
        {/* Error Alert */}
        {error && (
          <div className="mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-sm flex items-center gap-3">
            <div className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
            {error}
          </div>
        )}

        {/* Upload Zone */}
        <UploadZone onFileSelect={setFile} />

        {/* JD Input */}
        <div className="mt-8 pt-8 border-t border-white/5 transition-all duration-500">
          <JobDescriptionInput value={jd} onChange={setJd} />
        </div>

        {/* Action Button */}
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-6 text-sm text-white/40">
            <div className="flex items-center gap-2">
              <CheckCircle2 size={16} className="text-green-500/50" /> Secure Analysis
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 size={16} className="text-green-500/50" /> Instant Results
            </div>
          </div>
          
          <button 
            onClick={handleAnalyze}
            disabled={!file}
            className="btn-primary w-full sm:w-auto"
          >
            Start Analysis
            <ArrowRight size={18} />
          </button>
        </div>
      </div>

    </div>
  )
}
