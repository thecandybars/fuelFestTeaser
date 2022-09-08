import React from "react";
import style from "./css/BottomNav.module.css";
import { NavLink } from "react-router-dom";
import { icons } from "../common/icons.js";

export default function BottomNav() {
  return (
    <div className={style.bottomContainer}>
      <ul className={style.bottomNav}>
        <li className={style.bottomNav_item}>
          <NavLink
            to="/"
            className={style.icon}
            activeClassName={style.iconActive}
          >
            <img alt="" src={icons.tempNav.home} />
          </NavLink>
        </li>
        <li className={style.bottomNav_item}>
          <NavLink
            to="/wallet"
            className={style.icon}
            activeClassName={style.iconActive}
          >
            <img alt="" src={icons.tempNav.wallet} />
          </NavLink>
        </li>
        <li className={style.bottomNav_item}>
          <NavLink
            to="/"
            className={style.icon}
            activeClassName={style.iconActive}
          >
            <img alt="" src={icons.tempNav.qr} />
          </NavLink>
        </li>
        <li className={style.bottomNav_item}>
          <NavLink
            to="/"
            className={style.icon}
            activeClassName={style.iconActive}
          >
            <img alt="" src={icons.tempNav.favorite} />
          </NavLink>
        </li>
      </ul>
    </div>
  );
}
