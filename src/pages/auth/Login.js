import {
  Input,
  InputAdornment,
  Typography,
  Box,
  Button,
  Divider,
} from "@mui/material";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import KeyIcon from "@mui/icons-material/Key";
import React, { useState, useContext } from "react";

import { useNavigate, useLocation, Link } from "react-router-dom";
import api from "../../apis/api";
import GoogleIcon from "@mui/icons-material/Google";
import FacebookRoundedIcon from "@mui/icons-material/FacebookRounded";
import { AuthContext } from "../../contexts/authContext";
import Alert from "@mui/material/Alert";
import { createTheme, ThemeProvider } from "@mui/material/styles";

function Login(props) {
  const authContext = useContext(AuthContext);
  const [state, setState] = useState({ password: "", email: "" });
  const [errors, setErrors] = useState({
    msg: null,
  });

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

  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || "/";

  function handleChange(event) {
    setState({
      ...state,
      [event.currentTarget.name]: event.currentTarget.value,
    });
  }

  async function handleSubmit(event) {
    event.preventDefault();

    try {
      const response = await api.post("/login", state);
      console.log(response);

      authContext.setLoggedInUser({ ...response.data });
      localStorage.setItem(
        "loggedInUser",
        JSON.stringify({ ...response.data })
      );
      setErrors({ password: "", email: "" });
      navigate(from, { replace: true });
    } catch (err) {
      console.error(err.response.data);
      setErrors({ ...err.response.data });
    }
  }

  console.log(errors);
  // css

  const titlePositionCss = {
    width: "304px",
    height: "57.8px",
    textAlign: "center",
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
    backgroundColor: state.email && state.password ? "blue" : "#CDD4DB",
  };

  const ouDivCss = {
    width: "300px",
    display: "flex",
    alignItems: "center",
  };

  const linkRegistroCss = {
    width: "228px",
    height: "15px",
    textAlign: "center",
    fontSize: "14px",
    color: "#516274",
    textDecoration: "none",
  };

  const socialMediaDiv = {
    display: "flex",
    justifyContent: "space-between",

    width: "300px",
    height: "41px",
  };

  const socialMediaLink = {
    width: "141px",
    heigh: "41px",
    border: "1px solid #32747F",
    borderRadius: "25px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  };

  const formCss = {
    height: "200px",
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
    height: "80vh",
    marginTop: "7vh",
  };

  return (
    <div style={mainDiv}>
      <ThemeProvider theme={theme}>
        {errors.msg && <Alert severity="error">{errors.msg}</Alert>}
        <div style={titlePositionCss}>
          <Typography
            component="h4"
            sx={{ fontSize: "24px", fontWeight: 700, lineHeight: "32.53px" }}
          >
            <strong> Vamos começar!</strong>
          </Typography>
          <Typography sx={{ fontSize: "20px", fontWeight: 500 }}>
            Conte-me mais sobre você
          </Typography>
        </div>

        <Box component="form" onSubmit={handleSubmit} style={formCss}>
          <Input
            sx={inputCss}
            placeholder="Email"
            startAdornment={
              <InputAdornment position="start">
                <AccountCircleOutlinedIcon />
              </InputAdornment>
            }
            name="email"
            onChange={handleChange}
          />
          <Input
            sx={inputCss}
            placeholder="Password"
            startAdornment={
              <InputAdornment position="start">
                <KeyIcon />
              </InputAdornment>
            }
            name="password"
            onChange={handleChange}
          />

          <Button variant="contained" style={buttonCss} type="submit">
            Entrar
          </Button>
          <Link style={linkSenhaCss} to={"/"}>
            Esqueceu a senha?
          </Link>
        </Box>

        <div style={ouDivCss}>
          <Divider style={{ width: "127px" }}></Divider>
          <p style={{ fontSize: "14px", margin: "12px" }}>OU</p>
          <Divider style={{ width: "127px", float: "right" }}></Divider>
        </div>

        <div style={socialMediaDiv}>
          <Link style={socialMediaLink} to={"/"}>
            <GoogleIcon />
          </Link>
          <Link style={socialMediaLink} to={"/"}>
            <FacebookRoundedIcon />
          </Link>
        </div>

        <Link style={linkRegistroCss} to={"/signup"}>
          Não tem conta? <strong>Registre-se aqui</strong>
        </Link>
      </ThemeProvider>
    </div>
  );
}

export default Login;
