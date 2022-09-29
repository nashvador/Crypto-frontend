import { useState, useEffect, Dispatch, SetStateAction } from "react";
import SearchBar from "./searchBar";

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
import { user } from "../App";
import provideApiCall from "../services/api/utilities/provideApiCall";

interface globalApi {
  data: any;
}

const NavBar = ({
  currency,
  setCurrency,
  user,
  setUser,
}: {
  currency: string;
  setCurrency: Dispatch<SetStateAction<string>>;
  user: user | null;
  setUser: Dispatch<SetStateAction<user | null>>;
}) => {
  const [getGlobalApiInfo, setGetGlobalApiInfo] = useState<globalApi>({
    data: {},
  });

  useEffect(() => {
    const getAndSetData = async (): Promise<void> => {
      const response: globalApi | string = await provideApiCall.callApiInfo(
        "https://api.coingecko.com/api/v3/global"
      );
      if (typeof response !== "string") {
        setGetGlobalApiInfo(response.data);
      }
    };
    getAndSetData();
  }, []);

  console.log(getGlobalApiInfo.data);

  const handleChange = (event: SelectChangeEvent) => {
    setCurrency(event.target.value as string);
  };

  const onLogOut = (): void => {
    window.localStorage.removeItem("loggedPortfolioUser");
    setUser(null);
  };
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
              href="/portfolio"
              sx={{ my: 1, mx: 1.5 }}
            >
              Portfolio
            </Link>
          </nav>
          {user ? (
            <div>
              {" "}
              {user.name} is logged in
              <Button
                onClick={onLogOut}
                variant="outlined"
                sx={{ my: 1, mx: 1.5 }}
              >
                Logout
              </Button>
            </div>
          ) : (
            <Button href="/login" variant="outlined" sx={{ my: 1, mx: 1.5 }}>
              Login
            </Button>
          )}
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
          <SearchBar />
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
