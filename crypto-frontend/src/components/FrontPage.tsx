import CryptoTable from "./Table/CryptoTable";
import TrendingPage from "./FrontPage/TrendingPage";
import BarChart from "./FrontPage/BTCBarChart";

const FrontPage = ({ currency }: { currency: string }) => {
  return (
    <div>
      <TrendingPage />
      <BarChart currency={currency} />
      <CryptoTable currency={currency} />
    </div>
  );
};

export default FrontPage;
