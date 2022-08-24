import { useState, useEffect, Dispatch, SetStateAction } from "react";
import provideApiCall from "../services/api/utilities/provideApiCall";
import axios from "axios";

import Stack from "@mui/material/Stack";
import Divider from "@mui/material/Divider";
import AppBar from "@mui/material/AppBar";
import Link from "@mui/material/Link";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";

interface globalApi {
  data: {
    active_cryptocurrencies?: number;
    markets?: number;
    total_market_cap: object;
  };
}

const NavBar = ({
  currency,
  setCurrency,
}: {
  currency: string;
  setCurrency: Dispatch<SetStateAction<string>>;
}) => {
  const [getGlobalApiInfo, setGetGlobalApiInfo] = useState<globalApi>({
    data: {
      total_market_cap: {},
    },
  });

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

  console.log(getGlobalApiInfo.data);

  const handleChange = (event: SelectChangeEvent) => {
    setCurrency(event.target.value as string);
  };

  console.log(currency);

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
          <Button href="login" variant="outlined" sx={{ my: 1, mx: 1.5 }}>
            Login
          </Button>
        </Toolbar>
        <Divider orientation="horizontal" flexItem />
        <Toolbar sx={{ flexWrap: "wrap" }}>
          <Typography
            variant="caption"
            color="inherit"
            noWrap
            sx={{ flexGrow: 1 }}
          >
            Coins:{getGlobalApiInfo.data.active_cryptocurrencies} Markets:
            {getGlobalApiInfo.data.markets}
          </Typography>

          <FormControl>
            <InputLabel id="demo-simple-select-label">Currency</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={currency}
              label="Currency"
              onChange={handleChange}
            >
              <MenuItem value="usd">USD</MenuItem>
              <MenuItem value="eur">EUR</MenuItem>
              <MenuItem value="gbp">GBP</MenuItem>
            </Select>
          </FormControl>
        </Toolbar>
      </AppBar>
    </Stack>
  );
};

export default NavBar;
