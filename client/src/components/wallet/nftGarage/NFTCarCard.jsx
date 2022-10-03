import { Dialog } from "@mui/material";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import DialogSellNFT from "./DialogSellNFT";
import NftCard from "../../_shared/NftCard";
import { theme } from "../../../common/theme";

export default function NFTCardCard(props) {
  const apiURL = process.env.REACT_APP_API;
  const { astNFTCard } = props.data;
  const navigate = useNavigate();

  // DIALOG
  const [dialogOpen, setDialogOpen] = useState(false);
  function handleDialogClose() {
    setDialogOpen(false);
  }

  return (
    <>
      {/* BUY CARD DIALOG */}
      <Dialog open={dialogOpen} onClose={handleDialogClose}>
        <DialogSellNFT
          assetId={astNFTCard.assetId}
          closeDialog={handleDialogClose}
        />
      </Dialog>
      <NftCard
        key={astNFTCard.assetId}
        id={astNFTCard.assetId}
        title={astNFTCard.name}
        image={`${apiURL}/${astNFTCard.imageFront}`}
        imageType={astNFTCard.imageFrontType}
        price={astNFTCard.price}
        badge={props.data.isListed ? "Listed for sale" : 0}
        primaryActionTitle={props.data.isListed ? "EDIT" : "SELL"}
        primaryActionColor={props.data.isListed ? theme.red : theme.orange}
        primaryAction={() => {
          setDialogOpen(true);
        }}
        secondaryActionTitle="Details"
        secondaryActionColor={theme.yellow}
        secondaryAction={() => {
          navigate("/wallet/marketplace/nftCarCard/" + astNFTCard.assetId);
        }}
      />
    </>
  );
}

// {/* CARD */}
// <Card>
//   {/* CARD IMAGE */}
//   <Link to={"/wallet/marketplace/nftCarCard/" + astNFTCard.assetId}>
//     <img
//       alt="NFT Card of a car"
//       src={`${apiURL}/${astNFTCard.imageFront}`}
//     />
//   </Link>
//   {/* <Collection>{props.collection}</Collection> */}
//   <Name>{astNFTCard.name}</Name>
//   <Price>{astNFTCard.price} DRIFT</Price>
//   <div
//     style={{
//       display: "flex",
//       justifyContent: "space-around",
//       alignItems: "center",
//       margin: "",
//     }}
//   >
//     <Link to={"/wallet/marketplace/nftCarCard/" + astNFTCard.assetId}>
//       <DetailsButton>Details</DetailsButton>
//     </Link>
//     <BuyButton
//       onClick={(e) => {
//         setDialogOpen(true);
//       }}
//     >
//       BUY
//     </BuyButton>
//   </div>
// </Card>
