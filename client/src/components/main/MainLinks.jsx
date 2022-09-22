import React from "react";
import { Link } from "react-router-dom";
import carsImg from "../../img/mainLinks_cars.png";
import eventsImg from "../../img/mainLinks_events.png";
import vendorsImg from "../../img/mainLinks_vendors.png";
import sponsorsImg from "../../img/mainLinks_sponsors.png";
import mapsImg from "../../img/mainLinks_maps.png";
import walletImg from "../../img/mainLinks_wallet.png";
import style from "./MainLinks.module.css";
// import styled from "styled-components";

export default function MainLinks() {
  return (
    <div className={style.list_links}>
      <div className={style.row1}>
        <Link to="/cars">
          <img src={carsImg} alt="cars" />
        </Link>
      </div>
      <div className={style.row2}>
        <div className={style.col1}>
          <Link to="/events">
            <img src={eventsImg} alt="events" />
          </Link>
        </div>
        <div className={style.col2}>
          <div className={style.smImg}>
            <Link to="vendors">
              <img src={vendorsImg} alt="vendors" />
            </Link>
          </div>
          <div className={style.smImg}>
            <Link to="/sponsors">
              <img src={sponsorsImg} alt="sponsors" />
            </Link>
          </div>
          <div className={style.smImg}>
            <Link to="/maps">
              <img src={mapsImg} alt="maps" />
            </Link>
          </div>
          <div className={style.smImg}>
            <Link to="/wallet">
              <img src={walletImg} alt="wallet" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
