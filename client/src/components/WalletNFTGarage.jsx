import React, { useState } from "react";
import MainContainer from "../assets/MainContainer";
import Title from "../assets/Title";
import placeholder1 from "../img/NFTGarage_placeholder1.jpeg";
import placeholder2 from "../img/NFTGarage_placeholder2.jpeg";

export default function WalletNFTGarage() {
  const images = [placeholder1, placeholder2];
  const [counter, setCounter] = useState(0);
  const [image, setImage] = useState(images[0]);
  function handleImage() {
    setCounter((prev) => (prev === 1 ? 0 : prev + 1));
    setImage(images[counter]);
  }
  return (
    <MainContainer>
      <Title title="NFT GARAGE" backButton="true" />
      <img alt="phd" src={image} onClick={handleImage} />
    </MainContainer>
  );
}
