import * as React from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import axios from "axios";
import CircularProgress from "@mui/material/CircularProgress";

export default function SearchBar({
  value,
  setValue,
}: {
  value: any;
  setValue: React.Dispatch<React.SetStateAction<any>>;
}) {
  const [inputValue, setInputValue] = React.useState("");
  const [options, setOptions] = React.useState<Array<any>>([]);
  const [loading, setLoading] = React.useState<boolean>(true);

  const getSearch = async () => {
    const response = await axios.get(
      `https://api.coingecko.com/api/v3/search?query=${inputValue}`
    );
    return response.data;
  };

  React.useEffect(() => {
    if (inputValue.length >= 2) {
      setLoading(false);
      getSearch().then((res) => setOptions(res.coins));
    }
  }, [inputValue]);

  return (
    <div>
      <Autocomplete
        value={value}
        onChange={(event: any, newValue: any) => {
          event.preventDefault();
          setValue(newValue);
          console.log(newValue);
        }}
        inputValue={inputValue}
        onInputChange={(event, newInputValue) => {
          setInputValue(newInputValue);
        }}
        id="Coin-Purchased"
        isOptionEqualToValue={(option, value) => option.id === value.id}
        getOptionLabel={(option) => option.id}
        filterOptions={(x) => x}
        options={options}
        sx={{ width: 300 }}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Search for a coin"
            name="searchData"
            InputProps={{
              ...params.InputProps,
              endAdornment: (
                <React.Fragment>
                  {params.InputProps.endAdornment}
                </React.Fragment>
              ),
            }}
          />
        )}
      />
    </div>
  );
}
