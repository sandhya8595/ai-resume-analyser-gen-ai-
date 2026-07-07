import { MessageSquare, Code, Users, Compass } from 'lucide-react'

export default function InterviewQuestionsCard({ interviewQs }) {
  if (!interviewQs) {
    return (
      <div className="glass-card p-6 animate-slide-up animation-delay-500 h-full flex flex-col">
        <h3 className="section-title mb-6">
          <MessageSquare size={20} className="text-primary-400" />
          AI Interview Prep
        </h3>
        <div className="flex-1 flex flex-col items-center justify-center bg-white/5 rounded-xl border border-white/5 p-6 text-center">
          <MessageSquare size={32} className="text-white/20 mb-3" />
          <p className="text-white/40 text-sm">
            Generate interview questions based on this analysis to prepare.
          </p>
        </div>
      </div>
    )
  }

  const sections = [
    { key: 'technical', label: 'Technical', icon: Code, color: 'text-blue-400', questions: interviewQs.technical || [] },
    { key: 'behavioral', label: 'Behavioral', icon: Users, color: 'text-purple-400', questions: interviewQs.behavioral || [] },
    { key: 'situational', label: 'Situational', icon: Compass, color: 'text-green-400', questions: interviewQs.situational || [] }
  ]

  return (
    <div className="glass-card p-6 animate-slide-up animation-delay-500 h-full">
      <h3 className="section-title mb-6">
        <MessageSquare size={20} className="text-primary-400" />
        AI Interview Prep
      </h3>

      <div className="space-y-6">
        {sections.map(({ key, label, icon: Icon, color, questions }) => {
          if (questions.length === 0) return null
          
          return (
            <div key={key} className="bg-white/5 rounded-xl p-4 border border-white/5">
              <h4 className={`text-sm font-semibold mb-3 flex items-center gap-2 ${color}`}>
                <Icon size={16} />
                {label} Questions
              </h4>
              <ul className="space-y-3">
                {questions.slice(0, 3).map((q, i) => (
                  <li key={i} className="text-sm text-white/80 flex items-start gap-3">
                    <span className="flex-shrink-0 w-5 h-5 rounded-full bg-white/10 flex items-center justify-center text-[10px] font-bold mt-0.5 text-white/50">
                      {i + 1}
                    </span>
                    <span className="leading-snug">{q}</span>
                  </li>
                ))}
              </ul>
            </div>
          )
        })}
      </div>
    </div>
  )
}
