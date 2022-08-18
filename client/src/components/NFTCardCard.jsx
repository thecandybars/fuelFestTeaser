import React from "react";
import style from "./css/NFTCard.module.css";

export default function NFTCardCard(props) {
  const apiURL = process.env.REACT_APP_API;

  return (
    <div className={style.card}>
      <img alt="NFT Card of a car" src={`${apiURL}/${props.imgFront}`} />
      <div className={style.collection}>{props.collection}</div>
      <p>{props.title}</p>
      <p style={{ color: "#feae2e" }}>{props.price} drift</p>
      <p
        style={{
          display: "flex",
          justifyContent: "space-around",
          alignItems: "center",
          margin: "",
        }}
      >
        <div className={style.detailsButton}>Details</div>
        <div className={style.buyButton}>Buy</div>
      </p>
    </div>
  );
}
