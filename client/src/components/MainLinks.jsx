import React from "react";
import { NavLink } from "react-router-dom";
import carsImg from "../img/mainLinks_cars.png";
import eventsImg from "../img/mainLinks_events.png";
import vendorsImg from "../img/mainLinks_vendors.png";
import sponsorsImg from "../img/mainLinks_sponsors.png";
import mapsImg from "../img/mainLinks_maps.png";
import walletImg from "../img/mainLinks_wallet.png";
import style from "./css/MainLinks.module.css";
import styled from "styled-components";

const StyledContainer = styled.div`
  img {
    border-radius: 15px;
    margin: 4px;
  }
`;

export default function MainLinks() {
  return (
    <div className={style.list_links}>
      <div className={style.row1}>
        <NavLink to="/cars">
          <img src={carsImg} alt="cars " width="95%" />
        </NavLink>
      </div>
      <div className={style.row2}>
        <div className={style.col1}>
          <NavLink to="/events">
            <img src={eventsImg} alt="events" />
          </NavLink>
        </div>
        <div className={style.col2}>
          <img src={vendorsImg} alt="vendors" />
          <img src={sponsorsImg} alt="sponsors" />
          <img src={mapsImg} alt="maps" />
          <img src={walletImg} alt="wallet" />
        </div>
      </div>
    </div>
  );
}
