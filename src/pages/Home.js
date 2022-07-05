import React from "react";
import { Typography, Button } from "@mui/material";
import imageHome from "../img/Picture_home.png";
import useStyles from "../styles/styles";
import PlayArrowOutlinedIcon from "@mui/icons-material/PlayArrowOutlined";

function Home() {
  const classes = useStyles();

  const titlePositionCss = {
    width: "304px",
    height: "57.8px",
    textAlign: "center",
  };

  const mainDiv = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    marginTop: "7vh",
  };

  return (
    <div style={mainDiv}>
      <div style={titlePositionCss}>
        <Typography
          component="h4"
          sx={{ fontSize: "24px", fontWeight: 700, lineHeight: "32.53px" }}
        >
          Bem Vindo ao
        </Typography>
        <Typography
          component="h3"
          sx={{
            fontSize: "36px",
            fontWeight: 800,
            lineHeight: "48.79px",
            color: "#83C5BE",
            marginBottom: "20px",
          }}
        >
          Daily Time
        </Typography>
        <Typography
          component="h4"
          sx={{ fontSize: "20px", fontWeight: 700, lineHeight: "32.53px" }}
        >
          Organize o seu dia!
        </Typography>
        <Typography sx={{ fontSize: "18px", fontWeight: 500 }}>
          Partilhe com os seus amigos
        </Typography>
        <img
          style={{
            margin: "50px",
            width: 230,
            display: "block",
            justifyContent: "center",
            alignItems: "center",
          }}
          src={imageHome}
          alt="Time management"
        />
        <div className={classes.divButton}>
          <Button
            className={classes.buttonStyle}
            sx={{
              width: "197px",
              height: "42px",
              borderRadius: "100px",
              backgroundColor: "#32747F",
              padding: "10px",
              textTransform: "unset",
            }}
            variant="contained"
            href="/login"
            endIcon={<PlayArrowOutlinedIcon />}
          >
            Começar
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Home;
