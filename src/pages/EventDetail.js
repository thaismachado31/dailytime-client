import * as React from "react";
import { Button, Stack } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import MyInvites from "../components/MyInvites";
import CreateInvite from "../components/invites/CreateInvite";

import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";

import EqualDetails from "../components/EqualDetails";

import { AuthContext } from "../contexts/authContext";

import api from "../apis/api";

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

        console.log(response.data);

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

  const theme = createTheme({
    palette: {
      primary: {
        light: "#b5f8f1",
        main: "#83C5BE",
        dark: "#53948e",
      },
      secondary: {
        light: "#63a2ae",
        main: "#32747F",
        dark: "#004753",
      },
      warning: {
        main: "#E29478",
      },
      info: {
        main: "#FFB672",
      },
      grey: {
        50: "#FFFFFF",
        100: "#EBEDF1",
        200: "#CDD4DB",
        300: "#ADB7C2",
        400: "#8D9AAA",
        500: "#768597",
        600: "#5E7185",
        700: "#516274",
        800: "#333D49",
        900: "#212932",
      },
    },
    typography: {
      fontFamily: [
        "Quicksand",
        "BlinkMacSystemFont",
        '"Segoe UI"',
        "Roboto",
        '"Helvetica Neue"',
        "Arial",
        "sans-serif",
        '"Apple Color Emoji"',
        '"Segoe UI Emoji"',
        '"Segoe UI Symbol"',
      ].join(","),
    },
    button: {
      fontWeight: 500,
      fontSize: "14px",
      textTransform: "unset",
    },
  });

  return (
    <div style={{ height: "90vh", overflow: "scroll" }}>
      <ThemeProvider theme={theme}>
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
            {isOwner() && <CreateInvite eventId={_id} />}

            <MyInvites
              title="Convites do Evento"
              height="30"
              route={`/myinvites/${_id}`}
              isAnEvent={true}
            />
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
          </div>
        )}
      </ThemeProvider>
    </div>
  );
}

export default EventDetail;
