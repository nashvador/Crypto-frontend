import React, { useState, useEffect } from "react";
import provideApiCall from "../../services/api/utilities/provideApiCall";
import CircularIndeterminate from "../../models/LoadingCircle";
import { Container } from "@mui/material";
import Chip from "@mui/material/Chip";
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

const IndividualCoinPage = () => {
  const [getCoinInformation, setGetCoinInformation] = useState<
    CoinInformationTypes | any
  >({});
  const [loading, setLoading] = useState<boolean>(true);
  const id = useParams().id;

  const currency = "usd";
  const baseURL = `${id}?localization=false&tickers=false&market_data=true&community_data=true&developer_data=false&sparkline=false`;

  useEffect(() => {
    provideApiCall.getCoinsData(baseURL).then((response) => {
      setGetCoinInformation(response);
      setLoading(false);
    });
  }, []);

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
        CircularIndeterminate()
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
              {getCoinInformation.market_data?.current_price[currency]}{" "}
              {styleArrow(
                getCoinInformation.market_data?.price_change_percentage_24h
              )}
            </div>

            <div>{getCoinInformation.market_data.market_cap[currency]}</div>
            <div>{getCoinInformation.market_data.total_volume[currency]}</div>
            <div>{getCoinInformation.market_data.total_supply}</div>
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
