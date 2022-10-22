import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import style from "./Voting.module.css";
import carVote4_placeholder from "../../../img/carVote4_placeholder.jpeg";
import carVote5_placeholder from "../../../img/carVote5_placeholder.jpeg";
import MainContainer from "../../_shared/MainContainerWhole";

export default function Voting(props) {
  const images = [carVote4_placeholder, carVote5_placeholder];
  const [counter, setCounter] = useState(0);
  const [image, setImage] = useState(images[0]);
  function handleImage() {
    setCounter((prev) => (prev === 1 ? 0 : prev + 1));
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
