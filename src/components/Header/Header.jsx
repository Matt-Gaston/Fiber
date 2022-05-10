//header component
//doesnt do much, just a nice looking bar at the top
//maybe in future make it a tabbed selector and add things like junction routes for fiber cables

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
