import * as React from "react";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";
import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import VolumeUpOutlinedIcon from "@mui/icons-material/VolumeUpOutlined";
import { Button, Stack, Typography } from "@mui/material";
import ColorLensIcon from "@mui/icons-material/ColorLens";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import RestaurantOutlinedIcon from "@mui/icons-material/RestaurantOutlined";
import MoreHorizOutlinedIcon from "@mui/icons-material/MoreHorizOutlined";
import AlarmOnOutlinedIcon from "@mui/icons-material/AlarmOnOutlined";
import AssignmentIndOutlinedIcon from "@mui/icons-material/AssignmentIndOutlined";
import ShortTextIcon from "@mui/icons-material/ShortText";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import LoopIcon from "@mui/icons-material/Loop";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import TimelapseIcon from "@mui/icons-material/Timelapse";
import CategoryOutlinedIcon from "@mui/icons-material/CategoryOutlined";

import { format } from "date-fns";

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
        DETALHES:
      </h4>
      <div
        style={{
          height: "40px",
          width: "89%",
          marginLeft: "20px",
          borderRadius: "10px",
          backgroundColor: "#EBEDF1",
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
          <Typography> {props.name}</Typography>
        </div>
      </div>

      <Typography style={informationsStyle}>
        <ShortTextIcon style={iconsStyle}></ShortTextIcon>
        {props.description}
      </Typography>

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
        {props.duration} min
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
