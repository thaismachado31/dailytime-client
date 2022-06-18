import { Box, Button, Input } from "@mui/material";
import React from "react";
import { useState } from "react";
import api from "../../apis/api";

const CreateInvite = (props) => {
  const [email, setEmail] = useState("");
  async function handleInvite(eventId) {
    try {
      const response = api.post(`/newinvite`, { email, eventId });
    } catch (error) {
      console.log(error);
    }
  }

  function handleChange({ target }) {
    const { name, value } = target;

    setEmail(value);
  }

  console.log(email);
  return (
    <Box>
      <Input
        placeholder="Insira email...."
        onChange={handleChange}
        value={email}
      ></Input>
      <Button
        onClick={() => {
          handleInvite("62a4c4a6946c8247c4060d31");
        }}
      >
        Criar
      </Button>
    </Box>
  );
};

export default CreateInvite;
