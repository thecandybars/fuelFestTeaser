import React from "react";
import MainContainer from "../assets/MainContainer";
import Title from "../assets/Title";
import placeholder from "../img/stats_placeholder.jpg";

export default function WalletStats() {
  return (
    <MainContainer>
      {<Title title="Statistics" backButton="true" />}
      <img alt="phd" src={placeholder} />
    </MainContainer>
  );
}
