📄 AI Resume Analyzer

An AI-powered Resume Analyzer that helps job seekers improve their resumes by providing ATS compatibility analysis, skill gap detection, job match percentage, personalized suggestions, and AI-generated interview questions using Large Language Models (LLMs).

🚀 Features
📄 Upload Resume (PDF)
🤖 AI-powered Resume Analysis
🎯 ATS Score Generation
📊 Job Description Match Percentage
🛠 Skill Gap Detection
💡 Resume Improvement Suggestions
❓ AI-generated Interview Questions
🔐 Secure User Authentication (JWT)
☁️ Cloud Database Integration
📱 Responsive User Interface

🛠 Tech Stack
Frontend
React.js
HTML5
CSS3
JavaScript
Axios
Backend
Node.js
Express.js
REST API
Database
Google Gemini API
LangChain
RAG (Retrieval-Augmented Generation)
Pinecone Vector Database
Embeddings
Authentication
JWT Authentication
bcrypt.js
Tools
Git
GitHub
Postman
VS Code

User
   │
   ▼
React Frontend
   │
   ▼
Express API
   │
   ├── JWT Authentication
   ├── Resume Upload
   ├── Gemini AI
   ├── LangChain
   ├── Pinecone (Vector Search)
   ▼
MongoDB Atlas

AI-Resume-Analyzer/
│
├── client/
│   ├── src/
│   ├── public/
│   └── package.json
│
├── server/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   ├── utils/
│   ├── config/
│   └── server.js
│
├── README.md
└── package.json


⚙️ Installation
Clone Repository
git clone https://github.com/yourusername/AI-Resume-Analyzer.git
Move into Project
cd AI-Resume-Analyzer
Install Dependencies
Backend
cd server
npm install
Frontend
cd ../client
npm install
🔑 Environment Variables

Create a .env file inside the server folder.

PORT=5000

MONGO_URI=your_mongodb_connection_string

JWT_SECRET=your_jwt_secret

GEMINI_API_KEY=your_gemini_api_key

PINECONE_API_KEY=your_pinecone_api_key

PINECONE_INDEX_NAME=resume-analyser
▶️ Run the Project
Backend
cd server
npm start
Frontend
cd client
npm start
📸 Screenshots

Add screenshots here.

Home Page

Upload Resume

Analysis Result

ATS Score Dashboard

Skill Gap Report
🔄 Workflow
Upload Resume
      │
      ▼
Extract Resume Content
      │
      ▼
Generate Embeddings
      │
      ▼
Store/Search in Pinecone
      │
      ▼
Analyze using Gemini + LangChain
      │
      ▼
Generate
• ATS Score
• Match Percentage
• Skill Gap
• Suggestions
• Interview Questions
🎯 Future Improvements
Resume Templates
Cover Letter Generator
Multi-language Resume Analysis
Resume Version Comparison
Company-specific ATS Analysis
AI Career Roadmap
Resume Keyword Optimization
🤝 Contributing

Contributions are welcome!

Fork the repository
Create a new branch
Commit your changes
Push to the branch
Open a Pull Request
👨‍💻 Author

Sandhya Rajput

B.Tech CSE (AIML)
MERN Stack Developer
Generative AI Enthusiast


LinkedIn: https://linkedin.com/in/yourprofile

