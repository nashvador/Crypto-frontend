import CryptoTable from "./Table/CryptoTable";
import TrendingPage from "./FrontPage/TrendingPage";
import BarChart from "./FrontPage/BTCBarChart";

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
