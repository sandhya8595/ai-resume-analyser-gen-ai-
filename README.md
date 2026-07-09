# 🤖 AI Resume Analyzer

AI Resume Analyzer is an intelligent resume analysis platform powered by Generative AI. The application utilizes Google Gemini, LangChain, Retrieval-Augmented Generation (RAG), and Pinecone Vector Database to analyze resumes in the context of a given job description and generate meaningful, context-aware insights.

Unlike conventional ATS tools that primarily rely on keyword matching, the system performs semantic analysis by converting resume content into vector embeddings and retrieving the most relevant information through a RAG pipeline. This enables the language model to generate accurate, personalized, and contextually relevant recommendations.

The application provides ATS compatibility analysis, job description match percentage, skill gap identification, resume improvement suggestions, and AI-generated interview questions, helping candidates optimize their resumes for better career opportunities.

---

## Overview

Many candidates submit resumes without knowing whether they align with the requirements of their desired roles. Traditional resume screening systems often depend on keyword-based filtering, which may fail to capture the true context of a candidate's skills and experience.

AI Resume Analyzer addresses this limitation by combining Large Language Models with semantic vector search. When a resume is uploaded, the application extracts the content, generates vector embeddings, and stores them in Pinecone Vector Database. During analysis, LangChain retrieves the most relevant resume context, which is then provided to Google Gemini through a Retrieval-Augmented Generation (RAG) pipeline.

This architecture enables the application to produce context-aware responses, including ATS compatibility analysis, resume-to-job matching, skill gap detection, resume enhancement recommendations, and personalized interview questions, delivering significantly more accurate and meaningful results than traditional keyword-based approaches.

# ✨ Features

### 📄 Resume Analysis
- Upload Resume in PDF Format
- Extract Resume Content
- AI-Powered Resume Evaluation

### 🎯 ATS Analysis
- ATS Compatibility Score
- Resume Quality Assessment
- Resume Strength Analysis

### 📊 Job Matching
- Resume vs Job Description Comparison
- Match Percentage
- Missing Skills Detection
- Skill Gap Analysis

### 🤖 AI Assistance
- Personalized Resume Suggestions
- Resume Improvement Tips
- AI Generated Interview Questions
- Context-Aware AI Responses

### 🔐 Security
- JWT Authentication
- Secure User Login
- Protected Routes

---

# 🧠 Core AI Technologies

This project demonstrates practical implementation of modern Generative AI concepts including:

- Large Language Models (LLMs)
- Retrieval-Augmented Generation (RAG)
- Vector Embeddings
- Semantic Search
- Prompt Engineering
- Context Retrieval
- AI Response Generation

---

# 🔄 AI Workflow

```text
             Resume PDF
                  │
                  ▼
         Text Extraction
                  │
                  ▼
       Document Chunking
                  │
                  ▼
     Embedding Generation
                  │
                  ▼
     Pinecone Vector Database
                  │
                  ▼
      Semantic Context Retrieval
                  │
                  ▼
            LangChain
                  │
                  ▼
      Google Gemini LLM
                  │
                  ▼
      Intelligent AI Response
                  │
                  ├──────── ATS Score
                  ├──────── Match Percentage
                  ├──────── Missing Skills
                  ├──────── Resume Suggestions
                  └──────── Interview Questions
```

---

# 🏗 System Architecture

```text
                 React Frontend
                        │
                        ▼
               Express REST API
                        │
       ┌────────────────┼────────────────┐
       │                │                │
       ▼                ▼                ▼
MongoDB Atlas     JWT Authentication    Resume Upload
                                        │
                                        ▼
                                Resume Processing
                                        │
                                        ▼
                               Generate Embeddings
                                        │
                                        ▼
                           Pinecone Vector Database
                                        │
                                        ▼
                                  LangChain RAG
                                        │
                                        ▼
                                Google Gemini API
                                        │
                                        ▼
                           AI Generated Resume Analysis
```

---

# 💡 Why RAG?

Traditional AI models may generate responses without considering the user's actual resume.

This project uses **Retrieval-Augmented Generation (RAG)** to retrieve relevant resume content before sending it to the language model. This improves response quality, reduces hallucinations, and provides context-aware suggestions tailored to the uploaded resume.

---

# 📌 Why Pinecone?

Pinecone serves as the vector database for storing resume embeddings.

Instead of searching through plain text, Pinecone performs **semantic similarity search**, allowing the application to retrieve the most relevant sections of the resume based on the job description.

This significantly improves the accuracy of AI-generated insights.

---

# 🛠 Tech Stack

## 🧠 Generative AI

- Google Gemini API
- LangChain
- Pinecone Vector Database
- Retrieval-Augmented Generation (RAG)
- Embeddings
- Prompt Engineering

---

## 💻 Frontend

- React.js
- JavaScript
- HTML5
- CSS3
- Axios

---

## ⚙ Backend

- Node.js
- Express.js
- REST APIs

---

## 🗄 Database

- MongoDB Atlas
- Mongoose

---

## 🔒 Authentication

- JWT Authentication
- bcrypt.js

---

## 🧰 Developer Tools

- Git
- GitHub
- Postman
- VS Code

---

# 📂 Folder Structure

```text
AI-Resume-Analyzer
│
├── client
│   ├── public
│   ├── src
│   ├── components
│   ├── pages
│   └── services
│
├── server
│   ├── controllers
│   ├── routes
│   ├── middleware
│   ├── models
│   ├── config
│   ├── utils
│   ├── services
│   └── uploads
│
└── README.md
```

---

# 🚀 Installation

```bash
git clone https://github.com/sandhya8595/ai-resume-analyser-gen-ai-.git

cd ai-resume-analyser-gen-ai-

cd server
npm install

cd ../client
npm install
```

---

# 🔑 Environment Variables

```env
PORT=5000

MONGO_URI=

JWT_SECRET=

GEMINI_API_KEY=

PINECONE_API_KEY=

PINECONE_INDEX_NAME=resume-analyser
```

---

# 🎯 Learning Outcomes

This project helped me gain practical experience in:

- Building Generative AI Applications
- Working with Large Language Models
- Retrieval-Augmented Generation
- Vector Databases
- Semantic Search
- LangChain Framework
- Prompt Engineering
- Full Stack Development
- API Integration
- Authentication & Authorization

---

# 🚀 Future Enhancements

- Resume Ranking
- AI Cover Letter Generator
- Multi-language Resume Analysis
- Resume Keyword Optimizer
- Company-Specific ATS Checker
- AI Career Roadmap
- Resume Version Comparison
- Resume Analytics Dashboard

---

# 👩‍💻 Author

## Sandhya Rajput

🎓 B.Tech CSE (AIML)

💻 Full Stack Developer

🤖 Generative AI Enthusiast

It motivates me to build more open-source AI projects.
