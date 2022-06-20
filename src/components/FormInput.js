import React from "react";
import { TextField } from "@mui/material";

function FormInput(props) {
  const { id, title, multiline, variant, name, value, onChange, size, row } =
    props;
  return (
    <TextField
      InputProps={{ disableUnderline: true }}
      sx={{ marginTop: "20px", marginBottom: "20px" }}
      fullWidth
      hiddenlabel="true"
      id={id}
      multiline={multiline}
      placeholder={title}
      variant={variant}
      size={size}
      name={name}
      value={value}
      onChange={onChange}
      maxRows={row}
    />
  );
}

export default FormInput;
