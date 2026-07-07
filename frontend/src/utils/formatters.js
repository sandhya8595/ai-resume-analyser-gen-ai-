/**
 * Shared formatting utilities for the frontend.
 */

/**
 * Return a colour class based on a 0-100 score.
 */
export const getScoreColor = (score) => {
  if (score >= 80) return 'text-green-400'
  if (score >= 60) return 'text-blue-400'
  if (score >= 40) return 'text-yellow-400'
  return 'text-red-400'
}

/**
 * Return a background gradient class based on a 0-100 score.
 */
export const getScoreGradient = (score) => {
  if (score >= 80) return 'from-green-500 to-emerald-600'
  if (score >= 60) return 'from-blue-500 to-cyan-600'
  if (score >= 40) return 'from-yellow-500 to-amber-600'
  return 'from-red-500 to-rose-600'
}

/**
 * Return a label for a score.
 */
export const getScoreLabel = (score) => {
  if (score >= 80) return 'Excellent'
  if (score >= 60) return 'Good'
  if (score >= 40) return 'Average'
  return 'Needs Work'
}

/**
 * Return a label + color for an ATS score specifically.
 */
export const getATSLabel = (score) => {
  if (score >= 80) return { label: 'ATS Friendly', color: 'text-green-400' }
  if (score >= 60) return { label: 'Good Match',   color: 'text-blue-400'  }
  if (score >= 40) return { label: 'Needs Work',   color: 'text-yellow-400'}
  return              { label: 'Poor Match',    color: 'text-red-400'   }
}

/**
 * Return verdict badge style for hiring recommendation.
 */
export const getVerdictStyle = (verdict) => {
  switch (verdict) {
    case 'Strong Hire': return { bg: 'bg-green-500/20',  border: 'border-green-500/40',  text: 'text-green-300'  }
    case 'Hire':        return { bg: 'bg-blue-500/20',   border: 'border-blue-500/40',   text: 'text-blue-300'   }
    case 'Consider':    return { bg: 'bg-yellow-500/20', border: 'border-yellow-500/40', text: 'text-yellow-300' }
    case 'Reject':      return { bg: 'bg-red-500/20',    border: 'border-red-500/40',    text: 'text-red-300'    }
    default:            return { bg: 'bg-white/10',      border: 'border-white/20',      text: 'text-white/70'   }
  }
}

/**
 * Format a number as a percentage string.
 */
export const formatPercent = (n) => `${Math.round(n)}%`

/**
 * Format ISO date string to readable format.
 */
export const formatDate = (iso) => {
  if (!iso) return '—'
  return new Date(iso).toLocaleDateString('en-US', {
    year: 'numeric', month: 'short', day: 'numeric',
    hour: '2-digit', minute: '2-digit',
  })
}

/**
 * Truncate a string to a max length.
 */
export const truncate = (str, max = 100) =>
  str && str.length > max ? str.slice(0, max) + '…' : str

/**
 * Convert ms to a readable duration string.
 */
export const formatDuration = (ms) => {
  if (ms < 1000) return `${ms}ms`
  return `${(ms / 1000).toFixed(1)}s`
}
