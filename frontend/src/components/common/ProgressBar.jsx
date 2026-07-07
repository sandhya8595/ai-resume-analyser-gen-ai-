import { getScoreGradient, getScoreLabel } from '../../utils/formatters'

/**
 * Animated progress bar with colour based on score value.
 * @param {number}  value     - 0-100
 * @param {string}  label     - Optional label override
 * @param {boolean} showLabel - Show percentage label (default true)
 * @param {string}  className - Extra classes
 * @param {string}  height    - Track height (Tailwind class, e.g. 'h-2')
 */
export default function ProgressBar({
  value = 0,
  label,
  showLabel = true,
  className = '',
  height = 'h-2.5',
  animate = true,
}) {
  const pct       = Math.min(100, Math.max(0, Math.round(value)))
  const gradient  = getScoreGradient(pct)
  const scoreText = label || getScoreLabel(pct)

  return (
    <div className={`w-full ${className}`}>
      {showLabel && (
        <div className="flex justify-between items-center mb-1.5">
          <span className="text-xs text-white/50 font-medium">{scoreText}</span>
          <span className="text-xs font-bold text-white">{pct}%</span>
        </div>
      )}
      <div className={`w-full ${height} rounded-full overflow-hidden`}
        style={{ background: 'rgba(255,255,255,0.06)' }}>
        <div
          className={`h-full rounded-full bg-gradient-to-r ${gradient} ${animate ? 'progress-bar-animated' : ''}`}
          style={{
            width: `${pct}%`,
            '--progress-width': `${pct}%`,
            boxShadow: `0 0 8px rgba(97,114,245,0.4)`,
          }}
        />
      </div>
    </div>
  )
}
