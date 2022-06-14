import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Typography from "@mui/material/Typography";
import React, { useContext } from "react";
import EventDetail from "../pages/UserProfile";
import { Box, Button } from "@mui/material";
import { Link } from "react-router-dom";
import api from "../apis/api";
import { useState } from "react";
import { AuthContext } from "../contexts/authContext";

const buttonCss = {
  textTransform: "unset",
  width: "120px",
  height: "35px",
  borderRadius: "100px",
  backgroundColor: "#32747F",
  color: "white",
  "&:hover": {
    backgroundColor: "#32747F",
  },
};

const listItemCss = {
  flexDirection: "column",
  alignItems: "center",
  textAlign: "center",
};

const buttonBoxCss = {
  width: "100%",
  display: "flex",
  justifyContent: "space-around",
  mt: "5px",
};

const listCss = {
  width: "300px",
  bgcolor: "background.paper",
  margin: "auto",
};

const InviteList = (props) => {
  const { loggedInUser } = useContext(AuthContext);

  console.log(loggedInUser.user.email);
  return (
    <List sx={listCss}>
      <h1>{props.title}</h1>
      {props.list?.map((element) => {
        const { _id, eventId, userId, confirmacao, email } = element;
        const { deleteInvite, acceptInvite } = props.functions;

        console.log(eventId.createdBy);
        return (
          <React.Fragment key={_id}>
            <ListItem sx={listItemCss}>
              <ListItemText
                primary={
                  <Link to={`/eventDetail/${eventId._id}`}>
                    <Typography
                      variant="h5"
                      color="text.primary"
                      sx={{ textDecoration: "underline", color: "#32747F" }}
                    >
                      {eventId.name}
                    </Typography>
                  </Link>
                }
                secondary={
                  <React.Fragment>
                    <Typography variant="body2" color="text.primary">
                      Convidado por: {userId.name}
                      Email: {email}
                    </Typography>

                    <Typography variant="body2" color="text.primary">
                      Status: {confirmacao ? "Participando" : "Pendente"}
                    </Typography>
                  </React.Fragment>
                }
              />

              {(loggedInUser.user.email === email ||
                loggedInUser.user._id === eventId.createdBy) && (
                <Box sx={buttonBoxCss}>
                  {!confirmacao && (
                    <Button
                      sx={buttonCss}
                      onClick={() => {
                        acceptInvite(_id);
                      }}
                    >
                      Aceitar
                    </Button>
                  )}

                  <Button sx={buttonCss} onClick={() => deleteInvite(_id)}>
                    {confirmacao ? "Excluir" : "Recusar"}
                  </Button>
                </Box>
              )}
            </ListItem>
            <Divider component="li" />
          </React.Fragment>
        );
      })}
    </List>
  );
};

export default InviteList;
