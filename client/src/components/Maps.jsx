import React, { useEffect, useState } from "react";
import MainContainer from "../assets/MainContainer";
import Title from "../assets/Title";
import placeholder1 from "../img/maps/map1.jpeg";
import placeholder2 from "../img/maps/map2.jpeg";

export default function Maps() {
  const images = [placeholder1, placeholder2];
  const [counter, setCounter] = useState(0);
  const [image, setImage] = useState(images[0]);

  useEffect(() => {
    setImage(images[counter]);
  }, [counter]);
  const imgStyle = {
    width: counter === 0 ? "500%" : "100%",
    height: counter === 0 ? "500%" : "100%",
  };
  return (
    <MainContainer>
      <Title backButton="true">MAPS</Title>
      <input type="text" placeholder="search" size="50" />
      <div style={imgStyle}>
        <img
          alt="sponsors"
          src={image}
          onClick={() => setCounter((prev) => (prev === 1 ? 0 : prev + 1))}
        />
      </div>
    </MainContainer>
  );
}
