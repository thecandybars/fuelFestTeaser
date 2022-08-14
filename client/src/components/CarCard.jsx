import React from "react";
import style from "./css/CarCard.module.css";
import favYes from "../icons/favorite_FILL1_wght400_GRAD0_opsz48.svg";
import favNo from "../icons/favorite_FILL0_wght400_GRAD0_opsz48.svg";
// import Button1 from "../assets/Button1";

export default function CarCard(props) {
  const apiURL = process.env.REACT_APP_API;
  return (
    <>
      <div
        className={style.container}
        onClick={() => {
          props.showDetails(props.id);
        }}
      >
        <img
          alt="The band"
          src={`${apiURL}/${props.image}`}
          width="150px"
          className={style.car_image}
        />
        <div className={style.carData}>
          <h3 className={style.carTitle}>{props.title}</h3>
          <p>
            <span className="material-symbols-outlined">directions_car</span>
            {props.manufacturer}
          </p>
          <p>
            <span className="material-symbols-outlined">tire_repair</span>
            {props.tire}
          </p>
          <p>
            <span className="material-symbols-outlined">location_on</span>
            {props.chasis}
          </p>
        </div>
        <div className={style.buttons}>
          <img
            className={style.isFavorite}
            alt={props.isFavorite ? "Favorite" : "Not favorite"}
            src={props.isFavorite ? favYes : favNo}
            onClick={(e) => {
              e.stopPropagation();
              props.togFav(props.id);
            }}
          />
          {/* <Button1 title="Vote" href="/voting" style={{ fontSize: "16px" }} /> */}
        </div>
      </div>
    </>
  );
}
