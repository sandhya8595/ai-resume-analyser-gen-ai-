import { Briefcase, Info, AlertCircle } from 'lucide-react'

export default function JobDescriptionInput({ value, onChange }) {
  return (
    <div className="w-full mt-6">
      <div className="flex items-center justify-between mb-2">
        <label htmlFor="jd-input" className="text-white font-medium flex items-center gap-2">
          <Briefcase size={18} className="text-primary-400" />
          Job Description <span className="text-white/40 text-sm font-normal">(Optional)</span>
        </label>
        <div className="group relative">
          <Info size={16} className="text-white/40 cursor-help" />
          <div className="absolute bottom-full right-0 mb-2 w-64 p-3 rounded-lg bg-surface-800 border border-white/10 text-xs text-white/70 shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-10">
            Paste the job description here to get a match score and missing skills analysis.
          </div>
        </div>
      </div>
      
      <div className="relative">
        <textarea
          id="jd-input"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Paste the target job description here..."
          className="input-field min-h-[160px] resize-y"
        />
        
        {value.length > 0 && value.length < 50 && (
          <p className="absolute -bottom-6 left-0 text-xs text-yellow-400/80 flex items-center gap-1">
            <AlertCircle size={12} /> Please enter at least 50 characters for better matching.
          </p>
        )}
      </div>
    </div>
  )
}
