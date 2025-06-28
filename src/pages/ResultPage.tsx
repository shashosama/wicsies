import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

const ResultPage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const result = location.state?.result;

  if (!result) {
    return (
      <div className="min-h-screen flex flex-col justify-center items-center bg-pink-50 text-center px-4">
        <h1 className="text-2xl font-bold mb-4">Oops!</h1>
        <p className="mb-4">No result found. Try taking the quiz again!</p>
        <button
          onClick={() => navigate("/survey")}
          className="bg-pink-500 text-white px-4 py-2 rounded hover:bg-pink-600"
        >
          Retake Quiz
        </button>
      </div>
    );
  }

  const { name, personality, matches, interests } = result;

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-pink-50 p-6 text-center">
      <div className="bg-white shadow-xl rounded-xl p-6 max-w-md w-full">
        <h1 className="text-3xl font-bold mb-2">Hi {name}!</h1>
        <h2 className="text-2xl font-semibold text-pink-600 mb-4">You're: {personality}</h2>
        <p className="text-gray-600 mb-6">Here's what suits you best:</p>

        <div className="mb-4">
          <h3 className="text-xl font-semibold mb-2">Top Matches</h3>
          <ul className="list-disc list-inside text-pink-700">
            {matches.map((m: string, idx: number) => (
              <li key={idx}>{m}</li>
            ))}
          </ul>
        </div>

        <div className="mb-4">
          <h3 className="text-xl font-semibold mb-2">Your Interests</h3>
          <ul className="list-disc list-inside text-pink-700">
            {interests.map((i: string, idx: number) => (
              <li key={idx}>{i}</li>
            ))}
          </ul>
        </div>

        <button
          onClick={() => navigate("/")}
          className="mt-6 bg-pink-500 text-white px-4 py-2 rounded hover:bg-pink-600"
        >
          Go Home
        </button>
      </div>
    </div>
  );
};

export default ResultPage;