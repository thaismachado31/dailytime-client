import React from "react";
import { Button } from "@mui/material";
import useStyles from "../styles/styles";
import PlayArrowOutlinedIcon from "@mui/icons-material/PlayArrowOutlined";

function FormButtonCreate(props) {
  const classes = useStyles();

  const { state, title } = props;
  return (
    <div className={classes.divButton}>
      <Button
        className={classes.styleButton}
        sx={{
          width: "197px",
          height: "42px",
          borderRadius: "100px",
          backgroundColor:
            state.name && state.dateTime && state.duration
              ? "#32747F"
              : "#CDD4DB",
          padding: "10px",
          textTransform: "unset",
        }}
        variant="contained"
        type="submit"
        endIcon={<PlayArrowOutlinedIcon />}
      >
        {title}
      </Button>
    </div>
  );
}

export default FormButtonCreate;
