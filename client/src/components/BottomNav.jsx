import React from "react";

import style from "./css/BottomNav.module.css";
import { NavLink } from "react-router-dom";
import { icons } from "../common/icons.js";
import homeIcon from "../icons/navigation/home-on.svg";

export default function BottomNav() {
  return (
    <div className={style.bottomContainer}>
      <ul className={style.bottomNav}>
        <li className={style.bottomNav_item}>
          <NavLink to="/">
            {/* <img alt="" src={icons.navigation.home.on} /> */}
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
    </div>
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
