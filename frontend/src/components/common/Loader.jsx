import { Brain } from 'lucide-react'

/**
 * Full-page loading overlay with animated brain icon + status messages.
 */
export default function Loader({ steps = [], currentStep = 0, message = 'Processing…' }) {
  const displaySteps = steps.length > 0 ? steps : [message]

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center"
      style={{ background: 'rgba(13,14,26,0.95)', backdropFilter: 'blur(16px)' }}>

      {/* Animated brain */}
      <div className="relative mb-8">
        <div className="w-20 h-20 rounded-2xl flex items-center justify-center"
          style={{ background: 'linear-gradient(135deg,#6172f5,#8b5cf6)' }}>
          <Brain size={36} className="text-white animate-pulse-slow" />
        </div>
        {/* Rotating ring */}
        <div className="absolute inset-0 rounded-2xl border-2 border-transparent animate-spin-slow"
          style={{ borderTopColor: '#6172f5', borderRightColor: 'transparent' }} />
        {/* Glow */}
        <div className="absolute inset-0 rounded-2xl blur-xl opacity-50"
          style={{ background: 'linear-gradient(135deg,#6172f5,#8b5cf6)' }} />
      </div>

      {/* Title */}
      <h2 className="font-display text-2xl font-bold gradient-text mb-2">
        AI Analysis in Progress
      </h2>
      <p className="text-white/50 text-sm mb-8">
        Gemini 1.5 Pro is processing your resume…
      </p>

      {/* Step list */}
      <div className="flex flex-col gap-3 w-full max-w-sm">
        {displaySteps.map((step, i) => {
          const done    = i < currentStep
          const active  = i === currentStep
          const pending = i > currentStep
          return (
            <div key={i}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl border transition-all duration-500
                ${active  ? 'border-primary-500/40 bg-primary-500/10' : ''}
                ${done    ? 'border-green-500/30 bg-green-500/5' : ''}
                ${pending ? 'border-white/5 bg-white/2 opacity-40' : ''}
              `}>
              <div className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 text-xs font-bold
                ${done    ? 'bg-green-500 text-white' : ''}
                ${active  ? 'bg-primary-500 text-white animate-pulse' : ''}
                ${pending ? 'bg-white/10 text-white/40' : ''}
              `}>
                {done ? '✓' : i + 1}
              </div>
              <span className={`text-sm font-medium
                ${active  ? 'text-white' : ''}
                ${done    ? 'text-green-300' : ''}
                ${pending ? 'text-white/40' : ''}
              `}>
                {step}
              </span>
              {active && (
                <div className="ml-auto flex gap-1">
                  {[0,1,2].map(d => (
                    <span key={d} className="w-1.5 h-1.5 rounded-full bg-primary-400 animate-bounce"
                      style={{ animationDelay: `${d * 0.15}s` }} />
                  ))}
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
