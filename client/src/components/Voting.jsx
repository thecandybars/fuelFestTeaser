import React from "react";
import { useParams } from "react-router-dom";
import style from "./css/Voting.module.css";

export default function Voting(props) {
  const { carId } = useParams();
  return (
    <div>
      <h1 className={style.title}>Voting</h1>
      <p>{carId}</p>
    </div>
  );
}
