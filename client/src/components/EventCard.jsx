import React from "react";
import style from "./css/EventCard.module.css";
import favYes from "../icons/favorite_FILL1_wght400_GRAD0_opsz48.svg";
import favNo from "../icons/favorite_FILL0_wght400_GRAD0_opsz48.svg";
import { days, months } from "../common/dateNames";

export default function EventCard(props) {
  const fullDate = new Date(props.date);
  const dayName = days[fullDate.getDay()];
  const dayNumber =
    fullDate.getMinutes().toString().length === 2
      ? fullDate.getMinutes()
      : "0" + fullDate.getMinutes();
  const monthName = months[fullDate.getMonth()].toLowerCase();

  return (
    <>
      <div
        className={style.container}
        onClick={() => {
          props.showDesc(props.id);
        }}
      >
        <img
          alt="The band"
          src={"http://localhost:3001/" + props.image}
          width="150px"
          className={style.event_image}
        />
        <div className={style.eventData}>
          <h3 className={style.eventTitle}>{props.title}</h3>
          <p>
            <span className="material-symbols-outlined">calendar_month</span>
            {`${dayName} ${fullDate.getDate()} ${monthName}`}
          </p>
          <p>
            <span className="material-symbols-outlined">schedule</span>
            {`${fullDate.getHours()}:${dayNumber}`}
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
          onClick={(e) => {
            e.stopPropagation();
            props.togFav(props.id);
          }}
        />
      </div>
      {props.desc}
    </>
  );
}
