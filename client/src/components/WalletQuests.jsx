import React from "react";
import MainContainer from "../assets/MainContainer";
import Title from "../assets/Title";
import placeholder from "../img/quest_placeholder.png";

export default function WalletQuests() {
  return (
    <MainContainer>
      {<Title title="Quests and Pins" backButton="true" />}
      <img alt="phd" src={placeholder} />
    </MainContainer>
  );
}
