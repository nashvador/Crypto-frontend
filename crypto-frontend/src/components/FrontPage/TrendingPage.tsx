import { useEffect, useState } from "react";
import provideApiCall from "../../services/api/utilities/provideApiCall";
import {
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Divider,
  CircularProgress,
} from "@mui/material";
import CircularIndeterminate from "../../models/LoadingCircle";
import { Link } from "react-router-dom";

const TrendingPage = () => {
  const [trendingData, setTrendingData] = useState<any>({});
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const getAndSetData = async (): Promise<void> => {
      const response: any = await provideApiCall.callApiInfo(
        `https://api.coingecko.com/api/v3/search/trending`
      );
      setTrendingData(response.data);
      setLoading(false);
    };
    getAndSetData();
  }, []);

  return (
    <List
      sx={{
        width: "100%",
        maxWidth: 180,
      }}
    >
      {loading ? (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <CircularProgress size="5rem" />
        </div>
      ) : (
        trendingData.coins.map((coin: any) => (
          <div key={coin.item.id}>
            <ListItem>
              <ListItemAvatar>
                <img src={coin.item.small} />
              </ListItemAvatar>
              <Link to={`/coins/${coin.item.id}`} key={coin.item.id}>
                {" "}
                <ListItemText
                  primary={coin.item.name}
                  secondary={
                    coin.item.market_cap_rank
                      ? `Rank ${coin.item.market_cap_rank}`
                      : `Unranked`
                  }
                />{" "}
              </Link>
            </ListItem>
            <Divider variant="inset" component="li" />
          </div>
        ))
      )}
    </List>
  );
};

export default TrendingPage;
