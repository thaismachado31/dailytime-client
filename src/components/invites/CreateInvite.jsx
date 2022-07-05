import { Box, Button, Input } from "@mui/material";
import React from "react";
import PersonAddAlt1OutlinedIcon from "@mui/icons-material/PersonAddAlt1Outlined";

const CreateInvite = (props) => {
  const informationsStyle = {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    padding: "0.5rem 0 0 1rem",
    marginLeft: "1.2rem",
    marginTop: "2rem",
  };

  return (
    <Box mt={2} textAlign="center" sx={informationsStyle}>
      <PersonAddAlt1OutlinedIcon
        style={{ color: "#32747F", marginRight: "1rem" }}
      />
      <Input
        sx={{
          "&:after": {
            border: "none",
          },
          "&::before": {
            border: "none",
          },
          "&:hover:not(.Mui-disabled):before": {
            border: "none",
          },
        }}
        placeholder="Insira email...."
        onChange={props.onChange}
        value={props.value}
      ></Input>
      <Button onClick={props.onClick}>Convidar</Button>
    </Box>
  );
};

export default CreateInvite;
