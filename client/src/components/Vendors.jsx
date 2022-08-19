import React from "react";
import MainContainer from "../assets/MainContainer";
import Title from "../assets/Title";
import vendorsPlaceholder from "../img/vendors_placeholder.jpeg";

export default function Vendors() {
  return (
    <MainContainer>
      <Title title="Vendors" backButton="true"></Title>
      <input type="text" placeholder="search" size="50" />
      <img alt="sponsors" src={vendorsPlaceholder} />
    </MainContainer>
  );
}
