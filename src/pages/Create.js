import React from "react";
import { useState } from "react";
import { Box, Tabs, Tab } from "@mui/material";
import TabTask from "../components/TabTask";
import TabEvent from "../components/TabEvent";
import useStyles from "../styles/styles";
import { createTheme, ThemeProvider } from "@mui/material/styles";

function Create() {
  const classes = useStyles();

  const theme = createTheme({
    palette: {
      primary: {
        light: "#b5f8f1",
        main: "#83C5BE",
        dark: "#53948e",
      },
      secondary: {
        light: "#63a2ae",
        main: "#32747F",
        dark: "#004753",
      },
      warning: {
        main: "#E29478",
      },
      info: {
        main: "#FFB672",
      },
      grey: {
        50: "#FFFFFF",
        100: "#EBEDF1",
        200: "#CDD4DB",
        300: "#ADB7C2",
        400: "#8D9AAA",
        500: "#768597",
        600: "#5E7185",
        700: "#516274",
        800: "#333D49",
        900: "#212932",
      },
    },
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
    button: {
      fontWeight: 500,
      fontSize: "14px",
      textTransform: "unset",
    },
  });

  const [state, setState] = useState(0);

  const handleChange = (event, newValue) => {
    setState(newValue);
  };
  return (
    <div>
      <ThemeProvider theme={theme}>
        <Box
          sx={{
            borderBottom: 1,
            borderColor: "divider",
          }}
        >
          <Tabs
            sx={{
              ".MuiButtonBase-root": {
                textTransform: "none",
                fontSize: "17px",
              },
              marginTop: "20px",
              color: "#32747F",
              indicatorColor: "#83C5BE",
            }}
            TabIndicatorProps={{
              style: {
                backgroundColor: "#83C5BE",
              },
            }}
            value={state}
            onChange={handleChange}
            aria-label="tarefas ou eventos"
            centered
          >
            <Tab className={classes.form} label="Nova tarefa" />
            <Tab className={classes.form} label="Novo evento" />
          </Tabs>
        </Box>
        {state === 0 && <TabTask />}
        {state === 1 && <TabEvent />}
      </ThemeProvider>
    </div>
  );
}

export default Create;
