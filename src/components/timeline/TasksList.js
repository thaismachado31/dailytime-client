import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { format, minutesToHours, addMinutes } from "date-fns";

import EachTask from "./eachTask";
import { Typography } from "@mui/material";
import {
  Timeline,
  TimelineItem,
  TimelineSeparator,
  TimelineConnector,
  TimelineContent,
  TimelineOppositeContent,
  TimelineDot,
} from "@mui/lab";

import AirplanemodeActiveIcon from "@mui/icons-material/AirplanemodeActive";
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
        main: "#E7C542",
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
        main: "#3DC6C9",
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
    <AirplanemodeActiveIcon />,
    <AssignmentIndOutlinedIcon />,
    <MoreHorizOutlinedIcon />,
  ];

  const iconColors = [
    "primary",
    "secondary",
    "warning",
    "info",
    "success",
    "error",
    "grey",
  ];

  return (
    <ThemeProvider theme={theme}>
      <Timeline align="left">
        {props.all.map((element) => {
          const { _id, name, dateTime, duration, category } = element;
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
              link={`/task/${_id}`}
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
