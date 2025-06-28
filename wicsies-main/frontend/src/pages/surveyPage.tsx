import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { db, auth } from "../firebase";
import { doc, setDoc } from "firebase/firestore";

const SurveyPage: React.FC = () => {
  const navigate = useNavigate();
  const [answers, setAnswers] = useState<number[]>(Array(3).fill(0));

  const questions = [
    "How do you approach a new coding project?",
    "What excites you the most?",
    "Which tool would you grab first?",
  ];

  const options = [
    ["Fix bugs first", "Design the system", "Play with UI ideas"],
    ["Solving hard problems", "Making scalable systems", "Building cool experiences"],
    ["Debugger", "Whiteboard", "Figma or CSS editor"],
  ];

  const handleSelect = (qIdx: number, choice: number) => {
    const updated = [...answers];
    updated[qIdx] = choice;
    setAnswers(updated);
  };

  const calculatePersonality = () => {
    const score = answers.reduce((a, b) => a + b, 0);
    if (score <= 2) return "the-debugger";
    if (score <= 4) return "the-architect";
    return "the-creative";
  };

 const handleSubmit = async () => {
  const personality = calculatePersonality();
  const user = auth.currentUser;

  console.log("auth.currentUser:", user); // 🔍 Debug log

  if (!user) {
    alert("Still not logged in");
    return;
  }

  await setDoc(doc(db, "users", user.uid), {
    uid: user.uid,
    personality,
    answers,
  });

  navigate("/results");
};


  return (
    <div className="min-h-screen bg-orange-50 flex flex-col items-center p-6">
      <h1 className="text-3xl font-bold mb-6">🍡 Wicsies Personality Survey</h1>
      <div className="space-y-6 w-full max-w-xl">
        {questions.map((q, i) => (
          <div key={i}>
            <p className="font-semibold">{q}</p>
            <div className="flex gap-3 mt-2">
              {options[i].map((opt, j) => (
                <button
                  key={j}
                  onClick={() => handleSelect(i, j)}
                  className={`px-4 py-2 rounded border ${
                    answers[i] === j
                      ? "bg-orange-400 text-white"
                      : "bg-white text-gray-800"
                  }`}
                >
                  {opt}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
      <button
        onClick={handleSubmit}
        className="mt-8 bg-pink-500 text-white px-6 py-2 rounded hover:bg-pink-600"
      >
        Submit
      </button>
    </div>
  );
};

export default SurveyPage;
