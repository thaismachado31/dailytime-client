import * as React from "react";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";
import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import VolumeUpOutlinedIcon from "@mui/icons-material/VolumeUpOutlined";
import { Button, Stack } from "@mui/material";
import ColorLensIcon from "@mui/icons-material/ColorLens";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import RestaurantOutlinedIcon from "@mui/icons-material/RestaurantOutlined";
import MoreHorizOutlinedIcon from "@mui/icons-material/MoreHorizOutlined";
import AlarmOnOutlinedIcon from "@mui/icons-material/AlarmOnOutlined";
import AssignmentIndOutlinedIcon from "@mui/icons-material/AssignmentIndOutlined";

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
          <div> {props.name}</div>
        </div>
      </div>

      <div style={informationsStyle}>
        <DescriptionOutlinedIcon style={iconsStyle}></DescriptionOutlinedIcon>
        {props.description}
      </div>

      <div style={informationsStyle}>
        <AccessTimeIcon style={iconsStyle}></AccessTimeIcon>
        {format(new Date(props.dateTime), `HH:mm`)}
      </div>

      <div style={informationsStyle}>
        <CalendarMonthOutlinedIcon
          style={iconsStyle}
        ></CalendarMonthOutlinedIcon>
        {format(new Date(props.dateTime), `dd/MM/yyyy`)}
      </div>

      <div style={informationsStyle}>
        <NotificationsNoneOutlinedIcon
          style={iconsStyle}
        ></NotificationsNoneOutlinedIcon>
        {props.duration} min
      </div>

      {props.timeReminder > 0 ? (
        <div style={informationsStyle}>
          <VolumeUpOutlinedIcon style={iconsStyle}></VolumeUpOutlinedIcon>
          {props.timeReminder} min antes
        </div>
      ) : (
        ""
      )}
    </div>
  );
}

export default EqualDetails;
