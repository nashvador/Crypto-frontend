import { useState, useEffect, Fragment } from "react";
import provideApiCall from "../services/api/utilities/provideApiCall";
import {
  CircularProgress,
  Paper,
  Grid,
  Typography,
  Avatar,
  Chip,
} from "@mui/material";
import { ReactJSXElement } from "@emotion/react/types/jsx-namespace";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import { useParams } from "react-router-dom";

interface CoinInformationTypes {
  image?: {
    thumb: string;
  };
  name?: string;
  symbol?: string;
  market_data?: {
    market_cap_rank: number;
    price_change_percentage_24h: number;
    current_price: {
      usd: number;
      gbp: number;
      eur: number;
      btc: number;
      eth: number;
    };
  };
  description: {
    en: string;
  };
}

const IndividualCoinPage = ({ currency }: { currency: string }) => {
  const [getCoinInformation, setGetCoinInformation] = useState<
    CoinInformationTypes | any
  >({});
  const [loading, setLoading] = useState<boolean>(true);
  const id = useParams().id;

  const baseURL = `${id}?localization=false&tickers=false&market_data=true&community_data=true&developer_data=false&sparkline=false`;

  useEffect(() => {
    const getAndSetData = async (): Promise<void> => {
      const response: any = await provideApiCall.callApiInfo(
        `https://api.coingecko.com/api/v3/coins/${baseURL}`
      );
      setGetCoinInformation(response.data);
      setLoading(false);
    };
    getAndSetData();
  }, [id]);

  console.log(getCoinInformation);

  const styleArrow = (chartProp: number | undefined): ReactJSXElement => {
    if (chartProp?.toString().includes("-")) {
      return (
        <div style={{ color: "red" }}>
          <ArrowDropDownIcon fontSize="small" />
          {chartProp.toFixed(2)}
          {"%"}
        </div>
      );
    } else {
      return (
        <div style={{ color: "green" }}>
          <ArrowDropUpIcon fontSize="small" />
          {chartProp?.toFixed(2)}
          {"%"}
        </div>
      );
    }
  };

  return (
    <Fragment>
      {loading ? (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: "100vh",
          }}
        >
          <CircularProgress size="10rem" />
        </div>
      ) : (
        <Grid
          container
          direction="row"
          alignItems="center"
          justifyContent="center"
          spacing={1}
          style={{ minHeight: "100vh" }}
        >
          <Grid item xs={3}>
            <Paper
              sx={{
                height: 200,
                width: 300,
              }}
            >
              <Chip
                label={`Rank ${getCoinInformation.market_data?.market_cap_rank}`}
              />
              <Avatar
                alt="coin-image"
                src={getCoinInformation.image?.small}
                variant="square"
              ></Avatar>
              <Typography>
                {getCoinInformation.name} {"("}
                {getCoinInformation.symbol} {")"}
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={3}>
            <Paper
              sx={{
                height: 200,
                width: 300,
              }}
            >
              <Typography>
                {`Current Price : ${getCoinInformation.market_data?.current_price[currency]}`}
                {styleArrow(
                  getCoinInformation.market_data?.price_change_percentage_24h
                )}
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={3}>
            <Paper
              sx={{
                height: 200,
                width: 300,
              }}
            >
              <Typography>
                {`Market Cap: ${getCoinInformation.market_data.market_cap[currency]}`}
                {`Total Volume:
              ${getCoinInformation.market_data.total_volume[currency]}`}
                {`Total Supply: ${getCoinInformation.market_data.total_supply}`}
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={9}>
            <Typography
              dangerouslySetInnerHTML={{
                __html: getCoinInformation.description?.en,
              }}
            ></Typography>
          </Grid>
        </Grid>
      )}
    </Fragment>
  );
};

export default IndividualCoinPage;
