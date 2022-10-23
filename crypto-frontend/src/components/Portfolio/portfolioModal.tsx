import { useState, Dispatch, SetStateAction } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { Dayjs } from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import SearchBar from "./PortfolioModalSearch";
import Box from "@mui/material/Box";
import { Grid } from "@mui/material";
import axios from "axios";

export default function PortfolioModal({
  config,
  setPortfolio,
}: {
  config: object;
  setPortfolio: Dispatch<SetStateAction<Array<object> | null>>;
}) {
  const [open, setOpen] = useState(false);
  const [valueDay, setValueDay] = useState<Dayjs | null>(null);
  const [value, setValue] = useState<any>(null);
  const [amountValue, setAmountValue] = useState<number>();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = async () => {
    const response = await axios.post(
      process.env.REACT_APP_API_ENDPOINT! + `api/portfolio/`,
      { coin: value.id, date: valueDay, amount: amountValue },
      config
    );
    console.log(response.data);
    setPortfolio((oldPortfolioData: any) => [
      ...oldPortfolioData,
      response.data,
    ]);
    handleClose();
  };

  console.log(amountValue);

  return (
    <Grid container>
      <Grid item>
        <Button
          variant="outlined"
          onClick={handleClickOpen}
          id="Portfolio-Modal"
        >
          Add a coin to your portfolio
        </Button>
      </Grid>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add a coin to your portfolio</DialogTitle>

        <DialogContent>
          <Grid
            container
            spacing={2}
            direction="column"
            alignItems="center"
            justifyContent="space-between"
          >
            <Grid item>
              <Box>{value ? <img src={value.large} /> : ""} </Box>
            </Grid>
            <Grid item>
              <SearchBar value={value} setValue={setValue} />
            </Grid>
            <Grid item>
              <TextField
                id="Amount-Purchased"
                name="amount"
                label="Number"
                type="number"
                onChange={(e) => setAmountValue(Number(e.target.value))}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>
            <Grid item>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  label="Date Purchased"
                  value={valueDay}
                  onChange={(newValue) => {
                    setValueDay(newValue);
                  }}
                  renderInput={(params) => (
                    <TextField {...params} name="date" id="Date-Purchased" />
                  )}
                />
              </LocalizationProvider>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel Coin Purchase</Button>
          <Button onClick={handleSubmit} id="Buy-Coin">
            Buy Coin
          </Button>
        </DialogActions>
      </Dialog>
    </Grid>
  );
}
