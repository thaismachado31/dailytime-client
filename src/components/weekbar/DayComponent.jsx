import { Box, Typography } from "@mui/material";
import React from "react";
import { useState, useEffect } from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import { isToday } from "date-fns";
import api from "../../apis/api";

const DayComponent = (props) => {
  const { day, functions } = props;
  const portugueseDays = ["dom", "seg", "ter", "qua", "qui", "sex", "sab"];

  const [hasTask, setHasTask] = useState(true);
  async function getTask() {
    try {
      const mytasks = await api.get(`/timeline/${day}`);
      if (mytasks.data.length === 0) {
        setHasTask(false);
        return;
      }

      setHasTask(true);
    } catch (error) {
      console.error(error);
    }
  }
  useEffect(() => {
    getTask();
  }, []);

  useEffect(() => {
    getTask();
  }, [day]);

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
      p: {
        color:
          functions.selectedDay === portugueseDays[day.getDay()] || isToday(day)
            ? "white"
            : "black",
      },
    },
    "MuiSvgIcon-root": {
      width: "7px",
    },
  });

  const boxCss = {
    padding: "2px",
    display: "flex",
    flexDirection: "column",
    width: "41px",
    height: "75px",
    backgroundColor:
      functions.selectedDay === portugueseDays[day.getDay()]
        ? "#32747F"
        : isToday(day)
          ? "#83C5BE"
          : "white",
    borderRadius: "40px",
  };
  return (
    <Box
      sx={boxCss}
      onClick={(_) => functions.handleSelectedDay(day, portugueseDays)}
    >
      <ThemeProvider theme={theme}>
        <Typography variant="p">{portugueseDays[day.getDay()]}</Typography>
        <Typography variant="p">{day.getDate()}</Typography>
        {hasTask && (
          <Typography variant="p">
            <FiberManualRecordIcon sx={{ fontSize: "7px" }} />
          </Typography>
        )}
      </ThemeProvider>
    </Box>
  );
};

export default DayComponent;
