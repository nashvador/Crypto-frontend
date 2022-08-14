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
import { visuallyHidden } from "@mui/utils";

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
  sparkline_in_7d: Array<number>;
}

function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

type Order = "asc" | "desc";

function getComparator<Key extends keyof any>(
  order: Order,
  orderBy: Key
): (
  a: { [key in Key]: number | string },
  b: { [key in Key]: number | string }
) => number {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort<T>(array: T[], comparator: (a: T, b: T) => number) {
  const stabilizedThis = array.map((el, index) => [el, index] as [T, number]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

interface EnhancedTableProps {
  onRequestSort: (
    event: React.MouseEvent<unknown>,
    property: keyof chartApiData
  ) => void;
  order: Order;
  orderBy: string;
}

function EnhancedTableHead(props: EnhancedTableProps) {
  const { order, orderBy, onRequestSort } = props;
  const createSortHandler =
    (property: keyof chartApiData) => (event: React.MouseEvent<unknown>) => {
      onRequestSort(event, property);
    };
}

// more documentation
const CryptoTable = () => {
  // create object and concat object values into the url? Perhaps use custom hook, ask about using any and questions

  const [getChartApiData, setChartApiData] = useState<
    Array<chartApiData | any>
  >([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [order, setOrder] = React.useState<Order>("asc");
  const [orderBy, setOrderBy] =
    React.useState<keyof chartApiData>("current_price");

  const handleRequestSort = (
    event: React.MouseEvent<unknown>,
    property: keyof chartApiData
  ) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const chartDataBaseURL =
    "?vs_currency=usd&order=market_cap_desc&per_page=50&page=1&sparkline=true&price_change_percentage=1h%2C24h%2C7d";

  useEffect(() => {
    provideApiCall.getMarketData(chartDataBaseURL).then((response) => {
      setChartApiData(response);
      setLoading(false);
    });
  }, []);

  function createData(
    market_cap_rank: number,
    image: string,
    name: string,
    symbol: string,
    current_price: number,
    price_change_percentage_1h_in_currency: number,
    price_change_percentage_24h_in_currency: number,
    price_change_percentage_7d_in_currency: number,
    total_volume: number,
    market_cap: number,
    sparkline_in_7d: Array<number>
  ): chartApiData {
    return {
      market_cap_rank,
      image,
      name,
      symbol,
      current_price,
      price_change_percentage_1h_in_currency,
      price_change_percentage_24h_in_currency,
      price_change_percentage_7d_in_currency,
      total_volume,
      market_cap,
      sparkline_in_7d,
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

  interface HeadCell {
    id: keyof chartApiData;
    label: string;
    numeric: boolean;
  }

  const headCells: readonly HeadCell[] = [
    {
      id: "market_cap_rank",
      numeric: true,
      label: "Market Cap Rank",
    },
    {
      id: "name",
      numeric: false,
      label: "Coin",
    },
    {
      id: "current_price",
      numeric: true,
      label: "Price",
    },
    {
      id: "price_change_percentage_1h_in_currency",
      numeric: true,
      label: "Price Change in 1 Hour",
    },
    {
      id: "price_change_percentage_24h_in_currency",
      numeric: true,
      label: "Price Change in 1 Day",
    },
    {
      id: "price_change_percentage_7d_in_currency",
      numeric: true,
      label: "Price Change in 1 Week",
    },
    {
      id: "market_cap",
      numeric: true,
      label: "Market Cap",
    },
    {
      id: "total_volume",
      numeric: true,
      label: "Total volume",
    },
  ];

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
              {headCells.map((headCell) => (
                <TableCell
                  key={headCell.id}
                  sortDirection={orderBy === headCell.id ? order : false}
                >
                  <TableSortLabel
                    active={orderBy === headCell.id}
                    direction={orderBy === headCell.id ? order : "asc"}
                    onClick={createSortHandler(headCell.id)}
                  >
                    {headCell.label}
                    {orderBy === headCell.id ? (
                      <Box component="span" sx={visuallyHidden}>
                        {order === "desc"
                          ? "sorted descending"
                          : "sorted ascending"}
                      </Box>
                    ) : null}
                  </TableSortLabel>
                </TableCell>
              ))}
              <TableCell>Last 7 Days Trend</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {stableSort(rows, getComparator(order, orderBy)).map((row, id) => (
              <TableRow key={id}>
                <TableCell component="th" scope="row">
                  {row.market_cap_rank}
                </TableCell>
                <TableCell align="right">
                  <img src={row.image} width="20" height="20"></img>
                  {row.name}
                  {" ("}
                  {row.symbol}
                  {")"}
                </TableCell>
                <TableCell align="right">{row.current_price}</TableCell>
                <TableCell
                  align="right"
                  style={styleColor(
                    Number(row.price_change_percentage_1h_in_currency)
                  )}
                >
                  {styleArrow(
                    Number(row.price_change_percentage_1h_in_currency)
                  )}
                </TableCell>
                <TableCell
                  align="right"
                  style={styleColor(
                    Number(row.price_change_percentage_24h_in_currency)
                  )}
                >
                  {styleArrow(
                    Number(row.price_change_percentage_24h_in_currency)
                  )}
                </TableCell>
                <TableCell
                  align="right"
                  style={styleColor(
                    Number(row.price_change_percentage_7d_in_currency)
                  )}
                >
                  {styleArrow(
                    Number(row.price_change_percentage_7d_in_currency)
                  )}
                </TableCell>
                <TableCell align="right">{row.total_volume}</TableCell>
                <TableCell align="right">{row.market_cap}</TableCell>
                <TableCell align="right">
                  <TrendLineChart trendSevenDays={row.sparkline_in_7d} />
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
