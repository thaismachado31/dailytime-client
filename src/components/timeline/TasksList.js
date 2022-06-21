import React from "react";
import { format, minutesToHours, addMinutes } from "date-fns";

import EachTask from "./eachTask";
import { Timeline } from "@mui/lab";

import ColorLensIcon from "@mui/icons-material/ColorLens";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import RestaurantOutlinedIcon from "@mui/icons-material/RestaurantOutlined";
import MoreHorizOutlinedIcon from "@mui/icons-material/MoreHorizOutlined";
import AlarmOnOutlinedIcon from "@mui/icons-material/AlarmOnOutlined";
import AssignmentIndOutlinedIcon from "@mui/icons-material/AssignmentIndOutlined";

import { createTheme, ThemeProvider } from "@mui/material/styles";

function TasksList(props) {
  const theme = createTheme({
    palette: {
      primary: {
        main: "#fbc02d",
      },
      secondary: {
        main: "#FF9904",
      },
      warning: {
        main: "#E9190C",
      },
      info: {
        main: "#005D99",
      },
      inherit: {
        main: "#EBEDF1",
      },
      success: {
        main: "#67A12D",
      },
      error: {
        main: "#E29478",
      },
      grey: {
        50: "#FFFFFF",
        100: "#EBEDF1",
        200: "#67A12D",
        300: "#ADB7C2",
        400: "#8D9AAA",
        500: "#768597",
        600: "#5E7185",
        700: "#516274",
        800: "#333D49",
        900: "#212932",
      },
    },
  });

  function formatTime(date) {
    return format(new Date(date), `HH:mm`);
  }

  function formatMinutes(minutes) {
    if (minutes >= 60) {
      const hours = minutesToHours(minutes);
      if (hours === 1) {
        return `${hours}hora`;
      } else return `${hours}horas`;
    } else return `${minutes}min`;
  }

  const icons = [
    <ColorLensIcon />,
    <RestaurantOutlinedIcon />,
    <MenuBookIcon />,
    <AlarmOnOutlinedIcon />,
    <DirectionsCarIcon />,
    <AssignmentIndOutlinedIcon />,
    <MoreHorizOutlinedIcon />,
  ];

  const iconColors = [
    "info",
    "secondary",
    "success",
    "error",
    "grey",
    "warning",
    "primary",
  ];

  return (
    <ThemeProvider theme={theme}>
      <Timeline
        style={{
          backgroundColor: "#EDE7E0CC",
          height: "calc(95vh - 238px )",
          marginTop: "30px",
          marginBottom: 0,
          overflow: "scroll",
        }}
        align="left"
      >
        {props.all.map((element) => {
          const { _id, name, dateTime, duration, category, invites } = element;
          const startTime = formatTime(dateTime);
          const end = addMinutes(new Date(dateTime), duration);
          const endTime = formatTime(end);
          const catColor = iconColors[category];
          const catIcon = icons[category];
          return (
            <EachTask
              key={_id}
              time={startTime}
              colorDot={catColor}
              link={invites ? `/event/${_id}` : `/task/${_id}`}
              icon={catIcon}
              taskName={name}
              timeEnd={endTime}
              duration={formatMinutes(duration)}
            />
          );
        })}
      </Timeline>
    </ThemeProvider>
  );
}

export default TasksList;
