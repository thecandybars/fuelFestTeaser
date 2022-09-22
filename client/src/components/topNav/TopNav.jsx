import React from "react";
import style from "./TopNav.module.css";
import logo from "../../img/fuelFestLogo.png";
import { Link } from "react-router-dom";
import SideMenu from "./SideMenu";

export default function TopNav() {
  return (
    <nav className={style.topNav}>
      <ul className={style.topNavLeft}>
        <li className={style.topNavLeft_menu}>
          <SideMenu />
        </li>
        <li className={style.topNavLeft_logo}>
          <Link to="/">
            <img src={logo} alt="FuelFest logo" width="150px" />
          </Link>
        </li>
      </ul>
      <ul className={style.topNavRight}>
        {/* <li className={style.topNavRight_item}>
          <span className="material-symbols-outlined">info</span>
        </li> */}
        <li className={style.topNavRight_item}>
          <span className="material-symbols-outlined">notifications</span>
        </li>
        <li className={style.topNavRight_item}>
          <Link to="/user">
            <span className="material-symbols-outlined">account_circle</span>
          </Link>
        </li>
      </ul>
    </nav>
  );
}
