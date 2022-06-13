import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import InviteList from "../components/InviteList";
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

function Home() {
  const mainDiv = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-around",
    height: "80vh",
    marginTop: "7vh",
  };
  return (
    <div style={mainDiv} className="text-center">
      {/* <MyInvites /> */}
      <WeekBar />
      <MyInvites />
    </div>
  );
}

export default Home;
