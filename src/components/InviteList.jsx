import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Typography from "@mui/material/Typography";
import React, { useContext } from "react";
import EventDetail from "../pages/EventDetail";
import { Backdrop, Box, Button, Fade, Modal } from "@mui/material";
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

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};
const InviteList = (props) => {
  const { loggedInUser } = useContext(AuthContext);
  const [modal, setModal] = useState(false);
  const [deleteInviteId, setDeleteInviteId] = useState("");

  function handleModal() {
    setModal(!modal);
  }

  return (
    <>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={modal}
        onClose={handleModal}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={modal}>
          <Box sx={modalStyle}>
            <Typography id="transition-modal-title" variant="h6" component="h2">
              Você deseja excluir/recusar o seu convite?
            </Typography>
            <Box
              sx={{ display: "flex", justifyContent: "space-around", mt: 2 }}
            >
              <Button
                sx={buttonCss}
                onClick={() => {
                  handleModal();
                  props.functions.deleteInvite(deleteInviteId);
                }}
              >
                Sim
              </Button>
              <Button sx={buttonCss} onClick={handleModal}>
                Não
              </Button>
            </Box>
          </Box>
        </Fade>
      </Modal>
      <List sx={listCss}>
        <h3>{props.title}</h3>

        {props.list?.map((element) => {
          const { _id, eventId, userId, confirmacao, email } = element;
          const { deleteInvite, acceptInvite } = props.functions;

          console.log(eventId.createdBy);
          return (
            <React.Fragment key={_id}>
              <ListItem sx={listItemCss}>
                <ListItemText
                  primary={
                    props.isAnEvent ? (
                      ""
                    ) : (
                      <Link to={`/event/${eventId._id}`}>
                        <Typography
                          variant="h5"
                          color="text.primary"
                          sx={{ textDecoration: "underline", color: "#32747F" }}
                        >
                          {eventId.name}
                        </Typography>
                      </Link>
                    )
                  }
                  secondary={
                    <React.Fragment>
                      <Typography variant="body2" color="text.primary">
                        Convidado por: {userId.name}
                      </Typography>

                      <Typography variant="body2" color="text.primary">
                        Email: {email}
                      </Typography>

                      <Typography variant="body2" color="text.primary">
                        Status: {confirmacao ? "Participando" : "Pendente"}
                      </Typography>
                    </React.Fragment>
                  }
                />

                {(loggedInUser.user.email === email ||
                  loggedInUser.user._id === eventId.userId) && (
                  <Box sx={buttonBoxCss}>
                    {!confirmacao && loggedInUser.user.email === email && (
                      <Button
                        sx={buttonCss}
                        onClick={() => {
                          acceptInvite(_id);
                        }}
                      >
                        Aceitar
                      </Button>
                    )}
                    <Button
                      sx={buttonCss}
                      onClick={() => {
                        setDeleteInviteId(_id);
                        handleModal();
                      }}
                    >
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
    </>
  );
};

export default InviteList;
