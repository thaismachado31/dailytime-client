import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import InviteList from "../components/InviteList";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import api from "../apis/api";
import {
  lastDayOfWeek,
  startOfWeek,
  eachDayOfInterval,
  format,
} from "date-fns";
import MyInvites from "../components/MyInvites";
import DayComponent from "../components/weekbar/DayComponent";
import WeekBar from "../components/weekbar/WeekBar";
import DayTimeline from "../components/timeline/DayTimeline";

function SecondHome() {
  const theme = createTheme({
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
  });
  const homeDiv = {
    display: "flex",
    flexDirection: "column",
    // alignItems: "center",
    justifyContent: "space-around",
    // height: "90vh",
    marginTop: "5vh",
  };
  return (
    <div style={homeDiv} className="text-center">
      <ThemeProvider theme={theme}>
        {/* <MyInvites /> */}
        <WeekBar />
        {/* <MyInvites /> */}
        {/* <DayTimeline /> */}
      </ThemeProvider>
    </div>
  );
}

export default SecondHome;
