import React from "react";
import { TextField } from "@mui/material";

function FormInput(props) {
  const {
    id,
    title,
    multiline,
    variant,
    name,
    value,
    onChange,
    size,
    row,
    marginTop,
    marginBottom,
  } = props;
  return (
    <TextField
      InputProps={{ disableUnderline: true }}
      sx={{ marginTop: { marginTop }, marginBottom: { marginBottom } }}
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
