import { Box, Typography } from "@mui/material";
import React from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import { isToday } from "date-fns";
import { useId } from "react";

const DayComponent = (props) => {
  const { hasTask, day, functions } = props;
  const portugueseDays = ["dom", "seg", "ter", "qua", "qui", "sex", "sab"];
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
            <FiberManualRecordIcon />
          </Typography>
        )}
      </ThemeProvider>
    </Box>
  );
};

export default DayComponent;
