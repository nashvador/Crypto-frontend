import React, { useEffect, useState } from "react";
import provideApiCall from "../../services/api/utilities/provideApiCall";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Divider from "@mui/material/Divider";
import CircularIndeterminate from "../../models/LoadingCircle";
import { Link } from "react-router-dom";

const TrendingPage = () => {
  const [trendingData, setTrendingData] = useState<any>({});
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    provideApiCall.getCoinsSearchData("trending").then((response) => {
      setTrendingData(response);
      setLoading(false);
    });
  }, []);

  return (
    <div>
      <List
        sx={{
          width: "100%",
          maxWidth: 180,
        }}
      >
        {loading
          ? CircularIndeterminate()
          : trendingData.coins.map((coin: any) => (
              <div key={coin.item.id}>
                <ListItem>
                  <ListItemAvatar>
                    <img src={coin.item.small} />
                  </ListItemAvatar>
                  <Link to={`/coins/${coin.item.id}`} key={coin.item.id}>
                    {" "}
                    <ListItemText
                      primary={coin.item.name}
                      secondary={`Rank ${coin.item.market_cap_rank}`}
                    />{" "}
                  </Link>
                </ListItem>
                <Divider variant="inset" component="li" />
              </div>
            ))}
      </List>
    </div>
  );
};

export default TrendingPage;
