import React from "react";
import MainFeatures from "./MainFeatures";
import MainLinks from "./MainLinks";
import style from "./css/Main.module.css";

export default function Main() {
  return (
    <div className={style.main}>
      <MainFeatures />
      <MainLinks />
    </div>
  );
}
