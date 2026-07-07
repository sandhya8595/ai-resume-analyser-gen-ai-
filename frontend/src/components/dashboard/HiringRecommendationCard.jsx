import { Award, ShieldCheck } from 'lucide-react'
import { getVerdictStyle } from '../../utils/formatters'

export default function HiringRecommendationCard({ recommendation }) {
  if (!recommendation || !recommendation.verdict) return null

  const { verdict, reasoning, confidenceScore } = recommendation
  const styles = getVerdictStyle(verdict)

  return (
    <div className={`rounded-2xl border ${styles.border} ${styles.bg} p-6 h-full flex flex-col justify-center animate-slide-up animation-delay-200 relative overflow-hidden backdrop-blur-sm`}>
      {/* Decorative background glow */}
      <div className="absolute top-0 right-0 -mt-10 -mr-10 w-40 h-40 bg-white/5 rounded-full blur-2xl pointer-events-none" />

      <h3 className="text-sm font-semibold uppercase tracking-wider text-white/50 mb-6 flex items-center gap-2">
        <Award size={16} /> Final Verdict
      </h3>

      <div className="flex flex-col items-center text-center mb-6">
        <h2 className={`font-display text-4xl font-bold tracking-tight ${styles.text} mb-2`}>
          {verdict}
        </h2>
        {confidenceScore > 0 && (
          <div className="flex items-center gap-1.5 px-3 py-1 bg-white/10 rounded-full text-xs font-medium text-white/80 border border-white/5">
            <ShieldCheck size={14} className="text-green-400" />
            {confidenceScore}% Confidence
          </div>
        )}
      </div>

      {reasoning && (
        <div className="mt-auto bg-black/20 rounded-xl p-4 border border-white/5 relative z-10">
          <p className="text-sm text-white/80 leading-relaxed italic">
            "{reasoning}"
          </p>
        </div>
      )}
    </div>
  )
}
