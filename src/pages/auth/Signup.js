import {
  Input,
  InputAdornment,
  Typography,
  Box,
  Button,
  Checkbox,
} from "@mui/material";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import KeyIcon from "@mui/icons-material/Key";
import React, { useState } from "react";

import { useNavigate, Link } from "react-router-dom";
import api from "../../apis/api";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import Alert from "@mui/material/Alert";
import { createTheme, ThemeProvider } from "@mui/material/styles";

function Login(props) {
  const [state, setState] = useState({ password: "", email: "", name: "" });
  const [checkbox, setCheckbox] = useState(false);
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

  function handleChange(event) {
    setState({
      ...state,
      [event.currentTarget.name]: event.currentTarget.value,
    });
  }

  async function handleSubmit(event) {
    event.preventDefault();

    if (!checkbox) {
      return setErrors({ msg: "You must agree with terms and conditions" });
    }

    try {
      const response = await api.post("/signup", state);
      setErrors({ msg: null });
      navigate("/login");
    } catch (err) {
      if (err.response) {
        console.error(err.response);

        return setErrors({ ...err.response.data });
      }

      console.error(err);
    }
  }


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

  const buttonCss = {
    width: "142px",
    height: "41px",
    borderRadius: "100px",
    backgroundColor:
      state.email && state.password && state.name && checkbox
        ? "#32747F"
        : "#CDD4DB",
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
            placeholder="Nome"
            startAdornment={
              <InputAdornment position="start">
                <AccountCircleOutlinedIcon />
              </InputAdornment>
            }
            name="name"
            onChange={handleChange}
          />
          <Input
            sx={inputCss}
            placeholder="Email"
            startAdornment={
              <InputAdornment position="start">
                <EmailOutlinedIcon />
              </InputAdornment>
            }
            name="email"
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
            onChange={handleChange}
          />

          <div href="/">
            <Checkbox
              onChange={(event) => setCheckbox(event.target.checked)}
              checked={checkbox}
            />
            Concordo com os <strong>Termos e condições</strong>
          </div>
          <Button variant="contained" style={buttonCss} type="submit">
            Registrar
          </Button>
        </Box>

        <Link style={linkRegistroCss} to="/login">
          Já tem uma conta? <strong>Iniciar sessão</strong>
        </Link>
      </ThemeProvider>
    </div>
  );
}

export default Login;
