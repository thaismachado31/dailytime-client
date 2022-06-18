import * as React from "react";
import { Button, Stack } from "@mui/material";
import MyInvites from "../components/MyInvites";
import InviteList from "../components/InviteList";

import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";

import EqualDetails from "../components/EqualDetails";

import { AuthContext } from "../contexts/authContext";

import api from "../apis/api";

function EventDetail() {
  const [event, setEvent] = useState({
    createdBy: "",
    category: "",
    name: "",
    description: "",
    color: "",
    date: "",
    duration: 0,
    reminder: "",
    timeReminder: 0,
    address: "",
    invites: {},
  });

  const { _id } = useParams();
  const { loggedInUser } = useContext(AuthContext);

  useEffect(() => {
    async function eventDetails() {
      try {
        const response = await api.get(`/event/${_id}`);

        console.log(response.data);

        setEvent({ ...response.data });
      } catch (err) {
        console.error(err);
      }
    }
    eventDetails();
  }, [_id]);

  function isOwner() {
    return event.createdBy === loggedInUser.user._id;
  }

  return (
    <div>
      {isOwner() && (
        <div>
          <EqualDetails
            key={event._id}
            name={event.name}
            description={event.description}
            dateTime={event.date}
            duration={event.duration}
            timeReminder={event.timeReminder}
          />{" "}
          <MyInvites
            title="Convites do Evento"
            height="50"
            route={`/myinvites/${_id}`}
          />
          <Stack justifyContent="center" direction="row" spacing={2} mt={3}>
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
              href=""
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
        </div>
      )}
    </div>
  );
}

export default EventDetail;
