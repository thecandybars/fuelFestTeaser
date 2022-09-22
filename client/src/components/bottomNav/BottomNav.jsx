import React from "react";
import style from "./BottomNav.module.css";
import { NavLink } from "react-router-dom";
import { Icons } from "../../common/Ico";
import { theme } from "../../common/theme";

export default function BottomNav() {
  const activeStyle = {
    fill: theme.red,
  };

  return (
    <nav className={style.bottomContainer}>
      <ul className={style.bottomNav}>
        <li className={style.bottomNav_item}>
          <NavLink
            to="/"
            className={style.icon}
            style={({ isActive }) => (isActive ? activeStyle : undefined)}
          >
            <Icons.Home />
          </NavLink>
        </li>
        <li className={style.bottomNav_item}>
          <NavLink
            to="/wallet"
            className={style.icon}
            style={({ isActive }) => (isActive ? activeStyle : undefined)}
          >
            <Icons.Wallet />
          </NavLink>
        </li>
        <li className={style.bottomNav_item}>
          <NavLink
            to="/"
            className={style.icon}
            // style={({ isActive }) => (isActive ? activeStyle : undefined)}
          >
            <Icons.Qr />
          </NavLink>
        </li>
        <li className={style.bottomNav_item}>
          <NavLink
            to="/"
            className={style.icon}
            // style={({ isActive }) => (isActive ? activeStyle : undefined)}
          >
            <Icons.Favorite />
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}
