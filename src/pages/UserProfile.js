import React, { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Input,
  InputAdornment,
  Box,
  Button,
  Tabs,
  Tab,
  Stack,
  Typography,
} from "@mui/material";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import KeyIcon from "@mui/icons-material/Key";
import api from "../apis/api";

import Alert from "@mui/material/Alert";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import MyInvites from "../components/MyInvites";
import useStyles from "../styles/styles";
import { AuthContext } from "../contexts/authContext";

function EventDetail() {
  const [state, setState] = useState({
    name: "",
    email: "",
    _id: "",
    password: "",
    confirmPassword: "",
    picture: "",
    profilePicture: "",
  });
  const [componentToRender, setComponentToRender] = useState(0);
  const [errors, setErrors] = useState({ msg: null });
  const [refresh, setRefresh] = useState(false);

  const classes = useStyles();

  const context = useContext(AuthContext);

  useEffect(async () => {
    const response = await api.get("/profile");
    setState({ ...response.data, password: "", confirmPassword: "" });
  }, []);

  useEffect(async () => {
    const response = await api.get("/profile");
    setState({ ...response.data, password: "", confirmPassword: "" });
  }, [refresh]);

  function handleChange(event) {
    if (event.target.files) {
      setState({ ...state, [event.currentTarget.name]: event.target.files[0] });
      return;
    }

    setState({
      ...state,
      [event.currentTarget.name]: event.currentTarget.value,
    });
  }

  async function handleFileUpload(file) {
    const formData = new FormData();
    formData.append("picture", file);
    console.log("entrou handler", formData);
    console.log("entrou handler file", file);
    const response = await api.post("/upload", formData);
    return response.data;
  }

  async function handleSubmit(event) {
    event.preventDefault();

    try {
      let urlimg = "";
      if (state.picture) {
        const { fileUrl } = await handleFileUpload(state.picture);
        urlimg = fileUrl;
      }

      const clone = { ...state };

      delete clone.picture;

      const response = await api.patch("/profile", {
        ...clone,
        profilePicture: urlimg,
      });

      if (!response) {
        return;
      }

      setRefresh(!refresh);
      setErrors({ msg: "" });
    } catch (err) {
      if (err.response) {
        console.error(err.response);

        return setErrors({ ...err.response.data });
      }

      console.error(err);
    }
  }

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
    button: {
      fontWeight: 500,
      fontSize: "14px",
      textTransform: "unset",
    },
  });

  const titlePositionCss = {
    width: "304px",
    textAlign: "center",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  };

  const inputCss = {
    width: "300px",
    height: "41px",
    padding: "11px 10px 11px 10px",
    gap: "10px",
    border: "1px solid #ADB7C2",
    borderRadius: "25px",
    "&:after": {
      border: "none",
    },
    "&::before": {
      border: "none",
    },
    "&:hover:not(.Mui-disabled):before": {
      border: "none",
    },
  };

  const linkSenhaCss = {
    width: "198px",
    height: "15px",
    marginTop: "5px",
    textAlign: "center",
    fontSize: "12px",
    color: "#333D49",
    textDecoration: "none",
  };

  const buttonCss = {
    width: "142px",
    height: "41px",
    borderRadius: "100px",
    backgroundColor: "#32747F",
    color: "white",
  };

  const linkRegistroCss = {
    width: "228px",
    height: "15px",
    textAlign: "center",
    fontSize: "14px",
    color: "#516274",
    textDecoration: "none",
  };

  const formCss = {
    height: "300px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
  };

  const mainDiv = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-around",
    height: "calc(100vh - 124px )",
  };

  return (
    <Box>
      {errors.msg && <Alert severity="error">{errors.msg}</Alert>}
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
          textColor="#32747F"
          value={componentToRender}
          onChange={(event, value) => setComponentToRender(value)}
          aria-label="tarefas ou eventos"
          centered
        >
          <Tab className={classes.form} label="Perfil" />
          <Tab className={classes.form} label="Convites" />
        </Tabs>
      </Box>
      <Box style={mainDiv}>
        <ThemeProvider theme={theme}>
          <div style={titlePositionCss}>
            <img
              style={{ width: "150px", height: "150px", borderRadius: "100%" }}
              src={state.profilePicture}
            />
            <Button onClick={context.handleLogout}>
              <Typography variant="h6">Logout</Typography>
            </Button>
          </div>

          {componentToRender === 1 ? (
            <MyInvites title="Meus Convites" height="50" route="/myinvites" />
          ) : (
            <Box component="form" onSubmit={handleSubmit} style={formCss}>
              <Input
                sx={inputCss}
                placeholder="Nome"
                startAdornment={
                  <InputAdornment position="start">
                    <AccountCircleOutlinedIcon />
                  </InputAdornment>
                }
                name="name"
                value={state.name}
                onChange={handleChange}
              />
              <Input
                sx={inputCss}
                placeholder="Password"
                type="password"
                startAdornment={
                  <InputAdornment position="start">
                    <KeyIcon />
                  </InputAdornment>
                }
                name="password"
                value={state.password}
                onChange={handleChange}
              />
              <Input
                sx={inputCss}
                placeholder="Confirm Password"
                type="password"
                startAdornment={
                  <InputAdornment position="start">
                    <KeyIcon />
                  </InputAdornment>
                }
                name="confirmPassword"
                value={state.confirmPassword}
                onChange={handleChange}
              />

              <Stack direction="row" alignItems="center" spacing={2}>
                <Button variant="contained" style={buttonCss} type="submit">
                  Atualizar
                </Button>
                <label htmlFor="contained-button-file">
                  <input
                    style={{ display: "none" }}
                    id="contained-button-file"
                    type="file"
                    name="picture"
                    onChange={handleChange}
                  />
                  <Button
                    variant="contained"
                    component="span"
                    style={buttonCss}
                  >
                    Upload image
                  </Button>
                </label>
              </Stack>
            </Box>
          )}
        </ThemeProvider>
      </Box>
    </Box>
  );
}

export default EventDetail;
