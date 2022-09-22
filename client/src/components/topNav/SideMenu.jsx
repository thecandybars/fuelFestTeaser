import React, { useState } from "react";
import {
  Box,
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import { Hamburger } from "../../iconComponents";
import { Link } from "react-router-dom";

export default function SideMenu() {
  const [menuState, setMenuState] = useState(false);

  return (
    <>
      <Hamburger
        style={{ fill: "white", fontSize: "2rem" }}
        onClick={() => setMenuState(true)}
      />
      <Drawer
        anchor="left"
        open={menuState}
        onClose={() => setMenuState(false)}
      >
        <Box sx={{ width: "250px" }} onClick={() => setMenuState(false)}>
          <button onClick={() => setMenuState(false)}>X</button>
          <List>
            {[
              { label: "Home", link: "/" },
              { label: "Cars", link: "/cars" },
              { label: "Events", link: "/events" },
              { label: "Maps", link: "/maps" },
              { label: "Vendors", link: "/vendors" },
              { label: "Sponsors", link: "/sponsors" },
            ].map((item) => (
              <ListItem key={item.label} disablePadding>
                <ListItemButton>
                  <Link to={item.link}>
                    <ListItemText primary={item.label} />
                  </Link>
                </ListItemButton>
              </ListItem>
            ))}
            <Divider />
            {[
              "Wallet",
              "Your vouchers",
              "Marketplace",
              "Garage",
              "Voting",
              "Pins & Rallies",
              "Statistics",
            ].map((text, index) => (
              <ListItem key={text} disablePadding>
                <ListItemButton>
                  <ListItemText primary={text} />
                </ListItemButton>
              </ListItem>
            ))}
            <Divider />
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemText primary="Your profile" />
              </ListItemButton>
            </ListItem>
          </List>
        </Box>
      </Drawer>
    </>
  );
}
