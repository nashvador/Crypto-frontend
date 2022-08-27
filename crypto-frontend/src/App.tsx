import { useState, useEffect } from "react";

import IndividualCoinPage from "./components/IndividualCoinPage";
import { Routes, Route } from "react-router-dom";
import FrontPage from "./components/FrontPage";
import NavBar from "./components/NavBar";
import SignIn from "./components/UserAuthentication/LogInPage";
import SignUp from "./components/UserAuthentication/SignUpPage";
import Portfolio from "./components/Portfolio";
import userEvent from "@testing-library/user-event";

export interface user {
  token: string;
  username: string;
  name: string;
}

function App() {
  const [currency, setCurrency] = useState<string>("usd");
  const [user, setUser] = useState<user | null>(null);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedPortfolioUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
    }
  }, []);

  return (
    <div>
      <NavBar
        currency={currency}
        setCurrency={setCurrency}
        user={user}
        setUser={setUser}
      />
      <Routes>
        <Route
          path="/coins/:id"
          element={<IndividualCoinPage currency={currency} />}
        />
        <Route path="/" element={<FrontPage currency={currency} />} />
        <Route path="/portfolio" element={<Portfolio currency={currency} />} />

        <Route
          path="/login"
          element={<SignIn user={user} setUser={setUser} />}
        />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
    </div>
  );
}

export default App;
