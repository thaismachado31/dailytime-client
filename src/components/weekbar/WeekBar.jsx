import React, { useState } from "react";
import DayComponent from "./DayComponent";
import DayTimeline from "../timeline/DayTimeline";

import {
  lastDayOfWeek,
  startOfWeek,
  eachDayOfInterval,
  format,
  isToday,
} from "date-fns";
import { Box, Button, Typography } from "@mui/material";

const WeekBar = () => {
  const [daysOfCurrentWeek, setDaysOfCurrentWeek] = useState(
    eachDayOfInterval({
      start: startOfWeek(new Date()),
      end: lastDayOfWeek(new Date()),
    })
  ); //.map((date) => format(date, "d/M/y"));
  const [weekcounter, setWeekCounter] = useState(7);

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
        <Box>
          <Button
            onClick={() => {
              const firstday = startOfWeek(new Date());
              const nextweek = new Date(
                firstday.setDate(firstday.getDate() - weekcounter)
              );
              setDaysOfCurrentWeek(
                eachDayOfInterval({
                  start: startOfWeek(nextweek),
                  end: lastDayOfWeek(nextweek),
                })
              );

              setWeekCounter(weekcounter - 7);
            }}
          >
            anterior
          </Button>
          <Button
            onClick={() => {
              const firstday = startOfWeek(new Date());
              const nextweek = new Date(
                firstday.setDate(firstday.getDate() + weekcounter)
              );

              setDaysOfCurrentWeek(
                eachDayOfInterval({
                  start: startOfWeek(nextweek),
                  end: lastDayOfWeek(nextweek),
                })
              );

              setWeekCounter(weekcounter + 7);
            }}
          >
            próximo
          </Button>
        </Box>
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
                  hasTask={index % 2 === 0 ? true : false}
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
