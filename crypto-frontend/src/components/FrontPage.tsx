import CryptoTable from "./Table/CryptoTable";
import TrendingPage from "./FrontPage/TrendingPage";
import BarChart from "./FrontPage/BTCBarChart";
import { Grid } from "@mui/material";

const FrontPage = ({ currency }: { currency: string }) => {
  return (
    <div>
      <Grid container spacing={0}>
        <Grid item xs={2}>
          <TrendingPage />
        </Grid>
        <Grid item xs={10}>
          <BarChart currency={currency} />
        </Grid>
      </Grid>
      <CryptoTable currency={currency} />
    </div>
  );
};

export default FrontPage;
