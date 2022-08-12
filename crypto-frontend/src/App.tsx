import React, { useState, useEffect } from "react";
import getAPI from "../src/services/api/utilities/provideApiCall";
import logger from "./services/api/utilities/logger";
import CryptoTable from "./components/Table/CryptoTable";

function App() {
  const [getTestGlobalApi, setTestGlobalApi] = useState<object>({});

  useEffect(() => {
    getAPI.getAll("global").then((response) => setTestGlobalApi(response));
  }, []);
  return (
    <div>
      <CryptoTable />
    </div>
  );
}

export default App;
