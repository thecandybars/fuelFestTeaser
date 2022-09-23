import React, { useState, useEffect } from "react";
import { Box, Divider, Drawer } from "@mui/material";
import { Hamburger } from "../../iconComponents";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { Home, Wallet, Profile, SignOut } from "../../iconComponents";
import { theme } from "../../common/theme";
import { userId } from "../../common/getLoginData";
import { getUser } from "../../services/user";
import { Cancel } from "@mui/icons-material";

const StyledSection = styled.div`
  margin: 20px;
`;
const StyledItem = styled.div`
  display: flex;
  font-size: 1.5rem;
  align-items: center;
`;
const StyledLabel = styled.p`
  font-family: "Oswald";
`;
const StyledIcon = styled.div`
  display: flex;
  align-items: center;
  fill: ${(props) => props.theme.red};
  margin-right: 10px;
`;
const StyledProfile = styled.div`
  img {
    width: 100px;
    height: 100px;
    object-fit: cover;
    object-position: center;
    border-radius: 100%;
  }
  h2 {
    font-size: 1.5rem;
  }
  h3 {
    margin-bottom: 15px;
    color: ${(props) => props.theme.darkGray};
  }
`;

export default function SideMenu() {
  const [menuState, setMenuState] = useState(false);
  const [user, setUser] = useState({});
  const navigate = useNavigate();
  const apiURL = process.env.REACT_APP_API;

  // LOAD USER
  useEffect(() => {
    fetchUser();
  }, []);
  const fetchUser = async () => setUser(await getUser(userId));

  //MENU OPTIONS
  const profileOptions = [
    {
      label: "Your profile",
      link: "/profile",
      icon: <Profile />,
    },
  ];
  const homeOptions = [
    {
      label: "HOME",
      link: "/",
      icon: <Home />,
    },
    { label: "Cars", link: "/cars" },
    { label: "Events", link: "/events" },
    { label: "Maps", link: "/maps" },
    { label: "Vendors", link: "/vendors" },
    { label: "Sponsors", link: "/sponsors" },
  ];
  const walletOptions = [
    {
      label: "WALLET",
      link: "/wallet",
      icon: <Wallet />,
    },
    { label: "Your Vouchers", link: "/wallet/vouchers" },
    { label: "Marketplace", link: "/wallet/marketplace" },
    { label: "Garage", link: "/wallet/NFTGarage" },
    { label: "Voting", link: "/wallet/voting" },
    { label: "Pins & Rallies", link: "/wallet/quests" },
    { label: "Statistics", link: "/wallet/stats" },
  ];
  const signOutOptions = [
    {
      label: "SIGN OUT",
      link: "/signOut",
      icon: <SignOut />,
    },
  ];
  // MENU RENDER
  const renderProfileInfo = (
    <StyledProfile>
      <img alt="userAvatar" src={`${apiURL}/${user.image}`} />
      <h2>
        {user.firstName} {user.lastName}
      </h2>
      <h3>{user.email}</h3>
    </StyledProfile>
  );
  const renderProfileOptions = profileOptions.map((item) => (
    <StyledItem key={item.label} disablePadding>
      {item.icon && <StyledIcon>{item.icon}</StyledIcon>}
      <StyledLabel>{item.label}</StyledLabel>
    </StyledItem>
  ));
  const renderHomeOptions = homeOptions.map((item) => (
    <StyledItem
      key={item.label}
      style={item.icon ? { color: theme.red } : null}
      onClick={() => navigate(item.link)}
    >
      {item.icon && <StyledIcon>{item.icon}</StyledIcon>}
      <StyledLabel>{item.label}</StyledLabel>
    </StyledItem>
  ));
  const renderWalletOptions = walletOptions.map((item) => (
    <StyledItem
      button
      key={item.label}
      disablePadding
      style={item.icon ? { color: theme.red } : null}
      onClick={() => navigate(item.link)}
    >
      {item.icon && <StyledIcon>{item.icon}</StyledIcon>}
      <StyledLabel>{item.label}</StyledLabel>
    </StyledItem>
  ));
  const renderSignOutOptions = signOutOptions.map((item) => (
    <StyledItem
      button
      key={item.label}
      disablePadding
      style={item.icon ? { color: theme.red } : null}
      onClick={() => navigate(item.link)}
    >
      {item.icon && <StyledIcon>{item.icon}</StyledIcon>}
      <StyledLabel>{item.label}</StyledLabel>
    </StyledItem>
  ));

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
        <Box sx={{ width: "350px" }} onClick={() => setMenuState(false)}>
          <StyledSection style={{ margin: "12px" }}>
            <Cancel color="red" onClick={() => setMenuState(false)} />
          </StyledSection>
          <StyledSection>
            {renderProfileInfo}
            {renderProfileOptions}
          </StyledSection>
          <Divider variant="middle" />
          <StyledSection> {renderHomeOptions}</StyledSection>
          <StyledSection>{renderWalletOptions}</StyledSection>
          <Divider variant="middle" />
          <StyledSection>{renderSignOutOptions}</StyledSection>
        </Box>
      </Drawer>
    </>
  );
}
