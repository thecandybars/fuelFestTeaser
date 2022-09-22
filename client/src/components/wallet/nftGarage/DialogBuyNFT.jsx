import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { getAssetById, buyAssetFromWallet } from "../../../services/assets";
import { walletId } from "../../../common/getLoginData";
import { Dialog } from "@mui/material";
import successfulTransactionIcon from "../../../img/successfulTransaction.svg";

const ModalContainer = styled.div`
  /* margin: 20px; */
  height: fit-content;
  padding: 15px;
  background-color: rgba(10, 10, 10, 0.97);
  border: 0;
  color: #d9d9d9;
  /* border: 1px solid red; */
`;
const StyledFirstLine = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  h1 {
    color: #feae2e;
  }
  img {
    width: 100px;
  }
`;
const StyledSummary = styled.div`
  h2 {
    font-size: 24px;
  }
  div {
    display: flex;
    margin-bottom: 5px;
  }
  h3 {
    width: 130px;
    font-size: 1.1rem;
  }
  p {
    font-family: "Oswald";
    font-size: 1.1rem;
    color: #feae2e;
  }
`;
const StyledBottomLine = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  p {
    font-family: "Oswald";
    font-size: 1.1rem;
  }
`;
const StyledButton = styled.div`
  width: 70%;
  margin: 15px 0;
  padding: 1px 10px;
  background-color: #00703d;
  color: white;
  border-radius: 20px;
  font-family: "Oswald";
  font-size: 18px;
  text-align: center;
`;
const StyledConfirmTransaction = styled.div`
  padding: 20px;
  background-color: black;
  display: flex;
  flex-direction: column;
  align-items: center;
  img {
    width: 70%;
  }
  h2 {
    font-size: 2.7rem;
    color: #feae2e;
    text-align: center;
    margin: 15px 0;
  }
  p {
    color: #d9d9d9;
    font-family: "Oswald";
    font-size: 1.3rem;
  }
  p span {
    color: #feae2e;
  }
  div {
    width: 40%;
    margin: 15px 0;
    padding: 1px 10px;
    background-color: red;
    color: white;
    border-radius: 20px;
    font-family: "Oswald";
    font-size: 1.5rem;
    text-align: center;
  }
`;

export default function ModalBuyNFT(props) {
  const apiURL = process.env.REACT_APP_API;

  // INIT
  const [fetchedAssetData, setFetchedAssetData] = useState({});
  useEffect(() => {
    fetchAssetData(props.assetId);
  }, [props.assetId]);
  async function fetchAssetData(assetId) {
    setFetchedAssetData(await getAssetById(assetId));
  }

  // BUY
  const [confirmBuyOpen, setConfirmBuyOpen] = useState(false);
  const handleConfirmBuyClose = () => {
    setConfirmBuyOpen(false);
    props.closeDialog();
  };

  async function handleBuy() {
    const response = await buyAssetFromWallet(
      fetchedAssetData.assetData.assetId,
      walletId
    );
    if (response.status === 200) {
      setConfirmBuyOpen(true);
    }
  }

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
  return (
    Object.keys(fetchedAssetData).length !== 0 && (
      <ModalContainer>
        <StyledFirstLine>
          <h1>Buy Listing</h1>
          <img
            alt="Preview NFT"
            src={`${apiURL}/${fetchedAssetData.assetData.imageFront}`}
          />
        </StyledFirstLine>
        <StyledSummary>
          <h2>Summary</h2>
          <div>
            <h3>Sale ID</h3>
            <p>¿¿¿???</p>
          </div>
          <div>
            <h3>Collection</h3>
            <p>{fetchedAssetData.festival.short}</p>
          </div>
          <div>
            <h3>NFT Name</h3>
            <p>{fetchedAssetData.assetData.name}</p>
          </div>
          <div>
            <h3>NFT ID</h3>
            <p>{fetchedAssetData.assetData.id.slice(20)}</p>
          </div>
          <div>
            <h3>Mint number</h3>
            <p>{`${fetchedAssetData.assetData.mintNum} of ${fetchedAssetData.assetData.mintTotal} (max. ${fetchedAssetData.assetData.mintMax})`}</p>
          </div>
          <div>
            <h3>Backed Tokens</h3>
            <p>¿¿¿???</p>
          </div>
          <br />
          <div>
            <h3>Seller</h3>
            <p>{`${fetchedAssetData.seller.firstName} ${fetchedAssetData.seller.lastName}`}</p>
          </div>
          <div>
            <h3>Price</h3>
            <p>{`${fetchedAssetData.assetData.price} DRIFT`}</p>
          </div>
        </StyledSummary>
        <StyledBottomLine>
          <StyledButton
            onClick={handleBuy}
          >{`Buy for ${fetchedAssetData.assetData.price} DRIFT`}</StyledButton>
          <p>Make offer</p>
        </StyledBottomLine>
        <Dialog open={confirmBuyOpen} onClose={handleConfirmBuyClose}>
          <StyledConfirmTransaction>
            <img alt="Transaction Successful" src={successfulTransactionIcon} />
            <h2>Transaction Successful!</h2>
            <p>
              View Transaction: <span>87346587</span>
            </p>
            <div onClick={handleConfirmBuyClose}>Close</div>
          </StyledConfirmTransaction>
        </Dialog>
      </ModalContainer>
    )
  );
}
