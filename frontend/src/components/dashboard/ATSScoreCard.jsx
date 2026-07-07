import { FileCheck } from 'lucide-react'
import ScoreCircle from '../common/ScoreCircle'
import { getATSLabel } from '../../utils/formatters'

export default function ATSScoreCard({ score = 0 }) {
  const atsDetails = getATSLabel(score)

  return (
    <div className="glass-card p-6 flex flex-col items-center justify-center text-center animate-slide-up animation-delay-100">
      <h3 className="section-title mb-4 w-full justify-center">
        <FileCheck size={20} className="text-primary-400" />
        ATS Score
      </h3>
      
      <div className="flex-1 flex flex-col justify-center items-center py-4">
        <ScoreCircle score={score} size={140} label="Resume formatting & keyword density" />
        
        <div className="mt-4 px-4 py-1.5 rounded-full border border-white/10 bg-white/5">
          <span className={`text-sm font-semibold ${atsDetails.color}`}>
            {atsDetails.label}
          </span>
        </div>
      </div>
    </div>
  )
}
