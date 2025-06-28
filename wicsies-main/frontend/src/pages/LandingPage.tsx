// src/pages/LandingPage.tsx
import React from "react";
import { useNavigate } from "react-router-dom";

const LandingPage: React.FC = () => {
  const navigate = useNavigate();

  const handleStart = () => {
    navigate("/survey");
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-pink-50 px-4">
      <h1 className="text-4xl font-bold text-center mb-4">🍡 Welcome to Wicsies!</h1>
      <p className="text-center text-lg mb-6 max-w-md">
        Discover your Wicsies personality and get matched with events, clubs, and peers who vibe with you.
        No sign-in needed — just take the test and see what type of coder you are!
      </p>
      <button
        onClick={handleStart}
        className="bg-pink-500 text-white px-6 py-3 rounded-xl hover:bg-pink-600 transition text-lg"
      >
        Start the Quiz
      </button>
    </div>
  );
};

export default LandingPage;
