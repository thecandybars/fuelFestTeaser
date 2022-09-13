import React from "react";
import MainContainer from "../assets/MainContainer";
import Title from "../assets/Title";
import placeholder from "../img/quest_placeholder.jpeg";

export default function WalletQuests() {
  return (
    <MainContainer>
      {<Title backButton="true">PINS AND RALLIES</Title>}
      <img alt="phd" src={placeholder} />
    </MainContainer>
  );
}
