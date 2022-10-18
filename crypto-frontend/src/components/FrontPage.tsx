import CryptoTable from "./Table/CryptoTable";
import TrendingPage from "./FrontPage/TrendingPage";
import BarChart from "./FrontPage/BTCBarChart";
import { Grid } from "@mui/material";

const FrontPage = ({ currency }: { currency: string }) => {
  return (
    <Grid
      container
      spacing={0}
      direction="row"
      alignItems="center"
      justifyContent="center"
      style={{ minHeight: "100vh" }}
    >
      <Grid item xs={2}>
        <TrendingPage />
      </Grid>
      <Grid item xs={7}>
        <BarChart currency={currency} />
      </Grid>
      <Grid item xs={9}>
        <CryptoTable currency={currency} />
      </Grid>
    </Grid>
  );
};

export default FrontPage;
