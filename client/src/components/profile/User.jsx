import React, { useEffect, useState } from "react";
import MainContainer from "../_shared/MainContainer";
import placeholder01 from "../../img/sign_placeholder01.jpeg";
import placeholder02 from "../../img/sign_placeholder02.jpeg";
import placeholder03 from "../../img/sign_placeholder03.jpeg";
import placeholder04 from "../../img/sign_placeholder04.jpeg";
import placeholder05 from "../../img/sign_placeholder05.jpeg";
import placeholder06 from "../../img/sign_placeholder06.jpeg";

export default function User() {
  const images = [
    placeholder01,
    placeholder02,
    placeholder03,
    placeholder04,
    placeholder05,
    placeholder06,
  ];
  const [counter, setCounter] = useState(0);
  const [image, setImage] = useState(images[0]);
  function handleImage() {
    setCounter((prev) => (prev === 4 ? 0 : prev + 1));
  }
  useEffect(() => {
    setImage(images[counter]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [counter]);
  return (
    <MainContainer style={{ padding: "0px" }}>
      <img alt="phd" src={image} onClick={handleImage} />
    </MainContainer>
  );
}
