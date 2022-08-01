import { useState, useEffect } from "react";
import UnderNavBar from "./components/underNavBar";
import axios from "axios";

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

  console.log(getApiInfo);

  return (
    <div>
      <UnderNavBar />
      {getApiInfo.map((coin) => (
        <div> {coin.id}</div>
      ))}
    </div>
  );
}

export default App;
