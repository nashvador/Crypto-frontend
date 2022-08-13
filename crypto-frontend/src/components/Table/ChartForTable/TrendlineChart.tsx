import React from "react";
import { Line } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";
Chart.register(...registerables);

const TrendLineChart = ({ trendSevenDays }: any) => {
  const xAxisLabels: Array<string> = Array(trendSevenDays.length).fill("");

  const lineChartSettings = {
    labels: xAxisLabels,
    datasets: [
      {
        label: "",
        data: trendSevenDays,
        backgroundColor:
          trendSevenDays[0] < trendSevenDays[trendSevenDays.length - 1]
            ? "green"
            : "red",
        borderColor:
          trendSevenDays[0] < trendSevenDays[trendSevenDays.length - 1]
            ? "green"
            : "red",
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
        display: false,
      },
      y: {
        display: false,
      },
    },
    elements: {
      point: {
        radius: 0,
      },
    },
  };
  return <Line data={lineChartSettings} options={options} />;
};

export default TrendLineChart;
