import ResumeSummaryCard from './ResumeSummaryCard'
import ATSScoreCard from './ATSScoreCard'
import SkillsCard from './SkillsCard'
import JobMatchCard from './JobMatchCard'
import MissingSkillsCard from './MissingSkillsCard'
import SuggestionsCard from './SuggestionsCard'
import InterviewQuestionsCard from './InterviewQuestionsCard'
import HiringRecommendationCard from './HiringRecommendationCard'

export default function Dashboard({ analysis, matchResult, interviewQs, jobDescription }) {
  if (!analysis) return null

  // Ensure arrays are present for safety
  const strengths = analysis.strengths || []
  const weaknesses = analysis.weaknesses || []
  const improvements = analysis.improvements || []
  
  // Aggregate match info if available
  // Use matchResult for detailed match data, fall back to analysis-level data
  const hasJobMatch = Boolean(matchResult)
  const missingSkills = hasJobMatch
    ? (matchResult.missingSkills || [])
    : (analysis.missingSkills || [])
  // hasJD: true whenever there are missing skills (meaning a JD was analysed)
  const hasJD = hasJobMatch || (Array.isArray(analysis.missingSkills) && analysis.missingSkills.length > 0)

  return (
    <div className="w-full max-w-7xl mx-auto space-y-6">
      
      {/* Top Row: Summary & Core Scores */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 flex flex-col gap-6">
          <ResumeSummaryCard summary={analysis.summary} />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 h-full">
            <ATSScoreCard score={analysis.atsScore} />
            {hasJobMatch ? (
              <JobMatchCard 
                score={matchResult.matchPercentage} 
                compatibility={matchResult.roleCompatibility} 
              />
            ) : (
              <div className="glass-card p-6 flex flex-col items-center justify-center text-center">
                <h3 className="section-title mb-4">Job Match</h3>
                <p className="text-white/50 text-sm mb-4">
                  No job description provided. Upload again with a JD to see your match score.
                </p>
                <div className="w-24 h-24 rounded-full border-4 border-white/5 flex items-center justify-center">
                  <span className="text-white/20 text-2xl font-bold">N/A</span>
                </div>
              </div>
            )}
          </div>
        </div>
        
        <div className="lg:col-span-1">
          <HiringRecommendationCard 
            recommendation={hasJobMatch ? matchResult.hiringRecommendation : analysis.hiringRecommendation} 
          />
        </div>
      </div>

      {/* Middle Row: Skills Analysis */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <SkillsCard extractedSkills={analysis.extractedSkills} />
        <MissingSkillsCard missingSkills={missingSkills} hasJD={hasJD} />
      </div>

      {/* Bottom Row: Suggestions & Interview Prep */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <SuggestionsCard 
          improvements={improvements} 
          strengths={strengths} 
          weaknesses={weaknesses} 
        />
        <InterviewQuestionsCard interviewQs={interviewQs || analysis.interviewQuestions} />
      </div>
      
    </div>
  )
}
