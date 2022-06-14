import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { Box, BottomNavigation, BottomNavigationAction } from "@mui/material";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import PermIdentityOutlinedIcon from "@mui/icons-material/PermIdentityOutlined";

function NavBar() {
  const [value, setValue] = useState(0);
  return (
    <div>
      <Box sx={{ width: "100%", position: "absolute", bottom: 0 }}>
        <BottomNavigation
          value={value}
          onChange={(event, newValue) => {
            setValue(newValue);
          }}
        >
          <BottomNavigationAction
            component={Link}
            to="/secondhome"
            label="Home"
            icon={<HomeOutlinedIcon />}
          />
          <BottomNavigationAction
            component={Link}
            to="/create"
            label="create"
            icon={<AddCircleOutlineOutlinedIcon />}
          />
          <BottomNavigationAction
            component={Link}
            to="/"
            label="Profile"
            icon={<PermIdentityOutlinedIcon />}
          />
        </BottomNavigation>
      </Box>
    </div>
  );
}

export default NavBar;
