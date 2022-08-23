import { useState, useEffect } from "react";
import provideApiCall from "../services/api/utilities/provideApiCall";
import axios from "axios";

import Stack from "@mui/material/Stack";
import Paper from "@mui/material/Paper";
import Divider from "@mui/material/Divider";
import AppBar from "@mui/material/AppBar";
import Link from "@mui/material/Link";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

const NavBar = () => {
  const [getGlobalApiInfo, setGetGlobalApiInfo] = useState<object>({});

  useEffect(() => {
    const getAll = async (): Promise<object> => {
      const response = await axios.post("http://localhost:3005/api/coininfo/", {
        url: "https://api.coingecko.com/api/v3/global",
      });
      setGetGlobalApiInfo(response.data);
      return response;
    };
    getAll();
  }, []);

  console.log(getGlobalApiInfo);

  return (
    <Stack spacing={1}>
      <AppBar
        position="static"
        color="default"
        elevation={0}
        sx={{ borderBottom: (theme) => `1px solid ${theme.palette.divider}` }}
      >
        <Toolbar sx={{ flexWrap: "wrap" }}>
          <Typography variant="h6" color="inherit" noWrap sx={{ flexGrow: 1 }}>
            CoinNOW
          </Typography>
          <nav>
            <Link
              variant="button"
              color="text.primary"
              href="/"
              sx={{ my: 1, mx: 1.5 }}
            >
              Coins
            </Link>
            <Link
              variant="button"
              color="text.primary"
              href="/coins/bitcoin"
              sx={{ my: 1, mx: 1.5 }}
            >
              Portfolio
            </Link>
          </nav>
          <Button href="#" variant="outlined" sx={{ my: 1, mx: 1.5 }}>
            Login
          </Button>
        </Toolbar>
        <Divider orientation="horizontal" flexItem />
        <Toolbar sx={{ flexWrap: "wrap" }}>
          <Typography
            variant="body1"
            color="inherit"
            noWrap
            sx={{ flexGrow: 1 }}
          >
            CoinNOW
          </Typography>
        </Toolbar>
      </AppBar>
    </Stack>
  );
};

export default NavBar;
