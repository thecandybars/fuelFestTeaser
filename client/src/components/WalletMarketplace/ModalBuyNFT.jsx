import React from "react";
import styled from "styled-components";

const ModalContainer = styled.div`
  margin: 30px;
  padding: 5px;
  height: 500px;
  background-color: rgba(46, 46, 46, 0.97);
`;

export default function ModalBuyNFT(props) {
  const { astNFTCard } = props.data.asset;
  //   const style = {
  //     position: "absolute",
  //     top: "50%",
  //     left: "50%",
  //     transform: "translate(-50%, -50%)",
  //     width: "400px",
  //     bgcolor: "background.paper",
  //     border: "2px solid #000",
  //     // boxShadow: 24,
  //     // p: 4,
  //   };
  return <ModalContainer> {astNFTCard.name}</ModalContainer>;
}
