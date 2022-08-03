import { useState, useEffect, React } from "react";
import ChartForTable from "./chartForTable";
import axios from "axios";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";

const DisplayTable = () => {
  const [getApiInfo, setApiInfo] = useState([]);

  const getApiCall = async () => {
    const response = await axios.get(
      "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=true&price_change_percentage=1h%2C24h%2C7d"
    );
    setApiInfo(response.data);
  };
  useEffect(() => {
    getApiCall();
  }, []);

  function createData(
    marketCapRank,
    coinName,
    currentPrice,
    twentyFourHourChange,
    sevenDayChange
  ) {
    return {
      marketCapRank,
      coinName,
      currentPrice,
      twentyFourHourChange,
      sevenDayChange,
    };
  }

  const rows = getApiInfo.map((cryptoCoinInformation) =>
    createData(
      cryptoCoinInformation.market_cap_rank,
      cryptoCoinInformation.name,
      cryptoCoinInformation.current_price,
      cryptoCoinInformation.price_change_percentage_24h,
      cryptoCoinInformation.sparkline_in_7d
    )
  );

  // console.log(getApiInfo[0].sparkline_in_7d.price);

  return (
    <div>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Rank</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Current Price</TableCell>
              <TableCell>Change in 24 hours</TableCell>
              <TableCell>Change in 7 days</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => {
              return (
                <TableRow
                  key={row.name}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell>{row.marketCapRank}</TableCell>
                  <TableCell>{row.coinName}</TableCell>
                  <TableCell>{row.currentPrice}</TableCell>
                  <TableCell
                    style={
                      row.twentyFourHourChange.toString().includes("-")
                        ? { color: "red" }
                        : { color: "green" }
                    }
                  >
                    {row.twentyFourHourChange.toString().includes("-") ? (
                      <ArrowDropDownIcon fontSize="small" color="red" />
                    ) : (
                      <ArrowDropUpIcon fontSize="small" color="green" />
                    )}{" "}
                    {row.twentyFourHourChange}
                  </TableCell>
                  <TableCell>
                    <ChartForTable price={row.sevenDayChange.price} />
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default DisplayTable;
