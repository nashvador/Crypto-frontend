import React, { useEffect, useState } from "react";
import provideApiCall from "../../services/api/utilities/provideApiCall";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";

const CryptoTable = () => {
  // create object and concat object values into the url? Perhaps use custom hook
  const [getChartApiData, setChartApiData] = useState<Array<object>>([]);

  const chartDataBaseURL =
    "?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=true&price_change_percentage=1h%2C24h%2C7d";

  useEffect(() => {
    provideApiCall
      .getMarketData(chartDataBaseURL)
      .then((response) => setChartApiData(response));
  }, []);

  console.log(getChartApiData);

  return (
    <div>
      <Container maxWidth="lg">
        <Box sx={{ bgcolor: "#cfe8fc", height: "100vh" }} />
      </Container>
    </div>
  );
};

export default CryptoTable;
