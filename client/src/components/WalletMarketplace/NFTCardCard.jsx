import { Dialog } from "@mui/material";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import DialogBuyNFT from "./DialogBuyNFT";
import styled from "styled-components";

const Card = styled.div`
  width: 150px;
  font-family: "Oswald";
  text-align: center;
  font-size: smaller;
  margin-top: 20px;
  p {
    margin-bottom: 2px;
  }
`;
const Collection = styled.div`
  border: 1px solid ${(props) => props.theme.white};
  border-radius: 10px;
  width: 90%;
  margin: 0 auto;
  padding: 3px 0;
`;
const BuyButton = styled.div`
  background-color: ${(props) => props.theme.green};
  width: fit-content;
  padding: 0px 25px;
  border: none;
  border-radius: 15px;
`;
const DetailsButton = styled.div`
  color: ${(props) => props.theme.yellow};
  width: fit-content;
`;
const Name = styled.p`
  color: ${(props) => props.theme.white};
`;
const Price = styled.p`
  color: ${(props) => props.theme.yellow};
`;

export default function NFTCardCard(props) {
  const apiURL = process.env.REACT_APP_API;
  const { astNFTCard } = props.data;

  // DIALOG
  const [dialogOpen, setDialogOpen] = useState(false);
  function handleModalClose() {
    setDialogOpen(false);
  }

  return (
    <Card>
      {/* DIALOG WINDOW */}
      <Dialog open={dialogOpen} onClose={handleModalClose}>
        <DialogBuyNFT
          assetId={astNFTCard.assetId}
          closeDialog={handleModalClose}
        />
      </Dialog>
      {/* CARD IMAGE */}
      <Link to={"/wallet/marketplace/nftCarCard/" + astNFTCard.assetId}>
        <img
          alt="NFT Card of a car"
          src={`${apiURL}/${astNFTCard.imageFront}`}
        />
      </Link>
      {/* <Collection>{props.collection}</Collection> */}
      <Name>{astNFTCard.name}</Name>
      <Price>{astNFTCard.price} DRIFT</Price>
      <div
        style={{
          display: "flex",
          justifyContent: "space-around",
          alignItems: "center",
          margin: "",
        }}
      >
        <Link to={"/wallet/marketplace/nftCarCard/" + astNFTCard.assetId}>
          <DetailsButton>Details</DetailsButton>
        </Link>
        <BuyButton
          onClick={(e) => {
            setDialogOpen(true);
          }}
        >
          BUY
        </BuyButton>
      </div>
    </Card>
  );
}
