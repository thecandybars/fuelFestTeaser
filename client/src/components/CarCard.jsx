import React from "react";
import style from "./css/CarCard.module.css";
import favYes from "../icons/favorite_FILL1_wght400_GRAD0_opsz48.svg";
import favNo from "../icons/favorite_FILL0_wght400_GRAD0_opsz48.svg";
import ownerIcon from "../icons/person_FILL0_wght400_GRAD0_opsz48.svg";
import votesIcon from "../icons/check_circle_FILL0_wght400_GRAD0_opsz48.svg";
import mapIcon from "../icons/map_FILL0_wght400_GRAD0_opsz48.svg";
import locationIcon from "../icons/location_on_FILL0_wght400_GRAD0_opsz48.svg";
import { Link } from "react-router-dom";
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
          alt="A car"
          src={`${apiURL}/${props.image}`}
          width="150px"
          className={style.car_image}
        />
        <div className={style.carData}>
          {/* 1ST ROW   TITLE + FAVORITE */}
          <div className={style.carTitle}>
            <h3>{props.title}</h3>
            <img
              className={`${style.smIcon} ${style.white}`}
              alt={props.isFavorite ? "Favorite" : "Not favorite"}
              src={props.isFavorite ? favYes : favNo}
              onClick={(e) => {
                e.stopPropagation();
                props.togFav(props.id);
              }}
            />
          </div>
          {/* 2ND ROW OWNER */}
          <div className={style.owner}>
            <img
              alt="owner icon"
              src={ownerIcon}
              className={`${style.smIcon} ${style.white}`}
            />
            {props.owner}
          </div>
          {/* 3RD ROW LOCATION + MAP*/}
          <div className={style.location}>
            <div className={style.location_data}>
              <img
                alt="location icon"
                src={locationIcon}
                className={`${style.smIcon} ${style.white}`}
              />
              <p>{props.location}</p>
            </div>
            <div className={style.location_map}>
              <img alt="map icon" src={mapIcon} className={style.smIcon} />
              <Link to="#">
                <p>map</p>
              </Link>
            </div>
          </div>
          {/* 4TH ROW VOTING CATEGORIES*/}
          <div className={style.voteCategories}>
            {props.voting.map((voteCat) => (
              <img
                alt="icon"
                src={`${apiURL}/${voteCat.icon}`}
                className={`${style.smIcon} ${style.white}`}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
