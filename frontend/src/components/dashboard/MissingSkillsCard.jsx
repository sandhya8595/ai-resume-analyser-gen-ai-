import { AlertTriangle } from 'lucide-react'

export default function MissingSkillsCard({ missingSkills = [], hasJD = false }) {
  return (
    <div className="glass-card p-6 animate-slide-up animation-delay-300">
      <h3 className="section-title mb-6">
        <AlertTriangle size={20} className="text-yellow-400" />
        Skill Gaps
      </h3>

      {!hasJD ? (
        <div className="flex items-center justify-center h-32 bg-white/5 rounded-xl border border-white/5">
          <p className="text-white/40 text-sm">Provide a Job Description to see missing skills.</p>
        </div>
      ) : missingSkills.length === 0 ? (
        <div className="flex items-center justify-center h-32 bg-green-500/10 rounded-xl border border-green-500/20">
          <p className="text-green-400 text-sm font-medium">Excellent! No major skill gaps detected.</p>
        </div>
      ) : (
        <div className="flex flex-wrap gap-2">
          {missingSkills.map((skill, i) => (
            <span key={i} className="skill-badge-red">
              {skill}
            </span>
          ))}
        </div>
      )}
    </div>
  )
}
