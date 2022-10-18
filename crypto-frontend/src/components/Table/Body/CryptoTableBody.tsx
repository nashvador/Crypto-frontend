import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import TrendLineChart from "../ChartForTable/TrendlineChart";
import { ReactJSXElement } from "@emotion/react/types/jsx-namespace";
import { Link } from "react-router-dom";

const CryptoTableBody = ({
  valueToOrderBy,
  orderDirection,
  rows,
  getComparator,
  sortedRowInformation,
}: {
  valueToOrderBy: string;
  orderDirection: "asc" | "desc";
  rows: Array<object>;
  getComparator: (order: "asc" | "desc", orderBy: string) => any;
  sortedRowInformation: (rowArray: Array<object>, comparator: any) => any;
}) => {
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

  function convertToValue(labelValue: number) {
    return Math.abs(Number(labelValue)) >= 1.0e9
      ? (Math.abs(Number(labelValue)) / 1.0e9).toFixed(2) + "B"
      : Math.abs(Number(labelValue)) >= 1.0e6
      ? (Math.abs(Number(labelValue)) / 1.0e6).toFixed(2) + "M"
      : Math.abs(Number(labelValue)) >= 1.0e3
      ? (Math.abs(Number(labelValue)) / 1.0e3).toFixed(2) + "K"
      : Math.abs(Number(labelValue));
  }

  return (
    <TableBody>
      {sortedRowInformation(
        rows,
        getComparator(orderDirection, valueToOrderBy)
      ).map((row: any, id: number) => (
        <TableRow key={id}>
          <TableCell component="th" scope="row" align="right">
            {row.marketCapRank}
          </TableCell>
          <TableCell align="right">
            <img src={row.coinImage} width="20" height="20"></img>
            {"  "}
            <Link to={`/coins/${row.id}`} key={row.id}>
              {row.coinName}
              {" ("}
              {row.coinSymbol}
              {")"}
            </Link>
          </TableCell>
          <TableCell align="right">{row.price}</TableCell>
          <TableCell align="right" style={styleColor(row.priceChangeOneHour)}>
            {styleArrow(row.priceChangeOneHour)}
          </TableCell>
          <TableCell align="right" style={styleColor(row.priceChangeOneDay)}>
            {styleArrow(row.priceChangeOneDay)}
          </TableCell>
          <TableCell align="right" style={styleColor(row.priceChangeOneWeek)}>
            {styleArrow(row.priceChangeOneWeek)}
          </TableCell>
          <TableCell align="right">{convertToValue(row.dayVolume)}</TableCell>
          <TableCell align="right">{convertToValue(row.MarketCap)}</TableCell>
          <TableCell align="right">
            <TrendLineChart trendSevenDays={row.sevenDayGraph} />
          </TableCell>
        </TableRow>
      ))}
    </TableBody>
  );
};

export default CryptoTableBody;
