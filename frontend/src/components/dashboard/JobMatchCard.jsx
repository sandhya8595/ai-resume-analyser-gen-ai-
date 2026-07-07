import { Target } from 'lucide-react'
import ScoreCircle from '../common/ScoreCircle'
import { getScoreLabel } from '../../utils/formatters'

export default function JobMatchCard({ score = 0, compatibility = '' }) {
  return (
    <div className="glass-card p-6 flex flex-col items-center justify-center text-center animate-slide-up animation-delay-100">
      <h3 className="section-title mb-4 w-full justify-center">
        <Target size={20} className="text-primary-400" />
        Job Match
      </h3>
      
      <div className="flex-1 flex flex-col justify-center items-center py-4">
        <ScoreCircle score={score} size={140} label="Alignment with Job Description" />
        
        {compatibility && (
          <p className="mt-4 text-xs text-white/60 font-medium px-4">
            {compatibility}
          </p>
        )}
      </div>
    </div>
  )
}
