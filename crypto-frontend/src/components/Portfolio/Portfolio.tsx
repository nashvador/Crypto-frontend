import { useState, useEffect } from "react";
import axios from "axios";
import { user } from "../../App";

const Portfolio = ({
  currency,
  user,
}: {
  currency: string;
  user: user | null;
}) => {
  const [portfolio, setPortfolio] = useState<Array<object> | null>(null);
  const [coinString, setCoinString] = useState<string | null>(null);
  const [coinInfo, setCoinInfo] = useState<string>("");

  const config: object = {
    headers: { Authorization: `bearer ${user?.token}` },
  };

  const callPortfolio = async (URL: string, header: object) => {
    const response = await axios.get(URL, header);
    return response.data;
  };

  console.log(user);

  useEffect(() => {
    if (user?.token) {
      callPortfolio("http://localhost:3005/api/portfolio/", config).then(
        (res) => setPortfolio(res[0].portfolio)
      );
    }
  }, [user]);

  useEffect(() => {
    if (portfolio) {
      const portfolioStringCombined: string = portfolio
        .map((personalCoinInfo: any) => personalCoinInfo.coinId)
        .join();
      setCoinString(portfolioStringCombined);
      const getAll = async (): Promise<object> => {
        const response = await axios.post(
          "http://localhost:3005/api/coininfo/",
          {
            url: `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&ids=${portfolioStringCombined}&order=market_cap_desc&page=1&sparkline=false&price_change_percentage=1h%2C24h%2C7d`,
          }
        );
        setCoinInfo(response.data);
        return response;
      };
      getAll();
    }
  }, [portfolio]);

  console.log(portfolio);
  console.log(coinString);
  console.log(coinInfo);

  return <div>hi</div>;
};

export default Portfolio;
