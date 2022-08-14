import React from "react";
import style from "./css/TopNav.module.css";
import logo from "../img/fuelFestLogo.png";
import { NavLink } from "react-router-dom";

export default function TopNav() {
  return (
    <div className={style.topNav}>
      <ul className={style.topNavLeft}>
        <li className={style.topNavLeft_menu}>
          <span className="material-symbols-outlined">menu</span>
        </li>
        <li className={style.topNavLeft_logo}>
          <NavLink to="/">
            <img src={logo} alt="FuelFest logo" width="150px" />
          </NavLink>
        </li>
      </ul>
      <ul className={style.topNavRight}>
        <li className={style.topNavRight_item}>
          {" "}
          <span className="material-symbols-outlined">info</span>
        </li>
        <li className={style.topNavRight_item}>
          {" "}
          <span className="material-symbols-outlined">notifications</span>
        </li>
        <li className={style.topNavRight_item}>
          {" "}
          <span className="material-symbols-outlined">account_circle</span>
        </li>
      </ul>
    </div>
  );
}
