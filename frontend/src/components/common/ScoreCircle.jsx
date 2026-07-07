import { getScoreColor } from '../../utils/formatters'

export default function ScoreCircle({ score = 0, size = 120, strokeWidth = 8, label = 'ATS Score' }) {
  const radius = (size - strokeWidth) / 2
  const circumference = radius * 2 * Math.PI
  const offset = circumference - (score / 100) * circumference
  const colorClass = getScoreColor(score)

  // Mapping text color classes to actual hex values for SVG stroke
  const getColorHex = (score) => {
    if (score >= 80) return '#4ade80' // text-green-400
    if (score >= 60) return '#60a5fa' // text-blue-400
    if (score >= 40) return '#facc15' // text-yellow-400
    return '#f87171' // text-red-400
  }

  const strokeColor = getColorHex(score)

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="relative flex items-center justify-center" style={{ width: size, height: size }}>
        {/* Background track */}
        <svg className="absolute inset-0 w-full h-full transform -rotate-90">
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke="rgba(255,255,255,0.05)"
            strokeWidth={strokeWidth}
          />
          {/* Progress circle */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke={strokeColor}
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            strokeLinecap="round"
            style={{ transition: 'stroke-dashoffset 1.5s ease-in-out' }}
          />
        </svg>

        {/* Text inside circle */}
        <div className="absolute inset-0 flex flex-col items-center justify-center rounded-full"
             style={{ background: `radial-gradient(circle, ${strokeColor}10 0%, transparent 60%)` }}>
          <span className={`font-display text-4xl font-bold ${colorClass}`}>
            {Math.round(score)}
          </span>
          <span className="text-[10px] uppercase tracking-wider text-white/50 font-semibold mt-1">
            out of 100
          </span>
        </div>
      </div>
      
      {/* Label below */}
      <div className="mt-3 text-center">
        <span className="font-medium text-white/90">{label}</span>
      </div>
    </div>
  )
}
