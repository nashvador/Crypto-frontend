import { useState } from "react";

import IndividualCoinPage from "./components/IndividualCoinPage";
import { Routes, Route } from "react-router-dom";
import FrontPage from "./components/FrontPage";
import NavBar from "./components/NavBar";
import SignIn from "./components/LogInPage";

function App() {
  const [currency, setCurrency] = useState<string>("usd");

  return (
    <div>
      <NavBar currency={currency} setCurrency={setCurrency} />
      <Routes>
        <Route
          path="/coins/:id"
          element={<IndividualCoinPage currency={currency} />}
        />
        <Route path="/" element={<FrontPage currency={currency} />} />
        <Route path="/login" element={<SignIn />} />
      </Routes>
    </div>
  );
}

export default App;
