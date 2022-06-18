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
import { Box, Button, Typography } from "@mui/material";

const WeekBar = () => {
  const [daysOfCurrentWeek, setDaysOfCurrentWeek] = useState(
    eachDayOfInterval({
      start: startOfWeek(new Date()),
      end: lastDayOfWeek(new Date()),
    })
  ); //.map((date) => format(date, "d/M/y"));
  const [weekcounter, setWeekCounter] = useState(0);

  const [selectedDay, setSelectedDay] = useState("Hoje");

  const [dayTL, setDayTL] = useState("");

  function handleSelectedDay(day, arr) {
    const info = `${arr[day.getDay()]}`;
    setSelectedDay(isToday(day) ? "Hoje" : info);
    setDayTL(day);
  }

<<<<<<< HEAD
=======

>>>>>>> 89bd691e102ae31c60c7e31d8eb235ece2affa7f
  const weekbuttonsCss = {
    display: `flex`,
    justifyContent: `space-between`,
    padding: `0 10px 0 10px`,
  };

  function handleWeek() {
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
  }

<<<<<<< HEAD
  useEffect(() => {
    handleWeek();
  }, [weekcounter]);

=======
>>>>>>> 89bd691e102ae31c60c7e31d8eb235ece2affa7f
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
              setWeekCounter(weekcounter - 7);
            }}
          >
            anterior
          </Button>
          <Button
            style={{ color: "rgb(50, 116, 127)" }}
            onClick={() => {
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
