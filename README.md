# 🤖 AI Resume Analyzer

An AI-powered Resume Analyzer built using the **MERN Stack** and **Generative AI** to help job seekers evaluate and improve their resumes. The application analyzes resumes against job descriptions, calculates ATS compatibility, identifies missing skills, provides personalized improvement suggestions, and generates interview questions using Google's Gemini AI.

---

## 🚀 Features

- 📄 Upload Resume in PDF format
- 🤖 AI-powered Resume Analysis
- 🎯 ATS Compatibility Score
- 📊 Resume & Job Description Match Percentage
- 🛠 Skill Gap Detection
- 💡 Personalized Resume Improvement Suggestions
- ❓ AI-generated Interview Questions
- 🔐 Secure User Authentication using JWT
- ☁️ MongoDB Atlas Database Integration
- 📱 Fully Responsive User Interface

---

## 🛠 Tech Stack

### Frontend
- React.js
- JavaScript
- HTML5
- CSS3
- Axios

### Backend
- Node.js
- Express.js
- REST API

### Database
- MongoDB Atlas
- Mongoose

### Generative AI
- Google Gemini API
- LangChain
- Retrieval-Augmented Generation (RAG)
- Pinecone Vector Database
- Embeddings

### Authentication
- JWT (JSON Web Token)
- bcrypt.js

### Tools & Platforms
- Git
- GitHub
- Postman
- VS Code

---

## 🏗️ System Architecture

```text
                +----------------------+
                |      React Client    |
                +----------+-----------+
                           |
                           |
                    REST API Request
                           |
                           ▼
                +----------------------+
                | Express.js Backend   |
                +----------+-----------+
                           |
      +--------------------+---------------------+
      |                    |                     |
      ▼                    ▼                     ▼
JWT Authentication   Gemini AI API        MongoDB Atlas
                           |
                           ▼
                     LangChain
                           |
                           ▼
                    Pinecone Vector DB
                           |
                           ▼
                   AI Generated Response
```

---

## 📂 Project Structure

```text
AI-Resume-Analyzer/
│
├── client/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── context/
│   │   ├── services/
│   │   └── App.js
│   └── package.json
│
├── server/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── config/
│   ├── utils/
│   ├── uploads/
│   ├── server.js
│   └── package.json
│
├── README.md
└── package.json
```

---

## ⚙️ Installation

### 1. Clone the Repository

```bash
git clone https://github.com/your-github-username/AI-Resume-Analyzer.git
```

### 2. Navigate to the Project Folder

```bash
cd AI-Resume-Analyzer
```

### 3. Install Backend Dependencies

```bash
cd server
npm install
```

### 4. Install Frontend Dependencies

```bash
cd ../client
npm install
```

---

## 🔑 Environment Variables

Create a `.env` file inside the **server** folder.

```env
PORT=5000

MONGO_URI=your_mongodb_connection_string

JWT_SECRET=your_jwt_secret

GEMINI_API_KEY=your_gemini_api_key

PINECONE_API_KEY=your_pinecone_api_key

PINECONE_INDEX_NAME=resume-analyser
```

---

## ▶️ Running the Project

### Start Backend

```bash
cd server
npm run dev
```

### Start Frontend

```bash
cd client
npm start
```

---

## 🔄 How It Works

1. User uploads a resume in PDF format.
2. Resume text is extracted and processed.
3. Embeddings are generated and stored in Pinecone.
4. User provides a job description.
5. LangChain retrieves relevant resume information.
6. Google Gemini analyzes the resume against the job description.
7. The application generates:
   - ATS Score
   - Match Percentage
   - Missing Skills
   - Resume Improvement Suggestions
   - AI-generated Interview Questions

---

## 📸 Screenshots

> Add screenshots of your application here.

| Page | Screenshot |
|------|------------|
| Home Page | Add Image |
| Login Page | Add Image |
| Dashboard | Add Image |
| Resume Upload | Add Image |
| ATS Analysis | Add Image |
| Interview Questions | Add Image |

---

## 🌟 Key Highlights

- AI-powered resume evaluation
- Retrieval-Augmented Generation (RAG)
- Vector search using Pinecone
- Secure JWT Authentication
- MERN Stack Architecture
- RESTful APIs
- Responsive Design
- Modular Code Structure

---

## 🎯 Future Enhancements

- 📑 Cover Letter Generator
- 🌍 Multi-language Resume Analysis
- 📈 Resume Version Comparison
- 🎨 Resume Templates
- 📋 Resume Keyword Optimizer
- 🏢 Company-specific ATS Analysis
- 🤖 AI Career Roadmap
- 📊 Resume Analytics Dashboard

---

## 🧪 API Endpoints (Example)

| Method | Endpoint | Description |
|---------|----------|-------------|
| POST | `/api/auth/register` | Register User |
| POST | `/api/auth/login` | Login User |
| POST | `/api/resume/upload` | Upload Resume |
| POST | `/api/resume/analyze` | Analyze Resume |
| GET | `/api/user/profile` | User Profile |

---

## 🤝 Contributing

Contributions are always welcome!

1. Fork the repository
2. Create a feature branch

```bash
git checkout -b feature-name
```

3. Commit your changes

```bash
git commit -m "Add new feature"
```

4. Push to your branch

```bash
git push origin feature-name
```

5. Open a Pull Request

---

## 👩‍💻 Author

**Sandhya Rajput**

- 🎓 B.Tech CSE (AIML)
- 💻 MERN Stack Developer
- 🤖 Generative AI Enthusiast

**GitHub:** https://github.com/your-github-username

**LinkedIn:** https://linkedin.com/in/your-linkedin-profile

---

## ⭐ Show Your Support

If you found this project helpful, please consider giving it a ⭐ on GitHub.

---

## 📜 License

This project is licensed under the MIT License.

---

## 🙌 Acknowledgements

- Google Gemini API
- LangChain
- Pinecone
- MongoDB Atlas
- React.js
- Express.js
- Node.js

---
