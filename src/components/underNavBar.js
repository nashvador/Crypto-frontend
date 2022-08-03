import { useState, useEffect } from "react";
import axios from "axios";

const UnderNavBar = () => {
  const [getGlobalInfo, setGlobalInfo] = useState({});

  const getNavBarData = async () => {
    const response = await axios.get("https://api.coingecko.com/api/v3/global");
    setGlobalInfo(response.data.data);
  };

  useEffect(() => {
    getNavBarData();
  }, []);

  const totalMarketValue = Object.values(getGlobalInfo.total_market_cap).reduce(
    (accumulator, value) => {
      return accumulator + value;
    },
    0
  );

  console.log(getGlobalInfo);

  return (
    <div>
      Coins: {getGlobalInfo.active_cryptocurrencies}, Exchanges:{" "}
      {getGlobalInfo.markets} Leader:{" "}
      {Object.keys(getGlobalInfo.market_cap_percentage)[0]}{" "}
      {Object.values(getGlobalInfo.market_cap_percentage)[0]}
      Total market cap: {totalMarketValue} down by{" "}
      {getGlobalInfo.market_cap_change_percentage_24h_usd}
    </div>
  );
};

export default UnderNavBar;
