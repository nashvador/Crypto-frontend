import { useState, useEffect } from "react";
import provideApiCall from "../services/api/utilities/provideApiCall";
import { CircularProgress } from "@mui/material";
import { Container } from "@mui/material";
import Chip from "@mui/material/Chip";
import { ReactJSXElement } from "@emotion/react/types/jsx-namespace";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import Paper from "@mui/material";
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
    <div>
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
        <div>
          {" "}
          <Container maxWidth="sm">
            <Chip
              label={`Market Cap Rank ${getCoinInformation.market_data?.market_cap_rank}`}
            />
            <div>
              {" "}
              <img src={getCoinInformation.image?.thumb} />{" "}
              {getCoinInformation.name} {"("}
              {getCoinInformation.symbol}
              {")"}
            </div>
            <div>
              Current Price:{" "}
              {getCoinInformation.market_data?.current_price[currency]}
              {styleArrow(
                getCoinInformation.market_data?.price_change_percentage_24h
              )}
            </div>

            <div>
              Market Cap: {getCoinInformation.market_data.market_cap[currency]}
            </div>
            <div>
              Total Volume:
              {getCoinInformation.market_data.total_volume[currency]}
            </div>
            <div>
              Total Supply: {getCoinInformation.market_data.total_supply}
            </div>
          </Container>
          <Container maxWidth="sm">
            <div
              dangerouslySetInnerHTML={{
                __html: getCoinInformation.description?.en,
              }}
            ></div>
          </Container>{" "}
        </div>
      )}
    </div>
  );
};

export default IndividualCoinPage;
