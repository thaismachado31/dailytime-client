import React, { useState } from "react";
import DayComponent from "./DayComponent";
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

  function handleSelectedDay(day, arr) {
    const info = `${arr[day.getDay()]}`;
    setSelectedDay(isToday(day) ? "Hoje" : info);
  }
  return (
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
            <DayComponent
              key={index}
              day={date}
              hasTask
              functions={{ handleSelectedDay, selectedDay }}
            />
          );
        })}
      </Box>
    </Box>
  );
};

export default WeekBar;
