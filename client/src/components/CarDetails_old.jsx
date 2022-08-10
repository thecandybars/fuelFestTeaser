import React from "react";
import style from "./css/CarDetails.module.css";
import PhotoSlider from "./PhotoSlider";
import favYes from "../icons/favorite_FILL1_wght400_GRAD0_opsz48.svg";
import favNo from "../icons/favorite_FILL0_wght400_GRAD0_opsz48.svg";

export default function CarDetails(props) {
  return (
    <div
      className={style.carDetail_wholeScreen}
      onClick={() => {
        props.showDetails("");
      }}
    >
      <div className={style.carDetail_container}>
        <button>X</button>
        <PhotoSlider images={props.images} />
        <h2>
          {props.title}
          <img
            className={style.isFavorite}
            alt={props.isFavorite ? "Favorite" : "Not favorite"}
            src={props.isFavorite ? favYes : favNo}
            onClick={(e) => {
              e.stopPropagation();
              props.togFav(props.id);
            }}
          />
        </h2>
        <div className={style.mainData}>
          <p>
            <span className="material-symbols-outlined">directions_car</span>
            <p>{props.manufacturer}</p>
          </p>
          <p>
            {" "}
            <span className="material-symbols-outlined">tire_repair</span>
            <p>{props.tire}</p>
          </p>
          <p>
            {" "}
            <span className="material-symbols-outlined">location_on</span>
            <p>{props.chasis}</p>
          </p>
        </div>
        {props.desc}
      </div>
    </div>
  );
}
