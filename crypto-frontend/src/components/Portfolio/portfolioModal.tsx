import { useState } from "react";
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

export default function PortfolioModal() {
  const [open, setOpen] = useState(false);
  const [valueDay, setValueDay] = useState<Dayjs | null>(null);
  const [value, setValue] = useState<any>(null);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen}>
        Add a coin to your portfolio
      </Button>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add a coin to your portfolio</DialogTitle>

        <DialogContent>
          <Box>{value ? <img src={value.large} /> : ""} </Box>
          <TextField
            id="Amount Purchased"
            name="amount"
            label="Number"
            type="number"
            InputLabelProps={{
              shrink: true,
            }}
          />
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label="Date Purchased"
              value={valueDay}
              onChange={(newValue) => {
                setValueDay(newValue);
              }}
              renderInput={(params) => <TextField {...params} name="date" />}
            />
          </LocalizationProvider>
          <SearchBar value={value} setValue={setValue} />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel Coin Purchase</Button>
          <Button onClick={handleClose}>Buy Coin</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
