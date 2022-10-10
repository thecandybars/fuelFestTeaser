import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getNFTCard } from "../../../services/assets";
import { theme } from "../../../common/theme";
import NftCardDetail from "../../_shared/NftCardDetail";
import { Dialog } from "@mui/material";
import DialogSellNFT from "./DialogSellNFT";

export default function NftCarDetail() {
  const { assetId } = useParams();
  const navigate = useNavigate();

  //   INIT
  const [nftCarFetched, setNftCarFetched] = useState({});
  console.log(
    "🚀 ~ file: NftCarDetail.jsx ~ line 14 ~ NftCarDetail ~ nftCarFetched",
    nftCarFetched
  );
  useEffect(() => {
    fetchNFTCar(assetId);
  }, [assetId]);
  const fetchNFTCar = async (assetId) => {
    setNftCarFetched(await getNFTCard(assetId));
  };

  // MODAL
  const [dialogOpen, setDialogOpen] = useState(false);
  function handleDialogClose() {
    setDialogOpen(false);
    navigate(-1);
  }

  return (
    Object.keys(nftCarFetched).length !== 0 && (
      <>
        {/* DIALOG WINDOW */}

        <Dialog open={dialogOpen} onClose={handleDialogClose}>
          <DialogSellNFT
            assetId={nftCarFetched.nftCard.assetId}
            closeDialog={handleDialogClose}
          />
        </Dialog>

        <NftCardDetail
          id={assetId}
          type="carCard"
          title={nftCarFetched.nftCard.name}
          data={{
            mintNum: nftCarFetched.nftCard.mintNum,
            mintMax: nftCarFetched.nftCard.mintMax,
            mintTotal: nftCarFetched.nftCard.mintTotal,
            carOwnerName: nftCarFetched.car.carOwner.name,
            carOwnerFacebook: nftCarFetched.car.carOwner.facebook,
            carOwnerInstagram: nftCarFetched.car.carOwner.instagram,
            carOwnerTwitter: nftCarFetched.car.carOwner.twitter,
            carOwnerYoutube: nftCarFetched.car.carOwner.youtube,
            voteCategories: nftCarFetched.voteCategories,
            sponsors: nftCarFetched.car.sponsors,
            transferable: nftCarFetched.nftCard.transferable,
            burnable: nftCarFetched.nftCard.burnable,
          }}
          image={nftCarFetched.nftCard.imageFront}
          imageType={nftCarFetched.nftCard.imageFrontType}
          price={nftCarFetched.nftCard.price}
          actionButton={{
            action: () => setDialogOpen(true),
            label: nftCarFetched.asset.isListed ? "EDIT" : "SELL",
            color: nftCarFetched.asset.isListed ? theme.red : theme.orange,
          }}
        />
      </>
    )
  );
}
