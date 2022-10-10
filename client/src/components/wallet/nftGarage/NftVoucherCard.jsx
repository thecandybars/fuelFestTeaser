import { Dialog } from "@mui/material";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
// import DialogBuyVoucher from "./DialogBuyVoucher";
import NftCard from "../../_shared/NftCard";
import { theme } from "../../../common/theme";
import DialogSellNFT from "./DialogSellNFT";

export default function NftVoucherCard(props) {
  const apiURL = process.env.REACT_APP_API;
  const { voucher } = props.data;
  const navigate = useNavigate();

  //DIALOG
  const [dialogOpen, setDialogOpen] = useState(false);
  const handleDialogClose = () => {
    setDialogOpen(false);
    props.handleReload(true);
  };

  return (
    <>
      {/* DIALOG WINDOW */}
      <Dialog open={dialogOpen} onClose={handleDialogClose}>
        <DialogSellNFT
          assetId={voucher.assetId}
          closeDialog={handleDialogClose}
        />
      </Dialog>
      <NftCard
        key={voucher.assetId}
        id={voucher.assetId}
        title={voucher.title}
        image={`${apiURL}/${voucher.image}`}
        imageType={voucher.imageType}
        price={voucher.price}
        badge={props.data.isListed ? "For sale" : 0}
        primaryActionTitle={props.data.isListed ? "EDIT" : "SELL"}
        primaryActionColor={props.data.isListed ? theme.red : theme.orange}
        primaryAction={() => {
          setDialogOpen(true);
        }}
        secondaryActionTitle="Details"
        secondaryActionColor={theme.yellow}
        secondaryAction={() => {
          navigate("/wallet/nftGarage/voucher/" + voucher.assetId);
        }}
      />
    </>
  );
}
// <div className={style.card}>
//   <Link to={"/wallet/marketplace/voucher/" + voucher.assetId}>
//     <img alt="NFT Card of a car" src={`${apiURL}/${voucher.image}`} />
//   </Link>
//   {/* <div className={style.collection}>{props.collection}</div> */}
//   <p>{voucher.title}</p>
//   <p style={{ color: "#feae2e" }}>{voucher.price} DRIFT</p>
//   <div
//     style={{
//       display: "flex",
//       justifyContent: "space-around",
//       alignItems: "center",
//       margin: "",
//     }}
//   >
//     <Link to={"/wallet/marketplace/voucher/" + voucher.assetId}>
//       <div className={style.detailsButton}>Details</div>
//     </Link>
//     <div
//       className={style.buyButton}
//       onClick={(e) => {
//         e.stopPropagation();
//         setDialogOpen(true);
//       }}
//     >
//       BUY
//     </div>
//   </div>
//   {/* DIALOG WINDOW */}
//   <Dialog open={dialogOpen} onClose={handleDialogClose}>
//     <DialogBuyVoucher
//       assetId={voucher.assetId}
//       closeDialog={handleDialogClose}
//     />
//   </Dialog>
// </div>
