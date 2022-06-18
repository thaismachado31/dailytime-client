import * as React from "react";
import { Button, Stack } from "@mui/material";

import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";

import EqualDetails from "../components/EqualDetails";

import { AuthContext } from "../contexts/authContext";

import api from "../apis/api";

function EventDetail() {
  const [event, setEvent] = useState({
    createdId: "",
    category: "",
    name: "",
    description: "",
    color: "",
    dateTime: "",
    duration: 0,
    reminder: "",
    timeReminder: 0,
    address: "",
  });
  console.log(event);

  const { _id } = useParams();
  const { loggedInUser } = useContext(AuthContext);

  useEffect(() => {
    async function eventDetails() {
      try {
        const response = await api.get(`/event/${_id}`);

        console.log(response.data);

        setEvent({ ...response.data });
        console.log(event);
      } catch (err) {
        console.error(err);
      }
    }
    eventDetails();
  }, [_id, event]);

  function isOwner() {
    return event.createdId === loggedInUser.user._id;
  }

  return (
    <div>
      {isOwner() && (
        <div>
          <EqualDetails
            key={event._id}
            name={event.name}
            description={event.description}
            dateTime={event.dateTime}
            duration={event.duration}
            timeReminder={event.timeReminder}
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
