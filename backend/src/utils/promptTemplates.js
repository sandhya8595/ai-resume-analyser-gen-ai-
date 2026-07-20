/**
 * Centralized, structured prompt templates for all Gemini AI calls.
 * All prompts enforce strict JSON output for reliable parsing.
 */

const RESUME_ANALYSIS_PROMPT = (resumeText, jobDescription = '') => `
You are an expert ATS (Applicant Tracking System) and career coach AI. Analyze the following resume${jobDescription ? ' against the provided job description' : ''}.

CRITICAL INSTRUCTION: You MUST respond with ONLY a valid JSON object. Do NOT include any greeting, explanation, markdown, or text before or after the JSON. Start your response directly with { and end with }.

RESUME:
"""
${resumeText}
"""

${jobDescription ? `JOB DESCRIPTION:\n"""\n${jobDescription}\n"""\n` : ''}

Return ONLY this exact JSON structure (no other text):

{
  "summary": "A concise 3-4 sentence professional summary of the candidate",
  "atsScore": <number 0-100>,
  "matchPercentage": <number 0-100, 0 if no JD provided>,
  "extractedSkills": {
    "technical": ["skill1", "skill2"],
    "soft": ["skill1", "skill2"],
    "tools": ["tool1", "tool2"]
  },
  "missingSkills": ["skill1", "skill2"],
  "strengths": ["strength1", "strength2", "strength3"],
  "weaknesses": ["weakness1", "weakness2"],
  "improvements": [
    "Specific actionable improvement suggestion 1",
    "Specific actionable improvement suggestion 2",
    "Specific actionable improvement suggestion 3",
    "Specific actionable improvement suggestion 4",
    "Specific actionable improvement suggestion 5"
  ],
  "hiringRecommendation": {
    "verdict": "Strong Hire | Hire | Consider | Reject",
    "reasoning": "2-3 sentence reasoning for the verdict",
    "confidenceScore": <number 0-100>
  }
}

ATS Score criteria:
- Keyword density and relevance: 30%
- Formatting and structure: 20%
- Experience and skills match: 30%
- Completeness (contact info, education, etc.): 20%

${jobDescription ? 'Match Percentage: How well the resume matches the specific job description (0-100%).' : 'Set matchPercentage to 0 since no job description was provided.'}
${jobDescription ? 'Missing Skills: List skills mentioned in the JD that are absent from the resume.' : 'Set missingSkills to [] since no job description was provided.'}
`;

const JOB_MATCH_PROMPT = (resumeText, jobDescription) => `
You are an expert recruiter and ATS system. Compare this resume against the job description.

CRITICAL INSTRUCTION: Respond with ONLY a valid JSON object. No greeting, no explanation, no markdown. Start directly with { and end with }.

RESUME:
"""
${resumeText}
"""

JOB DESCRIPTION:
"""
${jobDescription}
"""

Return ONLY this exact JSON structure:

{
  "matchPercentage": <number 0-100>,
  "matchedSkills": ["skill1", "skill2"],
  "missingSkills": ["skill1", "skill2"],
  "keywordMatches": ["keyword1", "keyword2"],
  "experienceMatch": {
    "required": "X years",
    "candidate": "Y years",
    "isMatch": true/false
  },
  "educationMatch": {
    "required": "degree or qualification",
    "candidate": "candidate's degree",
    "isMatch": true/false
  },
  "roleCompatibility": "Brief 2-3 sentence assessment",
  "hiringRecommendation": {
    "verdict": "Strong Hire | Hire | Consider | Reject",
    "reasoning": "2-3 sentence reasoning",
    "confidenceScore": <number 0-100>
  },
  "improvements": [
    "Targeted improvement to better match this specific JD"
  ]
}
`;

const INTERVIEW_QUESTIONS_PROMPT = (resumeText, jobDescription = '') => `
You are an expert technical interviewer. Based on the resume${jobDescription ? ' and job description' : ''} below, generate highly relevant interview questions.

CRITICAL INSTRUCTION: Respond with ONLY a valid JSON object. No greeting, no explanation, no markdown. Start directly with { and end with }.

RESUME:
"""
${resumeText}
"""

${jobDescription ? `JOB DESCRIPTION:\n"""\n${jobDescription}\n"""\n` : ''}

Generate questions that probe:
- Technical depth and practical experience
- Behavioral competencies using STAR method
- Situational problem-solving
- Culture fit and soft skills

Return ONLY this exact JSON structure:

{
  "technical": [
    "Technical question 1 based on their specific skills/experience",
    "Technical question 2",
    "Technical question 3",
    "Technical question 4",
    "Technical question 5"
  ],
  "behavioral": [
    "Behavioral question 1 (STAR-based)",
    "Behavioral question 2",
    "Behavioral question 3",
    "Behavioral question 4",
    "Behavioral question 5"
  ],
  "situational": [
    "Situational/scenario question 1",
    "Situational question 2",
    "Situational question 3",
    "Situational question 4",
    "Situational question 5"
  ],
  "roleSpecific": [
    "Role-specific question 1 (only if JD provided)",
    "Role-specific question 2",
    "Role-specific question 3"
  ]
}
`;

module.exports = {
  RESUME_ANALYSIS_PROMPT,
  JOB_MATCH_PROMPT,
  INTERVIEW_QUESTIONS_PROMPT,
};
