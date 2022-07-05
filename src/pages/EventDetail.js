import * as React from "react";
import { Button, Stack } from "@mui/material";
import CreateInvite from "../components/invites/CreateInvite";

import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";

import EqualDetails from "../components/EqualDetails";

import { AuthContext } from "../contexts/authContext";

import api from "../apis/api";
import InviteList from "../components/invites/InviteList";

function EventDetail() {
  const [event, setEvent] = useState({
    userId: "",
    category: "",
    name: "",
    description: "",
    color: "",
    dateTime: "",
    duration: 0,
    reminder: "",
    timeReminder: 0,
    address: "",
    invites: [],
  });

  const { invites } = event;
  const { _id } = useParams();
  const { loggedInUser } = useContext(AuthContext);

  useEffect(() => {
    async function eventDetails() {
      try {
        const response = await api.get(`/event/${_id}`);

        setEvent({ ...response.data });
      } catch (err) {
        console.error(err);
      }
    }
    eventDetails();
  }, [_id]);

  function isOwner() {
    return event.userId === loggedInUser.user._id;
  }

  function isInvited() {
    return invites.some((el) => {
      return el.email === loggedInUser.user.email;
    });
  }

  const [emailInvite, setEmailInvite] = useState("");
  async function handleInvite() {
    try {
      const response = api.post(`/newinvite`, {
        email: emailInvite,
        eventId: _id,
      });
      setRefresh(!refresh);
    } catch (error) {
      console.log(error);
    }
  }

  function handleChange({ target }) {
    const { value } = target;
    setEmailInvite(value);
  }
  const [myInvites, setMyInvites] = useState([]);
  const [refresh, setRefresh] = useState(false);

  async function getInvites() {
    try {
      const myinvites = await api.get(`/myinvites/${_id}`);
      setMyInvites(myinvites.data);
    } catch (error) {}
  }
  console.log(myInvites);
  const deleteInvite = async (id) => {
    try {
      const response = await api.delete(`/invite/${id}`);
      setRefresh(!refresh);
    } catch (error) {
      console.error(error);
    }
  };

  const acceptInvite = async (id) => {
    try {
      const response = await api.patch(`/invite/${id}`, { confirmacao: true });
      setRefresh(!refresh);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getInvites();
  }, [refresh]);

  return (
    <div style={{ height: "90vh", overflow: "scroll" }}>
      {(isOwner() || isInvited()) && (
        <div>
          <EqualDetails
            key={event._id}
            name={event.name}
            description={event.description}
            dateTime={event.dateTime}
            duration={event.duration}
            timeReminder={event.timeReminder}
            category={event.category}
          />
          {isOwner() && (
            <CreateInvite
              onChange={handleChange}
              onClick={handleInvite}
              value={emailInvite}
              eventId={_id}
            />
          )}

          <InviteList
            height="30"
            isAnEvent={true}
            list={myInvites}
            deleteInvite={deleteInvite}
            acceptInvite={acceptInvite}
          />
          {isOwner() && (
            <Stack justifyContent="center" direction="row" spacing={2} mt={5}>
              <Button
                sx={{
                  width: "10rem",
                  height: "2.7rem",
                  borderRadius: "100px",
                  backgroundColor: "#32747F",
                  padding: "10px",
                  textTransform: "unset",
                }}
                variant="contained"
                href={`/updateevent/${_id}`}
              >
                Editar
              </Button>
              <Button
                sx={{
                  width: "10rem",
                  height: "2.7rem",
                  borderRadius: "100px",
                  padding: "10px",
                  textTransform: "unset",
                }}
                variant="contained"
                href={`/eventdelete/${_id}`}
                color="error"
              >
                Deletar
              </Button>
            </Stack>
          )}
        </div>
      )}
    </div>
  );
}

export default EventDetail;
