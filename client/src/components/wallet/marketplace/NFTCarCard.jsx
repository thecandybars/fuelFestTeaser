import { Dialog } from "@mui/material";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import DialogBuyNFT from "./DialogBuyNFT";
import NftCard from "../../_shared/NftCard";
import { theme } from "../../../common/theme";

export default function NFTCardCard(props) {
  const apiURL = process.env.REACT_APP_API;
  const { astNFTCard } = props.data;
  const navigate = useNavigate();

  // DIALOG
  const [dialogOpen, setDialogOpen] = useState(false);
  function handleModalClose() {
    setDialogOpen(false);
  }

  return (
    <>
      {/* BUY CARD DIALOG */}
      <Dialog open={dialogOpen} onClose={handleModalClose}>
        <DialogBuyNFT
          assetId={astNFTCard.assetId}
          closeDialog={handleModalClose}
        />
      </Dialog>
      <NftCard
        key={astNFTCard.assetId}
        id={astNFTCard.assetId}
        title={astNFTCard.name}
        image={`${apiURL}/${astNFTCard.imageFront}`}
        imageType={astNFTCard.imageFrontType}
        price={astNFTCard.price}
        primaryActionTitle="BUY"
        primaryActionColor={theme.green}
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
