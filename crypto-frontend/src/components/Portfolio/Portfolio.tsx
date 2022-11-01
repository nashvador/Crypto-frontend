import { useState, useEffect, ReactElement } from "react";
import axios from "axios";
import { user } from "../../App";
import PortfolioModal from "./portfolioModal";
import DeleteIcon from "@mui/icons-material/Delete";
import provideApiCall from "../../services/api/utilities/provideApiCall";
import { Grid, Typography } from "@mui/material";
import { JsxElement } from "typescript";

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

  useEffect(() => {
    if (user?.token) {
      callPortfolio(
        process.env.REACT_APP_API_ENDPOINT! + `api/portfolio/`,
        config
      ).then((res) => setPortfolio(res[0].portfolio));
    }
  }, [user]);

  useEffect(() => {
    if (portfolio) {
      const portfolioStringCombined: string = portfolio
        .map((personalCoinInfo: any) => personalCoinInfo.coinId)
        .join();
      setCoinString(portfolioStringCombined);

      const getAndSetData = async (): Promise<void> => {
        const response: any = await provideApiCall.callApiInfo(
          `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&ids=${portfolioStringCombined}&order=market_cap_desc&page=1&sparkline=false&price_change_percentage=1h%2C24h%2C7d`
        );
        setCoinInfo(response.data);
      };
      getAndSetData();
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
        process.env.REACT_APP_API_ENDPOINT! + `api/portfolio/` + idCoin,
        config
      );
      console.log(response.data);
      setPortfolio(portfolio.filter((coin: any) => coin.id !== idCoin));
    }
  };

  return (
    <Grid
      container
      spacing={2}
      direction="column"
      alignItems="center"
      justifyContent="flex-start"
      style={{ minHeight: "100vh" }}
    >
      <Grid item>
        <PortfolioModal config={config} setPortfolio={setPortfolio} />
      </Grid>
      <Grid item>
        <Typography fontSize="30px">Your coins</Typography>
      </Grid>
      {user ? (
        displayArray.map((coinDisplayInfo: any) => {
          return (
            <Grid item key={coinDisplayInfo.id}>
              <Grid
                container
                spacing={2}
                direction="column"
                alignItems="center"
                justifyContent="flex-start"
              >
                <Grid item>
                  <img src={coinDisplayInfo.image} />
                </Grid>
                <Grid item>
                  {coinDisplayInfo.name}{" "}
                  {`(${coinDisplayInfo.symbol.toUpperCase()})`}
                </Grid>
              </Grid>
              <Grid
                container
                spacing={2}
                direction="row"
                alignItems="center"
                justifyContent="space-between"
              >
                <Grid item>{`Date purchased: ${new Date(
                  coinDisplayInfo.date
                ).toDateString()}`}</Grid>

                <Grid item>
                  {`Amount owned: ${coinDisplayInfo.amountPurchased}`}
                </Grid>
                <Grid item>
                  {`Value of owned: ${
                    coinDisplayInfo.amountPurchased *
                    coinDisplayInfo.current_price
                  }`}
                </Grid>
                <Grid item>
                  <DeleteIcon onClick={() => deleteItem(coinDisplayInfo.id)} />
                </Grid>
              </Grid>
            </Grid>
          );
        })
      ) : (
        <Grid item>
          <Typography fontSize="25px" color="red">
            You must login to see your coins
          </Typography>
        </Grid>
      )}
    </Grid>
  );
};

export default Portfolio;
