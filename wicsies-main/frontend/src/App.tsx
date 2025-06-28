import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LandingPage"; 
import LandingPage from "./pages/LandingPage";
import SurveyPage from "./pages/surveyPage";
// (others: SurveyPage, ResultsPage, etc.)

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />

        {/* Add next pages later: */}
        { <Route path="/survey" element={<SurveyPage />} /> }
      </Routes>
    </BrowserRouter>
  );
}

export default App;
