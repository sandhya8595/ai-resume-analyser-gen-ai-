import { Code2, PenTool, BrainCircuit } from 'lucide-react'

export default function SkillsCard({ extractedSkills = {} }) {
  const technical = extractedSkills.technical || []
  const soft = extractedSkills.soft || []
  const tools = extractedSkills.tools || []

  const hasSkills = technical.length > 0 || soft.length > 0 || tools.length > 0

  if (!hasSkills) {
    return (
      <div className="glass-card p-6 animate-slide-up animation-delay-200">
        <h3 className="section-title mb-4">Extracted Skills</h3>
        <div className="flex items-center justify-center h-32 bg-white/5 rounded-xl border border-white/5">
          <p className="text-white/40 text-sm">No specific skills could be extracted.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="glass-card p-6 animate-slide-up animation-delay-200">
      <h3 className="section-title mb-6">Extracted Skills</h3>

      <div className="space-y-6">
        {/* Technical Skills */}
        {technical.length > 0 && (
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-white/50 mb-3 flex items-center gap-2">
              <Code2 size={14} className="text-blue-400" />
              Technical / Core
            </h4>
            <div className="flex flex-wrap gap-2">
              {technical.map((skill, i) => (
                <span key={`tech-${i}`} className="skill-badge-blue">{skill}</span>
              ))}
            </div>
          </div>
        )}

        {/* Tools & Frameworks */}
        {tools.length > 0 && (
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-white/50 mb-3 flex items-center gap-2">
              <PenTool size={14} className="text-purple-400" />
              Tools & Frameworks
            </h4>
            <div className="flex flex-wrap gap-2">
              {tools.map((skill, i) => (
                <span key={`tool-${i}`} className="skill-badge-purple">{skill}</span>
              ))}
            </div>
          </div>
        )}

        {/* Soft Skills */}
        {soft.length > 0 && (
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-white/50 mb-3 flex items-center gap-2">
              <BrainCircuit size={14} className="text-green-400" />
              Soft Skills
            </h4>
            <div className="flex flex-wrap gap-2">
              {soft.map((skill, i) => (
                <span key={`soft-${i}`} className="skill-badge-green">{skill}</span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
