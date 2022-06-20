import { createTheme, ThemeProvider } from "@mui/material/styles";
import WeekBar from "../components/weekbar/WeekBar";

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
