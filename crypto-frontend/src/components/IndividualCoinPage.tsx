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
import { ArrowDropDown, ArrowDropUp, Layers } from "@mui/icons-material";
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
          <ArrowDropDown fontSize="small" />
          {chartProp.toFixed(2)}
          {"%"}
        </div>
      );
    } else {
      return (
        <div style={{ color: "green" }}>
          <ArrowDropUp fontSize="small" />
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
              <Grid
                container
                direction="column"
                alignItems="center"
                justifyContent="center"
                spacing={0}
              >
                <Grid item>
                  <Chip
                    label={`Rank ${getCoinInformation.market_data?.market_cap_rank}`}
                  />
                </Grid>
                <Grid>
                  <Avatar
                    alt="coin-image"
                    src={getCoinInformation.image?.small}
                    variant="square"
                  ></Avatar>
                </Grid>
                <Grid item>
                  <Typography>
                    {getCoinInformation.name} {"("}
                    {getCoinInformation.symbol}
                    {")"}
                  </Typography>
                </Grid>
                <Chip label={getCoinInformation.links.homepage[0]}></Chip>
              </Grid>
            </Paper>
          </Grid>
          <Grid item xs={3}>
            <Paper
              sx={{
                height: 200,
                width: 300,
              }}
            >
              <Grid
                container
                direction="column"
                alignItems="center"
                justifyContent="center"
                spacing={0}
              >
                <Grid item>
                  <Typography>
                    {getCoinInformation.market_data?.current_price[currency]}
                  </Typography>
                </Grid>
                <Grid item>
                  {styleArrow(
                    getCoinInformation.market_data?.price_change_percentage_24h
                  )}
                </Grid>
                <Grid item>
                  <Layers fontSize="large" />
                </Grid>
              </Grid>
              <Grid
                container
                direction="row"
                alignItems="center"
                justifyContent="center"
                spacing={5}
              >
                <Grid item>
                  <Typography>ATH</Typography>
                  <Typography>
                    {getCoinInformation.market_data.ath[currency]}
                  </Typography>
                  <Typography>
                    {getCoinInformation.market_data.ath_change_percentage[
                      currency
                    ].toFixed(2) + `%`}
                  </Typography>
                  <Typography>
                    {new Date(
                      getCoinInformation.market_data.ath_date[currency]
                    ).toLocaleDateString()}
                  </Typography>
                </Grid>
                <Grid item>
                  <Typography>ATL</Typography>
                  <Typography>
                    {getCoinInformation.market_data.atl[currency]}
                  </Typography>
                  <Typography>
                    {getCoinInformation.market_data.atl_change_percentage[
                      currency
                    ].toFixed(2) + `%`}
                  </Typography>
                  <Typography>
                    {new Date(
                      getCoinInformation.market_data.atl_date[currency]
                    ).toLocaleDateString()}
                  </Typography>
                </Grid>
              </Grid>
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
