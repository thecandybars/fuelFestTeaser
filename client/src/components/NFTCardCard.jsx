import React from "react";
import { Link } from "react-router-dom";
import style from "./css/NFTCard.module.css";

export default function NFTCardCard(props) {
  const apiURL = process.env.REACT_APP_API;

  return (
    <Link to={"/wallet/marketplace/" + props.id}>
      <div className={style.card}>
        <img alt="NFT Card of a car" src={`${apiURL}/${props.imgFront}`} />
        {/* <div className={style.collection}>{props.collection}</div> */}
        <p>{props.title}</p>
        <p style={{ color: "#feae2e" }}>{props.price} DRIFT</p>
        <p
          style={{
            display: "flex",
            justifyContent: "space-around",
            alignItems: "center",
            margin: "",
          }}
        >
          <div className={style.detailsButton}>Details</div>
          <Link to={"/wallet/marketplace/" + props.id}>
            <div className={style.buyButton}>Buy</div>
          </Link>
        </p>
      </div>
    </Link>
  );
}
