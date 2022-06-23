import { Box } from "@mui/material";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import React from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../contexts/authContext";
import { useContext } from "react";

const Navbar = () => {
  const { loggedInUser } = useContext(AuthContext);

  const boxButtonCss = { width: "22px", height: "22px", mt: "17px" };
  return (
    <Box
      sx={{
        display: "flex",
        height: "75.63px",
        width: "100%",
        justifyContent: "space-around",
        top: "calc(100vh - 76px )",
        position: "absolute",
      }}
    >
      <Box sx={boxButtonCss}>
        <Link to="/home" style={{ color: "#ADB7C2" }}>
          <HomeOutlinedIcon />
        </Link>
      </Box>

      <Box sx={boxButtonCss}>
        <Link to="/create" style={{ color: "#ADB7C2" }}>
          <AddCircleOutlineOutlinedIcon />
        </Link>
      </Box>
      <Box sx={boxButtonCss}>
        <Link
          to={`/userprofile/${loggedInUser.user._id}`}
          style={{ color: "#ADB7C2" }}
        >
          <PersonOutlineOutlinedIcon />
        </Link>
      </Box>
    </Box>
  );
};

export default Navbar;
