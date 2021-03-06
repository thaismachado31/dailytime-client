import React, { useState, useEffect } from "react";
import DayComponent from "./DayComponent";
import DayTimeline from "../timeline/DayTimeline";

import {
  lastDayOfWeek,
  startOfWeek,
  eachDayOfInterval,
  isToday,
} from "date-fns";
import { Box, Button, Typography } from "@mui/material";

const WeekBar = () => {
  const [daysOfCurrentWeek, setDaysOfCurrentWeek] = useState(
    eachDayOfInterval({
      start: startOfWeek(new Date()),
      end: lastDayOfWeek(new Date()),
    })
  );
  const [weekcounter, setWeekCounter] = useState(0);

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

  useEffect(() => {
    handleWeek();
  }, [weekcounter]);

  return (
    <div>
      <Box>
        <Typography
          variant="h5"
          style={{ color: "#32747F", height: "32.02px" }}
        >
          {selectedDay}
        </Typography>
        <Box style={weekbuttonsCss}>
          <Button
            style={{ color: "rgb(50, 116, 127)" }}
            onClick={() => {
              setWeekCounter(weekcounter - 7);
              setSelectedDay("");
            }}
          >
            anterior
          </Button>
          <Button
            style={{ color: "rgb(50, 116, 127)" }}
            onClick={() => {
              setWeekCounter(weekcounter + 7);
              setSelectedDay("");
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
              <div key={`${index}-${date}`}>
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
