import React from "react";
import MainContainer from "../_shared/MainContainer";
import Title from "../../components/_shared/Title";
import vendorsPlaceholder from "../../img/vendors_placeholder.jpeg";

export default function Vendors() {
  return (
    <MainContainer>
      <Title backButton="true">VENDORS</Title>
      <input type="text" placeholder="search" size="50" />
      <img alt="sponsors" src={vendorsPlaceholder} />
    </MainContainer>
  );
}
