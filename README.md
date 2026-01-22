### Psiko.ai Fullstack Personality Quiz
A modern, responsive personality quiz application built with React.js and Node.js. This project was developed as part of the Fullstack Engineer Intern recruitment test for Psiko.ai.

### Key Features
- 10 Behavioral Questions: Carefully selected multiple-choice questions to assess personality traits.
- Undo Capability (Back Button): Integrated logic to go back to previous questions while accurately reverting the score history.
- Dynamic Progress Bar: Provides real-time visual feedback on user progress.
- Score-Based Result Engine: Displays unique personality categories and messages based on final scores.
- Data Persistence: Automatically saves user scores and categories to the backend server.
- Modern UI: Clean card-based layout with a focus on User Experience (UX).

### Technical Stack
- Frontend: React.js (Hooks: useState, Functional Components)
- Backend: Node.js & Express.js
- Styling: Modern Inline CSS for better portability and performance
- API: RESTful API for result submission

### Getting Started
1. ## Prerequisites
Make sure you have Node.js installed on your machine.

2. ## Setup Backend
- Open your terminal and navigate to the backend folder:
- Bash
- cd backend
- npm install
- node server.js
- The server will run on http://localhost:5000.

3. ## Setup Frontend
- Open a new terminal window and navigate to the frontend folder:
- Bash
- cd frontend
- npm install
- npm start
- The app will launch at http://localhost:3000.

##  Project Structure
```text
PsikoAI-Fullstack-Intern-Test/
├── frontend/
│   ├── src/
│   │   └── App.js       # Main logic with scoring and UI
│   └── package.json
├── backend/
│   ├── server.js        # Express server and API routes
│   └── package.json
└── README.md            # Project documentation
```

### Assessment Criteria Met
- Must Have: 10 questions, scoring mechanism, result display, and data storage.
- Nice to Have: Enhanced UI/UX, Progress Bar, and differentiated result messages.
- Extra Feature: "Go Back" functionality with automated score correction.

Developed by : Dwi Cahyo Nugroho