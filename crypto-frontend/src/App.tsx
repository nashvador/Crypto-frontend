import React, { useState, useEffect } from "react";
import axios from "axios";
import getAPI from "../src/services/api/utilities/provideApiCall";

function App() {
  const [getTestGlobalApi, setTestGlobalApi] = useState<object>({});

  useEffect(() => {
    getAPI.getAll("global").then((response) => setTestGlobalApi(response));
  }, []);
  console.log(getTestGlobalApi);
  return <div></div>;
}

export default App;
