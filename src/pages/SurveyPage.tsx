import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const SurveyPage: React.FC = () => {
  const navigate = useNavigate();
  const [answers, setAnswers] = useState<number[]>(Array(3).fill(0));
  const [name, setName] = useState<string>("");

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
    if (score <= 2) return "The Debugger";
    if (score <= 4) return "The Architect";
    return "The Creative";
  };

  const getMatches = (personality: string) => {
    const matchMap: { [key: string]: string[] } = {
      "The Debugger": ["Bug Bounty Programs", "Code Review Sessions", "Testing Workshops"],
      "The Architect": ["System Design Talks", "Architecture Meetups", "Tech Leadership Events"],
      "The Creative": ["UI/UX Workshops", "Design Thinking Sessions", "Frontend Meetups"]
    };
    return matchMap[personality] || [];
  };

  const getInterests = (personality: string) => {
    const interestMap: { [key: string]: string[] } = {
      "The Debugger": ["Problem Solving", "Code Quality", "Testing"],
      "The Architect": ["System Design", "Scalability", "Leadership"],
      "The Creative": ["User Experience", "Visual Design", "Innovation"]
    };
    return interestMap[personality] || [];
  };

  const handleSubmit = () => {
    if (!name.trim()) {
      alert("Please enter your name!");
      return;
    }

    const personality = calculatePersonality();
    const matches = getMatches(personality);
    const interests = getInterests(personality);

    const result = {
      name: name.trim(),
      personality,
      matches,
      interests,
      answers
    };

    navigate("/results", { state: { result } });
  };

  return (
    <div className="min-h-screen bg-orange-50 flex flex-col items-center p-6">
      <h1 className="text-3xl font-bold mb-6">🍡 Wicsies Personality Survey</h1>
      
      <div className="w-full max-w-xl mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          What should we call you?
        </label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter your name"
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
        />
      </div>

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