import { Box, Button, Input } from "@mui/material";
import React from "react";
import { useState } from "react";
import api from "../../apis/api";
import PersonAddAlt1OutlinedIcon from "@mui/icons-material/PersonAddAlt1Outlined";

const CreateInvite = (props) => {
  const [email, setEmail] = useState("");
  async function handleInvite(eventId) {
    try {
      const response = api.post(`/newinvite`, { email, eventId });
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  }

  function handleChange({ target }) {
    const { value } = target;

    setEmail(value);
  }

  const informationsStyle = {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    padding: "0.5rem 0 0 1rem",
    marginLeft: "1.2rem",
    marginTop: "2rem",
  };

  console.log(email);
  return (
    <Box mt={2} textAlign="center" sx={informationsStyle}>
      <PersonAddAlt1OutlinedIcon
        // sx={{ informationsStyle }}
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
        onChange={handleChange}
        value={email}
      ></Input>
      <Button
        onClick={() => {
          handleInvite(props.eventId);
        }}
      >
        Convidar
      </Button>
    </Box>
  );
};

export default CreateInvite;
