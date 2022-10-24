import { useEffect, useState } from "react";
import provideApiCall from "../../services/api/utilities/provideApiCall";
import CircularIndeterminate from "../../models/LoadingCircle";
import CryptoTableHead from "./Body/CryptoTableHead";
import CryptoTableBody from "./Body/CryptoTableBody";
import Table from "@mui/material/Table";
import TableContainer from "@mui/material/TableContainer";
import TableFooter from "@mui/material/TableFooter";
import TablePagination from "@mui/material/TablePagination";
import { Grid } from "@mui/material";

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

const CryptoTable = ({ currency }: { currency: string }) => {
  const [getChartApiData, setChartApiData] = useState<
    Array<chartApiData | any>
  >([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [orderDirection, setOrderDirection] = useState<"asc" | "desc">("asc");
  const [valueToOrderBy, setValueToOrderBy] = useState<string>("");
  const [page, setPage] = useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = useState<number>(10);

  const chartDataBaseURL = `?vs_currency=${currency}&order=market_cap_desc&per_page=${rowsPerPage}&page=${
    page + 1
  }&sparkline=true&price_change_percentage=1h%2C24h%2C7d`;

  useEffect(() => {
    provideApiCall.getMarketData(chartDataBaseURL).then((response) => {
      setChartApiData(response);
      setLoading(false);
    });
  }, [rowsPerPage, page, currency]);

  function createData(
    marketCapRank: number,
    coinImage: string,
    coinName: string,
    coinSymbol: string,
    id: string,
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
      id,
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
      coinData.id,
      coinData.current_price,
      coinData.price_change_percentage_1h_in_currency,
      coinData.price_change_percentage_24h_in_currency,
      coinData.price_change_percentage_7d_in_currency,
      coinData.total_volume,
      coinData.market_cap,
      coinData.sparkline_in_7d.price
    )
  );

  const handleRequestSort = (event: any, property: any): void => {
    const isAscending = valueToOrderBy === property && orderDirection === "asc";
    setValueToOrderBy(property);
    setOrderDirection(isAscending ? "desc" : "asc");
  };

  const createSortHandler = (property: any) => (event: any) => {
    handleRequestSort(event, property);
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

  function getComparator(order: "asc" | "desc", orderBy: string) {
    return order === "desc"
      ? (a: number, b: number) => descendingComparator(a, b, orderBy)
      : (a: number, b: number) => -descendingComparator(a, b, orderBy);
  }

  const sortedRowInformation = (rowArray: Array<object>, comparator: any) => {
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

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <Grid container>
      <TableContainer>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <CryptoTableHead
            valueToOrderBy={valueToOrderBy}
            orderDirection={orderDirection}
            createSortHandler={createSortHandler}
          />
          {loading ? (
            CircularIndeterminate()
          ) : (
            <CryptoTableBody
              valueToOrderBy={valueToOrderBy}
              orderDirection={orderDirection}
              rows={rows}
              getComparator={getComparator}
              sortedRowInformation={sortedRowInformation}
              currency={currency}
            />
          )}
        </Table>
      </TableContainer>
      <TableFooter>
        <TablePagination
          component="div"
          count={1000}
          page={page}
          onPageChange={handleChangePage}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </TableFooter>
    </Grid>
  );
};

export default CryptoTable;
