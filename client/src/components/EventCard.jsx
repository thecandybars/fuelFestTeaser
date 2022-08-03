import React from "react";
import style from "./EventCard.module.css";

export default function EventCard(props) {
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
  console.log(
    "🚀 ~ file: EventCard.jsx ~ line 29 ~ EventCard ~ fullDate",
    fullDate
  );
  const day = days[fullDate.getDay];
  const month = months[fullDate.getMonth];
  // {`${day} ${fullDate.getDay} ${month}`}
  // const year = fullDate.getFullYear();
  return (
    <div className={style.container}>
      <img
        alt="The band"
        src={"http://localhost:3001/" + props.image}
        width="150px"
      />
      <div className={style.eventData}>{props.date}</div>
    </div>
  );
}
