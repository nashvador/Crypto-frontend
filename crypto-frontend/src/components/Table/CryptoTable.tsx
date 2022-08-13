import React, { useEffect, useState } from "react";
import provideApiCall from "../../services/api/utilities/provideApiCall";
import CircularIndeterminate from "../../models/LoadingCircle";
import TrendLineChart from "./ChartForTable/TrendlineChart";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { Create } from "@mui/icons-material";

interface chartApiData {
  market_cap_rank: number;
  image: string;
  name: string;
  symbol: string;
  current_price: number;
  price_change_percentage_1h_in_currency: number;
  price_change_percentage_24h_in_currency: number;
  price_change_percentage_7d_in_currency: number;
  total_volume: number;
  market_cap: number;
  sparkline_in_7d?: object;
}

const CryptoTable = () => {
  // create object and concat object values into the url? Perhaps use custom hook, ask about using any and questions
  const [getChartApiData, setChartApiData] = useState<
    Array<chartApiData | any>
  >([]);
  const [loading, setLoading] = useState<boolean>(true);

  const chartDataBaseURL =
    "?vs_currency=usd&order=market_cap_desc&per_page=50&page=1&sparkline=true&price_change_percentage=1h%2C24h%2C7d";

  useEffect(() => {
    provideApiCall.getMarketData(chartDataBaseURL).then((response) => {
      setChartApiData(response);
      setLoading(false);
    });
  }, []);

  function createData(
    marketCapRank: number,
    coinImage: string,
    coinName: string,
    coinSymbol: string,
    price: number,
    priceChangeOneHour: number,
    priceChangeOneDay: number,
    priceChangeOneWeek: number,
    dayVolume: number,
    MarketCap: number,
    sevenDayGraph: Array<number>
  ) {
    return {
      marketCapRank,
      coinImage,
      coinName,
      coinSymbol,
      price,
      priceChangeOneHour,
      priceChangeOneDay,
      priceChangeOneWeek,
      dayVolume,
      MarketCap,
      sevenDayGraph,
    };
  }

  const rows = getChartApiData.map((coinData) =>
    createData(
      coinData.market_cap_rank,
      coinData.image,
      coinData.name,
      coinData.symbol,
      coinData.current_price,
      coinData.price_change_percentage_1h_in_currency,
      coinData.price_change_percentage_24h_in_currency,
      coinData.price_change_percentage_7d_in_currency,
      coinData.total_volume,
      coinData.market_cap,
      coinData.sparkline_in_7d.price
    )
  );

  return (
    <div>
      <TableContainer>
        {/* {loading ? (
          CircularIndeterminate()
        ) : (
          <Box sx={{ bgcolor: "#cfe8fc", height: "100vh" }} />
        )} */}
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Market Cap Rank</TableCell>
              <TableCell align="right">Coin</TableCell>
              <TableCell align="right">Price</TableCell>
              <TableCell align="right">Price Change in 1 Hour</TableCell>
              <TableCell align="right">Price Change in 1 Day</TableCell>
              <TableCell align="right">Price Change in 1 Week</TableCell>
              <TableCell align="right">Total Volume</TableCell>
              <TableCell align="right">Market Cap</TableCell>
              <TableCell>Last 7 Days Trend</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row, id) => (
              <TableRow
                key={id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.marketCapRank}
                </TableCell>
                <TableCell align="right">
                  <img src={row.coinImage} width="20" height="20"></img>
                  {row.coinName}
                  {" ("}
                  {row.coinSymbol}
                  {")"}
                </TableCell>
                <TableCell align="right">{row.price}</TableCell>
                <TableCell align="right">{row.priceChangeOneHour}</TableCell>
                <TableCell align="right">{row.priceChangeOneDay}</TableCell>
                <TableCell align="right">{row.priceChangeOneWeek}</TableCell>
                <TableCell align="right">{row.dayVolume}</TableCell>
                <TableCell align="right">{row.MarketCap}</TableCell>
                <TableCell align="right">
                  <TrendLineChart trendSevenDays={row.sevenDayGraph} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default CryptoTable;
