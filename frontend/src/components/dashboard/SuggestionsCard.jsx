import { Lightbulb, TrendingUp, TrendingDown } from 'lucide-react'

export default function SuggestionsCard({ improvements = [], strengths = [], weaknesses = [] }) {
  return (
    <div className="glass-card p-6 animate-slide-up animation-delay-400">
      <h3 className="section-title mb-6">
        <Lightbulb size={20} className="text-yellow-400" />
        Resume Improvements
      </h3>

      <div className="space-y-6">
        {/* Strengths */}
        {strengths.length > 0 && (
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-green-400 mb-3 flex items-center gap-2">
              <TrendingUp size={14} /> Key Strengths
            </h4>
            <ul className="space-y-2">
              {strengths.map((str, i) => (
                <li key={i} className="text-sm text-white/80 flex items-start gap-2">
                  <span className="text-green-500 mt-0.5">•</span> {str}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Weaknesses */}
        {weaknesses.length > 0 && (
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-red-400 mb-3 flex items-center gap-2">
              <TrendingDown size={14} /> Areas to Improve
            </h4>
            <ul className="space-y-2">
              {weaknesses.map((weak, i) => (
                <li key={i} className="text-sm text-white/80 flex items-start gap-2">
                  <span className="text-red-500 mt-0.5">•</span> {weak}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Actionable Suggestions */}
        {improvements.length > 0 && (
          <div className="bg-primary-500/10 border border-primary-500/20 rounded-xl p-4">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-primary-300 mb-3">
              Actionable Suggestions
            </h4>
            <ul className="space-y-2">
              {improvements.map((imp, i) => (
                <li key={i} className="text-sm text-white/90 flex items-start gap-2">
                  <span className="text-primary-400 mt-0.5">→</span> {imp}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  )
}
