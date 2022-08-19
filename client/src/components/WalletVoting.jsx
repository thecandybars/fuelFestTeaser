import React, { useState } from "react";
import MainContainer from "../assets/MainContainer";
import Title from "../assets/Title";
import placeholder1 from "../img/carVote1_placeholder.jpg";
import placeholder2 from "../img/carVote2_placeholder.jpg";
import placeholder3 from "../img/carVote3_placeholder.jpg";

export default function WalletVoting() {
  const images = [placeholder1, placeholder2, placeholder3];
  const [counter, setCounter] = useState(0);
  const [image, setImage] = useState(images[0]);
  function handleImage() {
    setCounter((prev) => (prev === 2 ? 0 : prev + 1));
    setImage(images[counter]);
  }
  return (
    <MainContainer>
      <Title title="Voting" backButton="true" />
      <img alt="phd" src={image} onClick={handleImage} />
    </MainContainer>
  );
}
