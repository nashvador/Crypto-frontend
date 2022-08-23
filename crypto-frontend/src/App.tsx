import IndividualCoinPage from "./components/IndividualCoinPage";
import { Routes, Route } from "react-router-dom";
import FrontPage from "./components/FrontPage";
import NavBar from "./components/NavBar";

function App() {
  return (
    <div>
      <NavBar />
      <Routes>
        <Route path="/coins/:id" element={<IndividualCoinPage />} />
        <Route path="/" element={<FrontPage />} />
      </Routes>
    </div>
  );
}

export default App;
