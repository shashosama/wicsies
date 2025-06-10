import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { saveResult } from "../utils/saveResult";

const SurveyPage: React.FC = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [answers, setAnswers] = useState<string[]>([]);

  const questions = [
    {
      question: "How do you prefer to work?",
      options: ["Independently", "With a team", "Quick & experimental"],
    },
    {
      question: "Which sounds most exciting?",
      options: ["Building systems", "Creating visuals", "Debugging fast"],
    },
    {
      question: "What’s your dream project?",
      options: ["Hackathon", "AI art app", "Cybersecurity tool"],
    },  
  ];

  const handleSelect = (option: string) => {
    setAnswers((prev) => [...prev, option]);
    if (step < questions.length) {
      setStep(step + 1);
    } else {
      handleFinish([...answers, option]);
    }
  };

  const handleFinish = async (finalAnswers: string[]) => {
    // Very basic personality classifier
    let personality = "The Architect";
    let matches = ["Hackathons", "AI Career"];
    let interests = ["Mentorship", "Fundraisers"];

    if (finalAnswers.includes("With a team")) {
      personality = "The Creative";
      matches = ["Workshops", "Grace Hopper"];
      interests = ["Design", "Collaboration"];
    } else if (finalAnswers.includes("Quick & experimental")) {
      personality = "The Speedster";
      matches = ["Hackathons", "DevTools"];
      interests = ["Prototyping", "Startups"];
    }

    const result = { personality, matches, interests };

    await saveResult(result);
    navigate("/result", { state: { result } });
  };

  const currentQ = questions[step - 1];

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-pink-50 px-4">
      <div className="max-w-md w-full bg-white p-6 rounded-xl shadow-md">
        <h2 className="text-2xl font-bold mb-4">Question {step} of {questions.length}</h2>
        <p className="mb-4 font-medium">{currentQ.question}</p>
        <div className="flex flex-col space-y-2">
          {currentQ.options.map((opt) => (
            <button
              key={opt}
              onClick={() => handleSelect(opt)}
              className="bg-pink-500 text-white py-2 px-4 rounded hover:bg-pink-600 transition"
            >
              {opt}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SurveyPage;
