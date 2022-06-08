import React from "react";
import { Box, TextField } from "@mui/material";

function FormIcon(props) {
  return (
    <div>
      <Box sx={{ display: "flex", alignItems: "flex-end" }}>
        {props.icon}
        <TextField id={props.id} label={props.label} variant="standard" />
      </Box>
    </div>
  );
}

export default FormIcon;
