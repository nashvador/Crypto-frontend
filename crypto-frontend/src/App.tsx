import React, { useState, useEffect } from "react";
import getAPI from "../src/services/api/utilities/provideApiCall";
import logger from "./services/api/utilities/logger";
import CryptoTable from "./components/Table/CryptoTable";
import IndividualCoinPage from "./components/Table/IndividualCoinPage";
import { BrowserRouter as Router } from "react-router-dom";

function App() {
  return (
    <div>
      <Router>
        <CryptoTable />
      </Router>

      {/* <IndividualCoinPage /> */}
    </div>
  );
}

export default App;
