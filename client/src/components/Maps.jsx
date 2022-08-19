import React from "react";
import MainContainer from "../assets/MainContainer";
import Title from "../assets/Title";
import mapsPlaceholder from "../img/maps_placeholder.png";

export default function Maps() {
  return (
    <MainContainer>
      <Title title="Maps" backButton="true"></Title>
      <input type="text" placeholder="search" size="50" />
      <img alt="sponsors" src={mapsPlaceholder} />
    </MainContainer>
  );
}
