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
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import { ReactJSXElement } from "@emotion/react/types/jsx-namespace";
import TableSortLabel from "@mui/material/TableSortLabel";

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

// more documentation
const CryptoTable = () => {
  // create object and concat object values into the url? Perhaps use custom hook, ask about using any and questions

  const [getChartApiData, setChartApiData] = useState<
    Array<chartApiData | any>
  >([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [orderDirection, setOrderDirection] = useState<"asc" | "desc">("asc");
  const [valueToOrderBy, setValueToOrderBy] = useState<string>();

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

  const styleColor = (chartProp: number): object => {
    if (chartProp.toString().includes("-")) {
      return { color: "red" };
    } else {
      return { color: "green" };
    }
  };

  const handleRequestSort = (event: any, property: any): void => {
    const isAscending = valueToOrderBy === property && orderDirection === "asc";
    setValueToOrderBy(property);
    setOrderDirection(isAscending ? "desc" : "asc");
  };

  const createSortHandler = (property: any) => (event: any) => {
    handleRequestSort(event, property);
  };

  const styleArrow = (chartProp: number): ReactJSXElement => {
    if (chartProp.toString().includes("-")) {
      return (
        <div>
          <ArrowDropDownIcon fontSize="small" htmlColor="red" />
          {chartProp.toFixed(2)}
          {"%"}
        </div>
      );
    } else {
      return (
        <div>
          <ArrowDropUpIcon fontSize="small" htmlColor="green" />
          {chartProp.toFixed(2)}
          {"%"}
        </div>
      );
    }
  };

  function descendingComparator(a: any, b: any, orderBy: any) {
    if (b[orderBy] < a[orderBy]) {
      return -1;
    }
    if (b[orderBy] > a[orderBy]) {
      return 1;
    }
    return 0;
  }

  function getComparator(order: any, orderBy: any) {
    return order === "desc"
      ? (a: any, b: any) => descendingComparator(a, b, orderBy)
      : (a: any, b: any) => -descendingComparator(a, b, orderBy);
  }

  const sortedRowInformation = (rowArray: any, comparator: any) => {
    const stabilizedRowArray = rowArray.map((el: any, index: any) => [
      el,
      index,
    ]);
    stabilizedRowArray.sort((a: any, b: any) => {
      const order = comparator(a[0], b[0]);
      if (order !== 0) return order;
      return a[1] - b[1];
    });
    return stabilizedRowArray.map((el: any) => el[0]);
  };

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
              <TableCell align="right">Market Cap Rank</TableCell>
              <TableCell align="right">Coin</TableCell>
              <TableCell align="right" key="price">
                <TableSortLabel
                  active={valueToOrderBy === "price"}
                  direction={
                    valueToOrderBy === "price" ? orderDirection : "asc"
                  }
                  onClick={createSortHandler("price")}
                >
                  Price
                </TableSortLabel>
              </TableCell>
              <TableCell align="right" key="priceChangeOneHour">
                <TableSortLabel
                  active={valueToOrderBy === "priceChangeOneHour"}
                  direction={
                    valueToOrderBy === "priceChangeOneHour"
                      ? orderDirection
                      : "asc"
                  }
                  onClick={createSortHandler("priceChangeOneHour")}
                >
                  Price Change in 1 Hour
                </TableSortLabel>
              </TableCell>
              <TableCell align="right" key="priceChangeOneDay">
                <TableSortLabel
                  active={valueToOrderBy === "priceChangeOneDay"}
                  direction={
                    valueToOrderBy === "priceChangeOneDay"
                      ? orderDirection
                      : "asc"
                  }
                  onClick={createSortHandler("priceChangeOneDay")}
                >
                  Price Change in 1 Day
                </TableSortLabel>
              </TableCell>
              <TableCell align="right" key="priceChangeOneWeek">
                <TableSortLabel
                  active={valueToOrderBy === "priceChangeOneWeek"}
                  direction={
                    valueToOrderBy === "priceChangeOneWeek"
                      ? orderDirection
                      : "asc"
                  }
                  onClick={createSortHandler("priceChangeOneWeek")}
                >
                  Price Change in 1 week
                </TableSortLabel>
              </TableCell>
              <TableCell align="right">Total Volume</TableCell>
              <TableCell align="right">Market Cap</TableCell>
              <TableCell align="right">Last 7 Days Trend</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {/* {rows.map((row, id) => (
              <TableRow key={id}>
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
                <TableCell
                  align="right"
                  style={styleColor(row.priceChangeOneHour)}
                >
                  {styleArrow(row.priceChangeOneHour)}
                </TableCell>
                <TableCell
                  align="right"
                  style={styleColor(row.priceChangeOneDay)}
                >
                  {styleArrow(row.priceChangeOneDay)}
                </TableCell>
                <TableCell
                  align="right"
                  style={styleColor(row.priceChangeOneWeek)}
                >
                  {styleArrow(row.priceChangeOneWeek)}
                </TableCell>
                <TableCell align="right">{row.dayVolume}</TableCell>
                <TableCell align="right">{row.MarketCap}</TableCell>
                <TableCell align="right">
                  <TrendLineChart trendSevenDays={row.sevenDayGraph} />
                </TableCell>
              </TableRow>
            ))} */}
            {sortedRowInformation(
              rows,
              getComparator(orderDirection, valueToOrderBy)
            ).map((row: any, id: any) => (
              <TableRow key={id}>
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
                <TableCell
                  align="right"
                  style={styleColor(row.priceChangeOneHour)}
                >
                  {styleArrow(row.priceChangeOneHour)}
                </TableCell>
                <TableCell
                  align="right"
                  style={styleColor(row.priceChangeOneDay)}
                >
                  {styleArrow(row.priceChangeOneDay)}
                </TableCell>
                <TableCell
                  align="right"
                  style={styleColor(row.priceChangeOneWeek)}
                >
                  {styleArrow(row.priceChangeOneWeek)}
                </TableCell>
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
