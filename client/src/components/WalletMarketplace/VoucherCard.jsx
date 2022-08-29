import React from "react";
import { Link } from "react-router-dom";
import style from "../css/NFTCard.module.css";

export default function VoucherCard(props) {
  const apiURL = process.env.REACT_APP_API;
  const { voucher } = props.data;
  return (
    <div className={style.card}>
      {/* <Modal open={modalIsOpen} onClose={handleModalClose}>
    <ModalBuyNFT data={props} />
  </Modal> */}
      <Link to={"/wallet/marketplace/" + voucher.assetId}>
        <img alt="NFT Card of a car" src={`${apiURL}/${voucher.image}`} />
      </Link>
      {/* <div className={style.collection}>{props.collection}</div> */}
      <p>{voucher.title}</p>
      <p style={{ color: "#feae2e" }}>{voucher.price} DRIFT</p>
      <div
        style={{
          display: "flex",
          justifyContent: "space-around",
          alignItems: "center",
          margin: "",
        }}
      >
        <Link to={"/wallet/marketplace/" + voucher.id}>
          <div className={style.detailsButton}>Details</div>
        </Link>
        <div
          className={style.buyButton}
          onClick={(e) => {
            e.stopPropagation();
            props.buyAction(voucher.assetId);
          }}
        >
          BUY
        </div>
      </div>
    </div>
  );
}
