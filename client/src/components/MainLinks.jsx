import React from "react";
import { NavLink } from "react-router-dom";
import carsImg from "../img/mainLinks_cars.png";
import eventsImg from "../img/mainLinks_events.png";
import sponsorsImg from "../img/mainLinks_sponsors.png";
import mapsImg from "../img/mainLinks_maps.png";
import marketImg from "../img/mainLinks_market.png";
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
    <StyledContainer>
      <ul className={style.list_links}>
        <li>
          <NavLink to="/cars">
            <img src={carsImg} alt="cars menu oprion" width="95%" />
          </NavLink>
        </li>
        <li>
          <NavLink to="/events">
            <img src={eventsImg} alt="events menu oprion" width="110px" />
          </NavLink>
        </li>
        <li>
          <img src={mapsImg} alt="maps menu oprion" width="110px" />
        </li>
        <li>
          <img src={sponsorsImg} alt="sponsors menu oprion" width="110px" />
        </li>
        {/* <li>
          <img src={marketImg} alt="market menu oprion" width="264px" />
        </li> */}
      </ul>
    </StyledContainer>
  );
}
