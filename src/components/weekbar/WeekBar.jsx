import React, { useState, useEffect } from "react";
import api from "../../apis/api";
import DayComponent from "./DayComponent";
import DayTimeline from "../timeline/DayTimeline";
import TasksList from "../timeline/TasksList";

import {
  lastDayOfWeek,
  startOfWeek,
  eachDayOfInterval,
  format,
  isToday,
} from "date-fns";
import { Box, Typography } from "@mui/material";

const WeekBar = () => {
  const daysOfCurrentWeek = eachDayOfInterval({
    start: startOfWeek(new Date()),
    end: lastDayOfWeek(new Date()),
  }); //.map((date) => format(date, "d/M/y"));

  const [selectedDay, setSelectedDay] = useState("Hoje");

  const [dayTL, setDayTL] = useState("");

  function handleSelectedDay(day, arr) {
    const info = `${arr[day.getDay()]}`;
    setSelectedDay(isToday(day) ? "Hoje" : info);
    setDayTL(day);
  }

  return (
    <div>
      <Box>
        <Typography variant="h5" style={{ color: "#32747F" }}>
          {selectedDay}
        </Typography>
        <Box
          sx={{
            display: "flex",
            width: " 342px",
            margin: "auto",
            justifyContent: "space-around",
          }}
        >
          {daysOfCurrentWeek.map((date, index) => {
            return (
              <div>
                <DayComponent
                  key={index}
                  day={date}
                  functions={{ handleSelectedDay, selectedDay }}
                />
              </div>
            );
          })}
        </Box>
      </Box>
      <DayTimeline date={dayTL} />
    </div>
  );
};

export default WeekBar;
