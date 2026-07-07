import { Link, useLocation } from 'react-router-dom'
import { useAnalysis } from '../../context/AnalysisContext'
import { Brain, RotateCcw, Sparkles } from 'lucide-react'

export default function Navbar() {
  const location = useLocation()
  const { reset, resumeMeta, analysis } = useAnalysis()
  const isAnalysisPage = location.pathname.startsWith('/analysis')

  return (
    <header className="sticky top-0 z-50 border-b border-white/5 backdrop-blur-md"
      style={{ background: 'rgba(13,14,26,0.85)' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">

          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group" onClick={reset}>
            <div className="relative">
              <div className="w-9 h-9 rounded-xl flex items-center justify-center"
                style={{ background: 'linear-gradient(135deg,#6172f5,#8b5cf6)' }}>
                <Brain size={18} className="text-white" />
              </div>
              <div className="absolute inset-0 rounded-xl blur-md opacity-50 group-hover:opacity-80 transition-opacity"
                style={{ background: 'linear-gradient(135deg,#6172f5,#8b5cf6)' }} />
            </div>
            <div>
              <span className="font-display font-bold text-lg gradient-text">ResumeAI</span>
              <p className="text-[10px] text-white/40 leading-none -mt-0.5 font-medium tracking-wider">
                POWERED BY GEMINI
              </p>
            </div>
          </Link>

          {/* Centre — breadcrumb on analysis page */}
          {isAnalysisPage && resumeMeta && (
            <div className="hidden sm:flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/10"
              style={{ background: 'rgba(97,114,245,0.08)' }}>
              <Sparkles size={13} className="text-primary-400" />
              <span className="text-sm text-white/70 font-medium truncate max-w-[200px]">
                {resumeMeta.fileName}
              </span>
              {analysis?.atsScore != null && (
                <span className="ml-2 text-xs font-semibold text-green-400">
                  ATS {analysis.atsScore}
                </span>
              )}
            </div>
          )}

          {/* Actions */}
          <div className="flex items-center gap-3">
            {isAnalysisPage && (
              <Link to="/" onClick={reset}
                className="btn-secondary text-sm px-4 py-2 flex items-center gap-2">
                <RotateCcw size={14} />
                New Analysis
              </Link>
            )}
            {!isAnalysisPage && (
              <a href="https://aistudio.google.com" target="_blank" rel="noreferrer"
                className="text-xs text-white/40 hover:text-white/70 transition-colors hidden sm:block">
                Powered by Gemini 1.5 Pro
              </a>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}
