import * as React from "react";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import { Typography } from "@mui/material";
import ColorLensIcon from "@mui/icons-material/ColorLens";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import RestaurantOutlinedIcon from "@mui/icons-material/RestaurantOutlined";
import MoreHorizOutlinedIcon from "@mui/icons-material/MoreHorizOutlined";
import AlarmOnOutlinedIcon from "@mui/icons-material/AlarmOnOutlined";
import AssignmentIndOutlinedIcon from "@mui/icons-material/AssignmentIndOutlined";
import ShortTextIcon from "@mui/icons-material/ShortText";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import TimelapseIcon from "@mui/icons-material/Timelapse";
import { format, minutesToHours } from "date-fns";

function EqualDetails(props) {
  const icons = [
    <ColorLensIcon />,
    <RestaurantOutlinedIcon />,
    <MenuBookIcon />,
    <AlarmOnOutlinedIcon />,
    <DirectionsCarIcon />,
    <AssignmentIndOutlinedIcon />,
    <MoreHorizOutlinedIcon />,
  ];

  function formatMinutes(minutes) {
    if (minutes >= 60) {
      const hours = minutesToHours(minutes);
      if (hours === 1) {
        return `${hours}hora`;
      } else return `${hours} horas`;
    } else return `${minutes} min`;
  }

  const catIcon = icons[props.category];

  const informationsStyle = {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    padding: "0.5rem 0 0 1rem",
    marginLeft: "1.2rem",
    marginTop: "2rem",
  };

  const iconsStyle = { marginRight: "1rem", color: "#32747F" };

  return (
    <div>
      <h4
        style={{
          margin: "1.5rem",
          color: "#32747F",
          display: "flex",
          justifyContent: "space-around",
        }}
      >
        <Typography x={{ fontSize: "15px" }}>Detalhes: </Typography>
      </h4>
      <div
        style={{
          height: "40px",
          width: "89%",
          marginLeft: "20px",
          borderRadius: "10px",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "flex-start",
            alignItems: "center",
            padding: "0.5rem 0 0 1rem",
            color: "#32747F",
          }}
        >
          <div style={iconsStyle}> {catIcon} </div>
          <Typography sx={{ fontSize: "17px" }}> {props.name}</Typography>
        </div>
      </div>
      {props.description ? (
        <Typography style={informationsStyle}>
          <ShortTextIcon style={iconsStyle}></ShortTextIcon>
          {props.description}
        </Typography>
      ) : (
        ""
      )}

      <Typography style={informationsStyle}>
        <AccessTimeIcon style={iconsStyle}></AccessTimeIcon>
        {format(new Date(props.dateTime), `HH:mm`)}
      </Typography>

      <Typography style={informationsStyle}>
        <CalendarMonthIcon style={iconsStyle}></CalendarMonthIcon>
        {format(new Date(props.dateTime), `dd/MM/yyyy`)}
      </Typography>

      <Typography style={informationsStyle}>
        <TimelapseIcon style={iconsStyle}></TimelapseIcon>
        {formatMinutes(props.duration)}
      </Typography>

      {props.timeReminder > 0 ? (
        <Typography style={informationsStyle}>
          <NotificationsNoneIcon style={iconsStyle}></NotificationsNoneIcon>
          {props.timeReminder} min antes
        </Typography>
      ) : (
        ""
      )}
    </div>
  );
}

export default EqualDetails;
