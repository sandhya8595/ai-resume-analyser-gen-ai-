import { FileText } from 'lucide-react'

export default function ResumeSummaryCard({ summary }) {
  return (
    <div className="glass-card p-6 animate-slide-up">
      <h3 className="section-title mb-4">
        <FileText size={20} className="text-primary-400" />
        AI Executive Summary
      </h3>
      <div className="bg-white/5 rounded-xl p-4 border border-white/5 relative overflow-hidden">
        {/* Subtle glow behind text */}
        <div className="absolute -top-10 -left-10 w-32 h-32 bg-primary-500/10 rounded-full blur-2xl" />
        
        <p className="text-white/80 leading-relaxed text-sm relative z-10 font-medium">
          {summary || "No summary could be generated from the provided document."}
        </p>
      </div>
    </div>
  )
}
