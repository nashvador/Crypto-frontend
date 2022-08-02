import { useState, useEffect, React } from "react";
// import "antd/dist/antd.css";
import axios from "axios";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

const DisplayTable = () => {
  const [getApiInfo, setApiInfo] = useState([]);

  const getApiCall = async () => {
    const response = await axios.get(
      "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=25&page=1&sparkline=false"
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
    twentyFourHourChange
  ) {
    return { marketCapRank, coinName, currentPrice, twentyFourHourChange };
  }

  const rows = getApiInfo.map((cryptoCoinInformation) =>
    createData(
      cryptoCoinInformation.market_cap_rank,
      cryptoCoinInformation.name,
      cryptoCoinInformation.current_price,
      cryptoCoinInformation.price_change_percentage_24h
    )
  );

  console.log(rows);
  console.log(getApiInfo);

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
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => {
              console.log(row.twentyFourHourChange);
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
                    {row.twentyFourHourChange}
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
