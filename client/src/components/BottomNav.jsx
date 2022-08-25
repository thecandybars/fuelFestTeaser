import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import style from "./css/BottomNav.module.css";
import { NavLink } from "react-router-dom";
import { Container } from "@mui/material";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import SvgIcon from "@mui/material/SvgIcon";
import homeIcon from "../icons/home-off.svg";
import walletIcon from "../icons/wallet-off.svg";
import qrIcon from "../icons/qr-off.svg";
import favoritesIcon from "../icons/favorites-off.svg";
import HomeIcon from "@mui/icons-material/Home";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import QrCodeIcon from "@mui/icons-material/QrCode";
import FavoriteIcon from "@mui/icons-material/Favorite";

export default function BottomNav() {
  const styleContainer = {
    backgroundColor: "#000000",
    // display: "flex",
    // alignItems: "center",
  };
  const styleIcons = { color: "#d9d9d9" };

  const [location, setLocation] = useState("home");
  function handleChange(e) {
    console.log("🚀 ~ file: BottomNav.jsx ~ line 28 ~ handleChange ~ e", e);
  }
  return (
    <Container>
      <ul className={style.bottomNav}>
        <li className={style.bottomNav_item}>
          <NavLink to="/">
            <span className="material-symbols-outlined">home</span>
          </NavLink>
        </li>
        <li className={style.bottomNav_item}>
          <NavLink to="/wallet">
            <span className="material-symbols-outlined">wallet</span>
          </NavLink>
        </li>
        <li className={style.bottomNav_item}>
          <span className="material-symbols-outlined">qr_code</span>
        </li>
        <li className={style.bottomNav_item}>
          <span className="material-symbols-outlined">favorite</span>
        </li>
      </ul>
    </Container>
  );
}
{
  /* <BottomNavigation style={styleContainer}>
        <BottomNavigationAction
          label="Home"
          icon={<HomeIcon style={styleIcons} />}
          value={"home"}
          onChange={(e) => handleChange}
          // icon={<SvgIcon path={homeIcon} color="#fff" />}
        />
        <BottomNavigationAction
          label="Wallet"
          icon={<AccountBalanceWalletIcon style={styleIcons} />}
        />
        <BottomNavigationAction
          label="QR"
          icon={<QrCodeIcon style={styleIcons} />}
        />
        <BottomNavigationAction
          label="Favorites"
          icon={<FavoriteIcon style={styleIcons} />}
        />
      </BottomNavigation> */
}
