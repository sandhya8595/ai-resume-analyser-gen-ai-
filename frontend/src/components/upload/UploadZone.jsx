import { useState, useRef } from 'react'
import { UploadCloud, FileText, CheckCircle2, AlertCircle, X } from 'lucide-react'

export default function UploadZone({ onFileSelect }) {
  const [dragActive, setDragActive] = useState(false)
  const [selectedFile, setSelectedFile] = useState(null)
  const [error, setError] = useState(null)
  const inputRef = useRef(null)

  const handleDrag = (e) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true)
    } else if (e.type === 'dragleave') {
      setDragActive(false)
    }
  }

  const validateFile = (file) => {
    setError(null)
    if (!file) return false
    
    if (file.type !== 'application/pdf') {
      setError('Please upload a PDF file only.')
      return false
    }
    
    if (file.size > 10 * 1024 * 1024) {
      setError('File size exceeds 10MB limit.')
      return false
    }
    
    return true
  }

  const handleDrop = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0]
      if (validateFile(file)) {
        setSelectedFile(file)
        onFileSelect(file)
      }
    }
  }

  const handleChange = (e) => {
    e.preventDefault()
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0]
      if (validateFile(file)) {
        setSelectedFile(file)
        onFileSelect(file)
      }
    }
  }

  const clearFile = () => {
    setSelectedFile(null)
    setError(null)
    onFileSelect(null)
    if (inputRef.current) inputRef.current.value = ''
  }

  return (
    <div className="w-full">
      <div 
        className={`relative border-2 border-dashed rounded-2xl p-8 transition-all duration-300 flex flex-col items-center justify-center text-center
          ${dragActive ? 'border-primary-400 bg-primary-500/10' : 'border-white/20 bg-white/5 hover:border-primary-500/50 hover:bg-white/10'}
          ${selectedFile ? 'border-green-500/50 bg-green-500/5' : ''}
          ${error ? 'border-red-500/50 bg-red-500/5' : ''}
        `}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <input 
          ref={inputRef}
          type="file" 
          accept=".pdf"
          onChange={handleChange}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
        />

        {selectedFile ? (
          <div className="flex flex-col items-center z-20">
            <div className="w-16 h-16 rounded-full bg-green-500/20 flex items-center justify-center mb-4">
              <CheckCircle2 size={32} className="text-green-400" />
            </div>
            <p className="text-white font-medium text-lg mb-1 flex items-center gap-2">
              <FileText size={18} className="text-primary-400" />
              {selectedFile.name}
            </p>
            <p className="text-white/50 text-sm mb-4">
              {(selectedFile.size / (1024 * 1024)).toFixed(2)} MB
            </p>
            <button 
              onClick={(e) => { e.preventDefault(); clearFile(); }}
              className="text-white/50 hover:text-red-400 flex items-center gap-1 text-sm font-medium transition-colors z-20 relative pointer-events-auto"
            >
              <X size={14} /> Remove File
            </button>
          </div>
        ) : error ? (
          <div className="flex flex-col items-center">
            <div className="w-16 h-16 rounded-full bg-red-500/20 flex items-center justify-center mb-4">
              <AlertCircle size={32} className="text-red-400" />
            </div>
            <p className="text-white font-medium mb-1">Upload Failed</p>
            <p className="text-red-400/80 text-sm">{error}</p>
            <button className="mt-4 text-primary-400 text-sm hover:text-primary-300 font-medium">
              Try again
            </button>
          </div>
        ) : (
          <div className="flex flex-col items-center">
            <div className="w-16 h-16 rounded-full bg-primary-500/20 flex items-center justify-center mb-4 text-primary-400 group-hover:scale-110 transition-transform">
              <UploadCloud size={32} />
            </div>
            <p className="text-white font-medium text-lg mb-2">
              Drag & Drop your resume here
            </p>
            <p className="text-white/50 text-sm mb-6">
              Supported formats: PDF (Max 10MB)
            </p>
            <div className="px-6 py-2 rounded-full bg-white/10 text-white text-sm font-medium border border-white/5">
              Browse Files
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
