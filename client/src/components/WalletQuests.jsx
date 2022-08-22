import React from "react";
import MainContainer from "../assets/MainContainer";
import Title from "../assets/Title";
import placeholder from "../img/quest_placeholder.png";

export default function WalletQuests() {
  return (
    <MainContainer>
      {<Title title="QUESTS AND PINS" backButton="true" />}
      <img alt="phd" src={placeholder} />
    </MainContainer>
  );
}
