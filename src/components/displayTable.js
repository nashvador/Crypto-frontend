import { useState, useEffect, React } from "react";
// import "antd/dist/antd.css";
import axios from "axios";
import { Table } from "antd";

const DisplayTable = () => {
  const [getApiInfo, setApiInfo] = useState([]);

  const getApiCall = async () => {
    const response = await axios.get(
      "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=25&page=1&sparkline=false"
    );
    setApiInfo(response.data);
  };
  useEffect(() => {
    getApiCall();
  }, []);

  const columns = [
    {
      title: "#",
      dataIndex: "market_cap_rank",
    },
    {
      title: "Name",
      dataIndex: "name",
    },
    {
      title: "Price",
      dataIndex: "current_price",
      sorter: {
        compare: (a, b) => a.current_price - b.current_price,
        multiple: 2,
      },
    },
    {
      title: "24h change",
      dataIndex: "price_change_percentage_24h",
      sorter: {
        compare: (a, b) =>
          a.price_change_percentage_24h - b.price_change_percentage_24h,
        multiple: 1,
      },
    },
  ];

  console.log(getApiInfo);

  return (
    <div style={{ padding: "5rem" }}>
      <Table columns={columns} dataSource={getApiInfo} />
    </div>
  );
};

export default DisplayTable;
