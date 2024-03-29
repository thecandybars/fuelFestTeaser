import React from "react";
import MainContainer from "../_shared/MainContainer";
import MainFeatures from "./MainFeatures";
import MainLinks from "./MainLinks";

export default function Main() {
  return (
    <MainContainer>
      <MainFeatures />
      <MainLinks />
    </MainContainer>
  );
}
