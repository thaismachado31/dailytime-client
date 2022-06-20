import React from "react";
import { Box, FormControl, InputLabel, Select, MenuItem } from "@mui/material";

import useStyles from "../styles/styles";

function FormSelect(props) {
  const classes = useStyles();

  const removeBorderInput = {
    "&:after": {
      border: "none",
    },
    "&:before": {
      border: "none",
    },
    "&:hover:not(.Mui-disabled):before": {
      border: "none",
    },
  };

  const { label, icon, name, value, onChange, options } = props;
  return (
    <Box className={classes.input}>
      {icon}
      <FormControl>
        <InputLabel id="demo-simple-select-label">{label}</InputLabel>
        <Select
          sx={removeBorderInput}
          style={{
            width: "140px",
          }}
          variant="standard"
          labelId={label}
          id={name}
          value={value}
          label={label}
          name={name}
          onChange={onChange}
        >
          {options.map((option) => (
            <MenuItem
              key={`${option.name}-${option.value}`}
              value={option.value}
            >
              {option.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
}

export default FormSelect;
