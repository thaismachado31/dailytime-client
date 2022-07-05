const mainTheme = {
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
    button: {
      fontWeight: 500,
      fontSize: "14px",
      textTransform: "unset",
    },
  },
};

export default mainTheme;
