import React from "react";
import { useState } from "react";
import { Box, BottomNavigation, BottomNavigationAction } from "@mui/material";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import PermIdentityOutlinedIcon from "@mui/icons-material/PermIdentityOutlined";

function NavBar() {
  const [value, setValue] = useState(0);
  return (
    <Box sx={{ width: 500 }}>
      <BottomNavigation
        showLabels
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
      >
        <BottomNavigationAction
          component={"/secondhome"}
          to="/secondhome"
          label="Home"
          icon={<HomeOutlinedIcon />}
        />
        <BottomNavigationAction
          component={"/create"}
          to="/create"
          label="create"
          icon={<AddCircleOutlineOutlinedIcon />}
        />
        <BottomNavigationAction
          component={"/userprofile"}
          to="/userprofile"
          label="Profile"
          icon={<PermIdentityOutlinedIcon />}
        />
      </BottomNavigation>
    </Box>
  );
}

export default NavBar;
