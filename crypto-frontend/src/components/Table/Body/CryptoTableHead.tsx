import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";

const CryptoTableHead = ({
  valueToOrderBy,
  orderDirection,
  createSortHandler,
}: {
  valueToOrderBy: string;
  orderDirection: "asc" | "desc";
  createSortHandler: (property: any) => (event: any) => void;
}) => {
  return (
    <TableHead>
      <TableRow>
        <TableCell align="right">Rank</TableCell>
        <TableCell align="right">Coin</TableCell>
        <TableCell align="right" key="price">
          <TableSortLabel
            active={valueToOrderBy === "price"}
            direction={valueToOrderBy === "price" ? orderDirection : "asc"}
            onClick={createSortHandler("price")}
          >
            Price
          </TableSortLabel>
        </TableCell>
        <TableCell align="right" key="priceChangeOneHour">
          <TableSortLabel
            active={valueToOrderBy === "priceChangeOneHour"}
            direction={
              valueToOrderBy === "priceChangeOneHour" ? orderDirection : "asc"
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
              valueToOrderBy === "priceChangeOneDay" ? orderDirection : "asc"
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
              valueToOrderBy === "priceChangeOneWeek" ? orderDirection : "asc"
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
  );
};

export default CryptoTableHead;
