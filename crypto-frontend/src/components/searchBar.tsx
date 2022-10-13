import * as React from "react";
import { useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import axios from "axios";

export default function SearchBar() {
  const [value, setValue] = React.useState<any>();
  const [inputValue, setInputValue] = React.useState("");
  const [options, setOptions] = React.useState<Array<any>>([]);

  const getSearch = async () => {
    const response = await axios.get(
      `https://api.coingecko.com/api/v3/search?query=${inputValue}`
    );
    return response.data;
  };

  React.useEffect(() => {
    if (inputValue.length >= 2) {
      getSearch().then((res) => setOptions(res.coins));
    }
  }, [inputValue]);

  const navigate = useNavigate();

  return (
    <div>
      <Autocomplete
        value={value}
        onChange={(event: any, newValue: any) => {
          event.preventDefault();
          navigate(`coins/${newValue.id}`);
        }}
        inputValue={inputValue}
        onInputChange={(event, newInputValue) => {
          setInputValue(newInputValue);
        }}
        id="Search-Bar"
        isOptionEqualToValue={(option, value) => option.id === value.id}
        getOptionLabel={(option) => option.id}
        filterOptions={(x) => x}
        options={options}
        sx={{ width: 300 }}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Search for a coin"
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
