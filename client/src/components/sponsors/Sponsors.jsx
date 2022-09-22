import React from "react";
import MainContainer from "../_shared/MainContainer";
import Title from "../../components/_shared/Title";
import sponsorsPlaceholder from "../../img/sponsors_placeholder.jpeg";

export default function Sponsors() {
  return (
    <MainContainer>
      <Title backButton="true">SPONSORS</Title>
      <input type="text" placeholder="search" size="50" />
      <img alt="sponsors" src={sponsorsPlaceholder} />
    </MainContainer>
  );
}
