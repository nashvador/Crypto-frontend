import { Line } from "react-chartjs-2";
import Chart from "chart.js/auto";

const ChartForTable = ({ price }) => {
  //   return <Line data={price} />;
  const xAxisLabels = Array(price.length).fill("");

  const lineChartSettings = {
    labels: xAxisLabels,
    datasets: [
      {
        label: "",
        data: price,
        backgroundColor: price[0] < price[price.length - 1] ? "green" : "red",
        borderColor: price[0] < price[price.length - 1] ? "green" : "red",
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

export default ChartForTable;
