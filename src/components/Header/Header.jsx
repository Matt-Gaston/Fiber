import React from "react";
import { AppBar, Toolbar, Typography } from "@mui/material";

const Header = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h5">Fiber</Typography>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
