"use client";
import { useEffect, useState } from "react";
import { Wallet } from "@coinbase/onchainkit/wallet";
import { useMiniKit } from "@coinbase/onchainkit/minikit";

const topics = [
  { id: "world", label: "🌍 World Knowledge", description: "Geography, science, culture" },
  { id: "blockchain", label: "₿ Blockchain Basics", description: "How crypto really works" },
  { id: "coins", label: "🪙 Coins & Tokens", description: "Bitcoin, ETH, altcoins" },
  { id: "trading", label: "📈 Trading", description: "Charts, strategies, markets" },
  { id: "forex", label: "💱 Forex & Markets", description: "Currencies, global finance" },
];

type Question = {
  question: string;
  options: string[];
  answer: number;
  explanation: string;
};

export default function Home() {
  const { setMiniAppReady, isMiniAppReady } = useMiniKit();
  const [screen, setScreen] = useState<"topics" | "quiz" | "result">("topics");
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [loading, setLoading] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);

  useEffect(() => {
    if (!isMiniAppReady) setMiniAppReady();
  }, [setMiniAppReady, isMiniAppReady]);

  const startQuiz = async () => {
    if (!selectedTopic) return;
    setLoading(true);
    try {
      const res = await fetch("/api/generate-quiz", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ topic: selectedTopic }),
      });
      const data = await res.json();
      setQuestions(data.questions);
      setCurrent(0);
      setScore(0);
      setSelected(null);
      setShowExplanation(false);
      setScreen("quiz");
    } catch {
      alert("Failed to load questions. Try again!");
    }
    setLoading(false);
  };

  const handleAnswer = (index: number) => {
    if (selected !== null) return;
    setSelected(index);
    setShowExplanation(true);
    if (index === questions[current].answer) setScore((s) => s + 1);
  };

  const nextQuestion = () => {
    if (current + 1 >= questions.length) {
      setScreen("result");
    } else {
      setCurrent((c) => c + 1);
      setSelected(null);
      setShowExplanation(false);
    }
  };

  if (screen === "topics") return (
    <div style={{ minHeight: "100vh", background: "#0a0a0a", color: "white", padding: "20px" }}>
      <header style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "32px" }}>
        <h1 style={{ fontSize: "24px", fontWeight: "bold" }}>🧠 QuizChain</h1>
        <Wallet />
      </header>
      <p style={{ color: "#888", marginBottom: "24px" }}>What are you learning today?</p>
      <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
        {topics.map((topic) => (
          <button key={topic.id} onClick={() => setSelectedTopic(topic.id)}
            style={{ background: selectedTopic === topic.id ? "#1a56db" : "#1a1a1a", border: selectedTopic === topic.id ? "2px solid #3b82f6" : "2px solid #333", borderRadius: "12px", padding: "16px", textAlign: "left", cursor: "pointer", color: "white" }}>
            <div style={{ fontSize: "18px", fontWeight: "bold" }}>{topic.label}</div>
            <div style={{ fontSize: "13px", color: "#aaa", marginTop: "4px" }}>{topic.description}</div>
          </button>
        ))}
      </div>
      {selectedTopic && (
        <button onClick={startQuiz} disabled={loading}
          style={{ marginTop: "24px", width: "100%", padding: "16px", background: loading ? "#555" : "#1a56db", border: "none", borderRadius: "12px", color: "white", fontSize: "18px", fontWeight: "bold", cursor: "pointer" }}>
          {loading ? "Loading Questions..." : "Start Quiz →"}
        </button>
      )}
    </div>
  );

  if (screen === "quiz" && questions.length > 0) {
    const q = questions[current];
    return (
      <div style={{ minHeight: "100vh", background: "#0a0a0a", color: "white", padding: "20px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "24px" }}>
          <span style={{ color: "#888" }}>Question {current + 1}/{questions.length}</span>
          <span style={{ color: "#3b82f6" }}>Score: {score}</span>
        </div>
        <h2 style={{ fontSize: "20px", marginBottom: "24px", lineHeight: "1.4" }}>{q.question}</h2>
        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          {q.options.map((opt, i) => (
            <button key={i} onClick={() => handleAnswer(i)}
              style={{ padding: "16px", borderRadius: "12px", border: "2px solid", textAlign: "left", cursor: selected !== null ? "default" : "pointer", color: "white", fontSize: "16px",
                background: selected === null ? "#1a1a1a" : i === q.answer ? "#166534" : i === selected ? "#7f1d1d" : "#1a1a1a",
                borderColor: selected === null ? "#333" : i === q.answer ? "#22c55e" : i === selected ? "#ef4444" : "#333" }}>
              {opt}
            </button>
          ))}
        </div>
        {showExplanation && (
          <div style={{ marginTop: "20px", background: "#1a1a2e", border: "1px solid #3b82f6", borderRadius: "12px", padding: "16px" }}>
            <p style={{ color: "#93c5fd", fontSize: "14px" }}>💡 {q.explanation}</p>
          </div>
        )}
        {selected !== null && (
          <button onClick={nextQuestion}
            style={{ marginTop: "20px", width: "100%", padding: "16px", background: "#1a56db", border: "none", borderRadius: "12px", color: "white", fontSize: "18px", fontWeight: "bold", cursor: "pointer" }}>
            {current + 1 >= questions.length ? "See Results →" : "Next Question →"}
          </button>
        )}
      </div>
    );
  }

  if (screen === "result") return (
    <div style={{ minHeight: "100vh", background: "#0a0a0a", color: "white", padding: "20px", textAlign: "center" }}>
      <div style={{ marginTop: "60px" }}>
        <div style={{ fontSize: "80px" }}>{score >= 8 ? "🏆" : score >= 5 ? "🥈" : "📚"}</div>
        <h1 style={{ fontSize: "32px", marginTop: "20px" }}>Quiz Complete!</h1>
        <p style={{ fontSize: "48px", fontWeight: "bold", color: "#3b82f6", margin: "20px 0" }}>{score}/{questions.length}</p>
        <p style={{ color: "#888", marginBottom: "40px" }}>{score >= 8 ? "Outstanding! You're a master! 🔥" : score >= 5 ? "Great job! Keep learning! 💪" : "Keep going! Every quiz teaches you something new! 🌱"}</p>
        <button onClick={() => { setScreen("topics"); setSelectedTopic(null); }}
          style={{ padding: "16px 32px", background: "#1a56db", border: "none", borderRadius: "12px", color: "white", fontSize: "18px", fontWeight: "bold", cursor: "pointer" }}>
          Play Again →
        </button>
      </div>
    </div>
  );

  return null;
}