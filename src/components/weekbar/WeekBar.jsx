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

  const weekbuttonsCss = {
    display: `flex`,
    justifyContent: `space-between`,
    padding: `0 10px 0 10px`,
  };

  function handleWeek(nextOrPrev) {
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

    nextOrPrev === "next"
      ? setWeekCounter(weekcounter + 7)
      : setWeekCounter(weekcounter - 7);
  }
  return (
    <div>
      <Box>
        <Typography variant="h5" style={{ color: "#32747F" }}>
          {selectedDay}
        </Typography>
        <Box style={weekbuttonsCss}>
          <Button
            style={{ color: "rgb(50, 116, 127)" }}
            onClick={() => {
              handleWeek("prev");
            }}
          >
            anterior
          </Button>
          <Button
            style={{ color: "rgb(50, 116, 127)" }}
            onClick={() => {
              handleWeek("next");
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
