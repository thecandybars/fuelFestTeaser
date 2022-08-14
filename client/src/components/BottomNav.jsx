import React, { useState } from "react";
import style from "./css/BottomNav.module.css";
import { NavLink } from "react-router-dom";

export default function BottomNav() {
  return (
    <div>
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
    </div>
  );
}
