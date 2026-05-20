# 🚀 InterviewIQ — AI-Powered Mock Interview Platform

![InterviewIQ Banner](https://via.placeholder.com/1200x400/111827/4F46E5?text=InterviewIQ+-+Land+Your+Dream+Job)

**InterviewIQ** is a comprehensive, AI-driven interview preparation platform designed to help candidates practice, analyze, and improve their technical and behavioral interview skills. By simulating real-world interviews with intelligent feedback, it bridges the gap between learning and landing the job.

---

## ✨ Features

- 🤖 **AI Mock Interviews**: Practice answering technical questions with an AI that provides real-time, actionable feedback on accuracy, communication, and confidence.
- 📄 **Smart Resume Analysis**: Upload your resume to extract key skills and automatically tailor your mock interviews and MCQ tests.
- 📊 **Performance Analytics**: Track your progress over time with dynamic charts, identifying strong topics and areas needing improvement.
- 📝 **Domain-Specific MCQ Tests**: Test your core computer science and web development knowledge under timed conditions.
- 🔒 **Secure Authentication**: JWT-based protected routes ensure user data and progress remain private and secure.
- 📱 **Modern & Responsive UI**: Built with a sleek dark-mode interface using Tailwind CSS and Framer Motion for smooth animations across all devices.

---

## 🛠️ Tech Stack

| Frontend | Backend | Database | AI / Tools |
| :--- | :--- | :--- | :--- |
| React.js 19 | Node.js | MongoDB | OpenAI / Custom NLP |
| Vite 8 | Express.js | Mongoose | JWT Authentication |
| Tailwind CSS v4 | REST APIs | | Framer Motion |
| Recharts | Multer (Uploads)| | Axios |

---

## 🏗️ Architecture Overview

The project follows a standard MERN (MongoDB, Express, React, Node) architecture with a decoupled frontend and backend:

1. **Client (React/Vite)**: Manages UI state, routing (`react-router-dom`), and global authentication context. Communicates with the backend via centralized Axios interceptors.
2. **Server (Express)**: Provides RESTful endpoints for authentication, AI analysis, resume parsing, and user data. Employs modular controllers and middleware (e.g., error handling, JWT verification).
3. **Database (MongoDB)**: Stores user credentials (hashed), session tokens, and historical performance metrics.

---

## 🚀 Installation & Setup

### Prerequisites
- Node.js (v18+ recommended)
- MongoDB running locally or a MongoDB Atlas URI

### 1. Clone the Repository
```bash
git clone https://github.com/ArunimaRa/InterviewIQ-AI-Based-Mock-Interview-Preparation-Platform.git
cd InterviewIQ-AI-Based-Mock-Interview-Preparation-Platform
```

### 2. Install Dependencies
Install dependencies for both the frontend and backend simultaneously:
```bash
npm run install-all
```

### 3. Environment Variables
Create a `.env` file in the `server` directory using the provided example:
```bash
cp server/.env.example server/.env
```
Update `server/.env` with your actual MongoDB URI and a secure JWT secret:
```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/interviewiq
JWT_SECRET=your_super_secret_key
NODE_ENV=development
```

### 4. Run the Application
Start both the React frontend and Express backend concurrently:
```bash
npm run dev
```
- Frontend: `http://localhost:3000`
- Backend: `http://localhost:5000`

---

## 📸 Screenshots

*(Replace these placeholder links with actual screenshots of your application)*

| Dashboard Analytics | AI Mock Interview |
|:---:|:---:|
| ![Dashboard](https://via.placeholder.com/400x250/1F2937/FFFFFF?text=Analytics+Dashboard) | ![Interview](https://via.placeholder.com/400x250/1F2937/FFFFFF?text=AI+Mock+Interview) |

| Resume Analysis | MCQ Tests |
|:---:|:---:|
| ![Resume](https://via.placeholder.com/400x250/1F2937/FFFFFF?text=Resume+Analysis) | ![MCQ](https://via.placeholder.com/400x250/1F2937/FFFFFF?text=MCQ+Testing) |

---

## 🔮 Future Improvements

- [ ] Integration with advanced LLMs (GPT-4/Claude) for more nuanced technical conversational follow-ups.
- [ ] Speech-to-text integration allowing users to answer mock questions verbally.
- [ ] Automated code-execution environments for live algorithmic coding challenges.
- [ ] Peer-to-peer mock interview scheduling system.

---

## 📄 Resume-Friendly Description

> **InterviewIQ – AI-Based Mock Interview Preparation Platform**
> Developed a full-stack AI-powered interview preparation platform using React.js, Node.js, Express.js, and MongoDB to help users practice and improve interview performance. Implemented JWT-based authentication and protected routes to ensure secure user access and session management. Built interactive mock interview, resume analysis, and performance analytics modules with dynamic dashboards and real-time feedback features. Designed responsive and modern user interfaces using Tailwind CSS, Framer Motion, and Recharts to enhance user experience across devices. Developed scalable REST APIs and integrated AI-driven feedback mechanisms for personalized interview preparation and progress tracking.
