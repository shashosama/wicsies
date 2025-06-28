import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage.tsx";
import SurveyPage from "./pages/SurveyPage.tsx";
import ResultPage from "./pages/ResultPage.tsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/survey" element={<SurveyPage />} />
        <Route path="/results" element={<ResultPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;