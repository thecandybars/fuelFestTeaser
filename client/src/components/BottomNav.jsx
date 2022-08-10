import React from "react";
import style from "./css/BottomNav.module.css";

export default function BottomNav() {
  return (
    <div>
      <ul className={style.bottomNav}>
        <li className={style.bottomNav_item}>
          <span className="material-symbols-outlined">home</span>
        </li>
        <li className={style.bottomNav_item}>
          <span className="material-symbols-outlined">wallet</span>
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
