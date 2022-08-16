import React, { useState, useEffect } from "react";
import getAPI from "../src/services/api/utilities/provideApiCall";
import logger from "./services/api/utilities/logger";
import CryptoTable from "./components/Table/CryptoTable";
import IndividualCoinPage from "./components/Table/IndividualCoinPage";
import { Routes, Route, Link, useNavigate } from "react-router-dom";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/coins/:id" element={<IndividualCoinPage />} />
        <Route path="/" element={<CryptoTable />} />
      </Routes>

      {/* <IndividualCoinPage /> */}
    </div>
  );
}

export default App;
