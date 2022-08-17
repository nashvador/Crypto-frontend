import CryptoTable from "./Table/CryptoTable";
import TrendingPage from "./TrendingPage";
import BarChart from "./BTCBarChart";

const FrontPage = () => {
  return (
    <div>
      <TrendingPage />
      <BarChart />
      <CryptoTable />
    </div>
  );
};

export default FrontPage;
