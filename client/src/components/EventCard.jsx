import React, { useState } from "react";
import style from "./EventCard.module.css";
import favYes from "../icons/favorite_FILL1_wght400_GRAD0_opsz48.svg";
import favNo from "../icons/favorite_FILL0_wght400_GRAD0_opsz48.svg";

export default function EventCard(props) {
  const [displayDesc, setDisplayDesc] = useState(false);
  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const fullDate = new Date(props.date);
  const day = days[fullDate.getDay()];
  const month = months[fullDate.getMonth()].toLowerCase();

  function handleClick() {
    setDisplayDesc((old) => !old);
  }
  const description = displayDesc ? props.desc : "";

  return (
    <>
      <div className={style.container} onClick={handleClick}>
        <img
          alt="The band"
          src={"http://localhost:3001/" + props.image}
          width="150px"
        />
        <div className={style.eventData}>
          <h3 className={style.eventTitle}>{props.title}</h3>
          <p>
            <span className="material-symbols-outlined">calendar_month</span>
            {`${day} ${fullDate.getDay()} ${month}`}
          </p>
          <p>
            <span className="material-symbols-outlined">schedule</span>
            {`${fullDate.getHours()}:${fullDate.getMinutes()}`}
          </p>
          <p>
            <span className="material-symbols-outlined">location_on</span>
            {props.location}
          </p>
        </div>
        <img
          className={style.isFavorite}
          alt={props.isFavorite ? "Favorite" : "Not favorite"}
          src={props.isFavorite ? favYes : favNo}
          onClick={() => props.togFav(props.id)}
        />
      </div>
      {description}
    </>
  );
}
