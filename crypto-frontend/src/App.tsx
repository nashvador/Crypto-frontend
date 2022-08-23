import IndividualCoinPage from "./components/IndividualCoinPage";
import { Routes, Route } from "react-router-dom";
import FrontPage from "./components/FrontPage";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/coins/:id" element={<IndividualCoinPage />} />
        <Route path="/" element={<FrontPage />} />
      </Routes>
    </div>
  );
}

export default App;
