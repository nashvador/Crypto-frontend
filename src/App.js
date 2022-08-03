import { useState, useEffect } from "react";
import axios from "axios";
import UnderNavBar from "./components/underNavBar";
import DisplayTable from "./components/displayTable";

function App() {
  const [getApiInfo, setApiInfo] = useState([]);

  const getApiCall = async () => {
    const response = await axios.get(
      "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=25&page=1&sparkline=false"
    );
    setApiInfo(response.data);
  };
  useEffect(() => {
    getApiCall();
  }, []);

  return (
    <div>
      <UnderNavBar />
      <DisplayTable />
    </div>
  );
}

export default App;
