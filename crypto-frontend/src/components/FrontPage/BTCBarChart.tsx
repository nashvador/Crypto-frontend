import { useState, useEffect } from "react";
import provideApiCall from "../../services/api/utilities/provideApiCall";

import { Bar } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";
import { DateRangeSharp } from "@mui/icons-material";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
Chart.register(...registerables);

interface VarChartData {
  prices: Array<Array<number>>;
  total_volumes: Array<Array<number>>;
  market_caps: Array<Array<number>>;
}

const BarChart = ({ currency }: { currency: string }) => {
  const [getCoinInformation, setGetCoinInformation] = useState<VarChartData>({
    prices: [],
    total_volumes: [],
    market_caps: [],
  });
  const [dateInformation, setDateInformation] = useState<number>(7);
  const [loading, setLoading] = useState<boolean>(true);

  const baseURL = `bitcoin/market_chart?vs_currency=${currency}&days=${dateInformation}&interval=daily`;

  useEffect(() => {
    provideApiCall.getCoinsData(baseURL).then((response) => {
      setGetCoinInformation(response);
      setLoading(false);
    });
  }, [dateInformation, currency]);

  const dates: Array<string> = getCoinInformation.total_volumes.map(
    (volumeInfoDay: Array<number>) =>
      new Date(volumeInfoDay[0]).toLocaleDateString("en-US")
  );

  const volumes: Array<number> = getCoinInformation.total_volumes.map(
    (volumeInfoDay: Array<number>) => volumeInfoDay[1]
  );

  const barChartSettings = {
    labels: dates,
    datasets: [
      {
        label: "Total Volume",
        data: volumes,
      },
    ],
  };

  const options = {
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
      },
      y: {
        grid: {
          display: false,
        },
      },
    },
    elements: {
      point: {
        radius: 0,
      },
    },
  };

  const handleChange = (
    event: React.MouseEvent<HTMLElement>,
    dateInformation: number
  ) => {
    setDateInformation(dateInformation);
  };

  return (
    <div>
      {" "}
      <Bar data={barChartSettings} options={options} />
      <ToggleButtonGroup
        color="primary"
        value={dateInformation}
        exclusive
        onChange={handleChange}
      >
        <ToggleButton value="7">7 days</ToggleButton>
        <ToggleButton value="30">30 days</ToggleButton>
        <ToggleButton value="180">6 months</ToggleButton>
        <ToggleButton value="360">1 year</ToggleButton>
      </ToggleButtonGroup>{" "}
    </div>
  );
};

export default BarChart;
