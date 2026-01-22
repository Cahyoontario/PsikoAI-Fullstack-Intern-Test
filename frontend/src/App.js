import React, { useState } from 'react';

const QUESTIONS = [
  { text: "I enjoy meeting new people.", weightType: "positive" },
  { text: "I prefer planned activities over spontaneous ones.", weightType: "negative" },
  { text: "I often worry about things.", weightType: "negative" },
  { text: "I feel energized after spending time with many people.", weightType: "positive" },
  { text: "I tend to think deeply before speaking.", weightType: "negative" },
  { text: "I like being the center of attention.", weightType: "positive" },
  { text: "I prefer working alone rather than in a group.", weightType: "negative" },
  { text: "I am always prepared for any situation.", weightType: "positive" },
  { text: "I find it easy to start conversations with strangers.", weightType: "positive" },
  { text: "I rely more on logic than on feelings.", weightType: "positive" }
];

const getResultData = (finalScore) => {
  if (finalScore >= 25) {
    return { category: "The Social Leader (Extrovert)", message: "You get a lot of energy from being around people!", color: "#4CAF50" };
  } else if (finalScore >= 18) {
    return { category: "The Balanced Observer (Ambivert)", message: "You enjoy socializing but you also need your alone time.", color: "#2196F3" };
  } else {
    return { category: "The Deep Thinker (Introvert)", message: "You prefer calm places and thinking deeply about things.", color: "#9C27B0" };
  }
};

function App() {
  const [step, setStep] = useState(0);
  const [scoreHistory, setScoreHistory] = useState([]); // To store previous scores for "Back"
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);

  const handleAnswer = (points) => {
    // Save current score to history before updating
    setScoreHistory([...scoreHistory, score]);
    
    const nextScore = score + points;
    if (step + 1 < QUESTIONS.length) {
      setScore(nextScore);
      setStep(step + 1);
    } else {
      setScore(nextScore);
      setFinished(true);
      saveResult(nextScore);
    }
  };

  // NEW: Back Function
  const handleBack = () => {
    if (step > 0) {
      const prevScore = scoreHistory[scoreHistory.length - 1];
      const newHistory = scoreHistory.slice(0, -1);
      
      setScore(prevScore);
      setScoreHistory(newHistory);
      setStep(step - 1);
    }
  };

  const saveResult = (finalScore) => {
    const resultInfo = getResultData(finalScore); 
    fetch('http://localhost:5000/api/results', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ score: finalScore, category: resultInfo.category })
    }).catch(err => console.log("Backend offline"));
  };

  const styles = {
    container: { fontFamily: "'Segoe UI', sans-serif", backgroundColor: "#f0f2f5", minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", padding: "20px" },
    card: { backgroundColor: "white", padding: "40px", borderRadius: "15px", boxShadow: "0 4px 12px rgba(0,0,0,0.1)", maxWidth: "500px", width: "100%", textAlign: "center" },
    button: { padding: "12px", margin: "5px 0", cursor: "pointer", border: "1px solid #ddd", borderRadius: "8px", backgroundColor: "white", fontSize: "16px", transition: "0.2s" },
    backButton: { marginTop: "15px", background: "none", border: "none", color: "#888", cursor: "pointer", textDecoration: "underline", fontSize: "14px" },
    progressBar: { background: "#eee", height: "8px", borderRadius: "10px", marginBottom: "30px", overflow: "hidden" }
  };

  if (finished) {
    const result = getResultData(score);
    return (
      <div style={styles.container}>
        <div style={styles.card}>
          <h1 style={{ color: result.color }}>{result.category}</h1>
          <p style={{ fontSize: "18px", color: "#666", marginBottom: "30px" }}>{result.message}</p>
          <div style={{ fontSize: "24px", fontWeight: "bold", marginBottom: "30px" }}>Score: {score}</div>
          <button onClick={() => window.location.reload()} style={{ ...styles.button, backgroundColor: result.color, color: "white", border: "none", width: "100%" }}>Take Quiz Again</button>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2>Psiko.ai Personality Test</h2>
        <p style={{ color: "#888" }}>Question {step + 1} of {QUESTIONS.length}</p>
        
        <div style={styles.progressBar}>
          <div style={{ width: `${((step + 1) / QUESTIONS.length) * 100}%`, background: "#4CAF50", height: "100%", transition: "width 0.4s ease" }}></div>
        </div>

        <h3 style={{ marginBottom: "30px" }}>{QUESTIONS[step].text}</h3>
        
        <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          <button style={styles.button} onClick={() => handleAnswer(3)}>Agree</button>
          <button style={styles.button} onClick={() => handleAnswer(2)}>Neutral</button>
          <button style={styles.button} onClick={() => handleAnswer(1)}>Disagree</button>
        </div>

        {/* BACK BUTTON */}
        {step > 0 && (
          <button style={styles.backButton} onClick={handleBack}>
            ← Go back to previous question
          </button>
        )}
      </div>
    </div>
  );
}

export default App;