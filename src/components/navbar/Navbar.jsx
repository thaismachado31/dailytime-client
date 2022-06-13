import { Box } from "@mui/material";
import OtherHousesOutlinedIcon from "@mui/icons-material/OtherHousesOutlined";
import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const boxButtonCss = { width: "22px", height: "22px", mt: "17px" };
  return (
    <Box
      sx={{
        display: "flex",
        height: "75.63px",
        width: "390px",
        justifyContent: "space-around",
        top: "calc(100vh - 76px )",
        position: "absolute",
      }}
    >
      <Box sx={boxButtonCss}>
        <Link to="/" style={{ color: "#ADB7C2" }}>
          <OtherHousesOutlinedIcon />
        </Link>
      </Box>
      <Box sx={boxButtonCss}>
        <Link to="/login" style={{ color: "#ADB7C2" }}>
          <CalendarMonthOutlinedIcon />
        </Link>
      </Box>
      <Box sx={boxButtonCss}>
        <Link to="/signup" style={{ color: "#ADB7C2" }}>
          <AddCircleOutlineOutlinedIcon />
        </Link>
      </Box>
      <Box sx={boxButtonCss}>
        <Link to="/" style={{ color: "#ADB7C2" }}>
          <PersonOutlineOutlinedIcon />
        </Link>
      </Box>
    </Box>
  );
};

export default Navbar;
