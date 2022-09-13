import React from "react";
import MainContainer from "../assets/MainContainer";
import Title from "../assets/Title";
import sponsorsPlaceholder from "../img/sponsors_placeholder.jpeg";

export default function Sponsors() {
  return (
    <MainContainer>
      <Title backButton="true">SPONSORS</Title>
      <input type="text" placeholder="search" size="50" />
      <img alt="sponsors" src={sponsorsPlaceholder} />
    </MainContainer>
  );
}
