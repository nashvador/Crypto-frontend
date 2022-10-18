import { useState, useEffect } from "react";
import axios from "axios";
import { user } from "../../App";
import PortfolioModal from "./portfolioModal";
import DeleteIcon from "@mui/icons-material/Delete";
import { Grid } from "@mui/material";

const Portfolio = ({
  currency,
  user,
}: {
  currency: string;
  user: user | null;
}) => {
  const [portfolio, setPortfolio] = useState<Array<object> | null>(null);
  const [coinString, setCoinString] = useState<string | null>(null);
  const [coinInfo, setCoinInfo] = useState<Array<any>>([]);

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

  console.log(portfolio);

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

  const displayArray: any = [];

  portfolio?.forEach((portfolioCoin: any) => {
    for (let i = 0; i < coinInfo.length; i++) {
      if (portfolioCoin.coinId === coinInfo[i].id) {
        displayArray.push({ ...coinInfo[i], ...portfolioCoin });
      }
    }
  });

  console.log(displayArray);

  const deleteItem = async (idCoin: string) => {
    if (portfolio) {
      const response = await axios.delete(
        `http://localhost:3005/api/portfolio/${idCoin}`,
        config
      );
      console.log(response.data);
      setPortfolio(portfolio.filter((coin: any) => coin.id !== idCoin));
    }
  };

  return (
    <Grid container>
      <Grid item>
        <PortfolioModal config={config} setPortfolio={setPortfolio} />
        Your Coins
      </Grid>
      {displayArray.map((coinDisplayInfo: any) => {
        return (
          <Grid item key={coinDisplayInfo.id}>
            <img src={coinDisplayInfo.image} />
            {coinDisplayInfo.name} {coinDisplayInfo.symbol.toUpperCase()}{" "}
            {`Date purchased: ${coinDisplayInfo.date}`}
            {`Amount owned: ${coinDisplayInfo.amountPurchased}`}
            {`Value of owned: ${
              coinDisplayInfo.amountPurchased * coinDisplayInfo.current_price
            }`}
            <DeleteIcon onClick={() => deleteItem(coinDisplayInfo.id)} />
          </Grid>
        );
      })}
    </Grid>
  );
};

export default Portfolio;
