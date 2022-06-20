import React, { useContext } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { Box, BottomNavigation, BottomNavigationAction } from "@mui/material";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import PermIdentityOutlinedIcon from "@mui/icons-material/PermIdentityOutlined";
import { AuthContext } from "../contexts/authContext";
function NavBar() {
  const [value, setValue] = useState(0);
  const { loggedInUser, loading } = useContext(AuthContext);

  return (
    <div>
      <Box
        // sx={{
        //   height: "75.63px",
        //   width: "100%",
        //   alignItems: "center",
        //   top: "calc(100vh - 76px )",
        //   position: "absolute",
        //   bottom: 0,
        // }}
        sx={{
          width: "100%",
          height: "75.63px",
          position: "absolute",
          margin: 0,
          bottom: 0,
          display: "block",
        }}
      >
        <BottomNavigation
          style={{ color: "#ADB7C2" }}
          value={value}
          onChange={(event, newValue) => {
            setValue(newValue);
          }}
        >
          <BottomNavigationAction
            style={{ color: "#ADB7C2" }}
            component={Link}
            to="/home"
            icon={<HomeOutlinedIcon />}
          />
          <BottomNavigationAction
            style={{ color: "#ADB7C2" }}
            component={Link}
            to="/create"
            icon={<AddCircleOutlineOutlinedIcon />}
          />
          <BottomNavigationAction
            style={{ color: "#ADB7C2" }}
            component={Link}
            to={`/userprofile/${loggedInUser.user._id}`}
            icon={<PermIdentityOutlinedIcon />}
          />
        </BottomNavigation>
      </Box>
    </div>
  );
}

export default NavBar;
