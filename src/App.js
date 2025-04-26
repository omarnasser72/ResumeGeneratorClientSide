import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Components/Home/Home";
import ResumeGeneration from "./Components/ResumeGeneration/ResumeGerneration";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/ResumeGeneration" element={<ResumeGeneration />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
