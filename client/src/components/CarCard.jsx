import React, { useState } from "react";
import style from "./css/CarCard.module.css";
import { Link } from "react-router-dom";
import { Dialog } from "@mui/material";
import styled from "styled-components";
import { icons } from "../common/icons";
import CarDetails from "./CarDetails";
// import Button1 from "../assets/Button1";

export default function CarCard(props) {
  const apiURL = process.env.REACT_APP_API;

  // DIALOG
  const [carDetailOpen, setCarDetailOpen] = useState(false);
  const handleCarDetailOpen = () => setCarDetailOpen(true);
  const handleCarDetailClose = () => setCarDetailOpen(false);

  return (
    <>
      {/* DIALOG */}
      {/* <Dialog open={carDetailOpen} onClose={handleCarDetailClose}>
        <CarDetails carId={props.id} />
      </Dialog> */}
      <Link to={`/car/${props.id}`}>
        <div className={style.container} onClick={handleCarDetailOpen}>
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
                src={props.isFavorite ? icons.favorite.on : icons.favorite.off}
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
                src={icons.owner}
                className={`${style.smIcon} ${style.white}`}
              />
              {props.owner}
            </div>
            {/* 3RD ROW LOCATION + MAP*/}
            <div className={style.location}>
              <div className={style.location_data}>
                <img
                  alt="location icon"
                  src={icons.location}
                  className={`${style.smIcon} ${style.white}`}
                />
                <p>{props.location}</p>
              </div>
              <div className={style.location_map}>
                <img alt="map icon" src={icons.map} className={style.smIcon} />
                <Link to="#">
                  <p>map</p>
                </Link>
              </div>
            </div>
            {/* 4TH ROW VOTING CATEGORIES*/}
            <div className={style.voteCategories}>
              {props.voting.map((voteCat) => (
                <img
                  key={voteCat.id}
                  alt="icon"
                  src={`${apiURL}/${voteCat.icon}`}
                  className={`${style.smIcon} ${style.white}`}
                />
              ))}
            </div>
          </div>
        </div>
      </Link>
    </>
  );
}
