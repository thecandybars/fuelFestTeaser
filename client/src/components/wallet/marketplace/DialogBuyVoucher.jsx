import React, { useContext, useEffect, useState } from "react";
import { buyAssetFromWallet, getAssetById } from "../../../services/assets";
import { walletId } from "../../../common/getLoginData";
import { BoughtAssetContext } from "./index.jsx";
import styled from "styled-components";
import { Dialog } from "@mui/material";
import successfulTransactionIcon from "../../../img/successfulTransaction.svg";

const DialogContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: fit-content;
  padding: 15px;
  background-color: ${(props) => props.theme.dialogBackground};
  border: 0;
  color: #d9d9d9;
`;
const StyledHeader = styled.div`
  display: flex;
  flex-direction: column;
  align-self: flex-start;
  color: ${(props) => props.theme.yellow};
  margin-left: 25px;
  margin-bottom: 20px;
  h1 {
    font-size: 2.5rem;
  }
  h2 {
    font-size: 1.5rem;
  }
`;
const StyledImage = styled.img`
  width: 150px;
  margin: 15px auto;
`;
const StyledSummary = styled.div`
  div {
    display: flex;
    margin-bottom: 5px;
  }
  h2 {
    font-size: 24px;
  }
  h3 {
    width: 130px;
    font-size: 1.1rem;
    color: ${(props) => props.theme.white};
  }
  h5 {
    font-size: 1.1rem;
    color: ${(props) => props.theme.green};
  }
  p {
    font-family: "Oswald";
    font-size: 1.1rem;
    color: ${(props) => props.theme.yellow};
  }
`;
const StyledDescription = styled.p`
  font-size: 1rem;
  margin: 0 15px;
`;
const StyledBack = styled.p`
  font-size: 1.4rem;
  text-decoration: underline;
  font-family: "Oswald";
  margin: 0 15px;
`;
const StyledButton = styled.div`
  width: 70%;
  margin: 15px 0;
  padding: 1px 10px;
  background-color: ${(props) => props.theme.green};
  color: white;
  border-radius: 20px;
  font-family: "Oswald";
  font-size: 1.4rem;
  text-align: center;
`;
const StyledConfirmTransaction = styled.div`
  padding: 20px;
  background-color: ${(props) => props.theme.dialogBackground};
  display: flex;
  flex-direction: column;
  align-items: center;
  img {
    width: 70%;
  }
  h2 {
    font-size: 2.7rem;
    color: ${(props) => props.theme.yellow};
    text-align: center;
    margin: 15px 0;
  }
  p {
    color: ${(props) => props.theme.white};
    font-family: "Oswald";
    font-size: 1.3rem;
  }
  p span {
    color: ${(props) => props.theme.yellow};
  }
  div {
    width: 40%;
    margin: 15px 0;
    padding: 1px 10px;
    background-color: ${(props) => props.theme.red};
    color: ${(props) => props.theme.white};
    border-radius: 20px;
    font-family: "Oswald";
    font-size: 1.5rem;
    text-align: center;
  }
`;

export default function DialogBuyVoucher(props) {
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
  const boughtAsset = useContext(BoughtAssetContext);
  const handleConfirmBuyClose = () => {
    setConfirmBuyOpen(false);
    // boughtAsset tells WalletMarketplace an asset was bought and it needs to re-render.
    // Its usefull when asset is bought directly from the Buy button on the card. If user instead clicks the card first
    // it opens the details view, wich is a link outside de useContext reach, so boughAsset function is not present (and not needed)
    // and throws and error. That´s why it needs to be checked before executing it.
    boughtAsset && boughtAsset(true);
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
  return (
    Object.keys(fetchedAssetData).length !== 0 && (
      <DialogContainer>
        <StyledHeader>
          <h1>Details</h1>
          <h2>{`${fetchedAssetData.assetData.title}`}</h2>
        </StyledHeader>
        <StyledSummary>
          <div>
            <h3>SaleID</h3>
            <p>¿¿¿???</p>
          </div>
          <div>
            <h3>Vendor</h3>
            <p>{`${fetchedAssetData.seller.firstName} ${fetchedAssetData.seller.lastName}`}</p>
          </div>
          <div>
            <h3>Location</h3>
            <p>See location on map</p>
          </div>

          <div>
            <h3>Price</h3>
            <h5>{`${fetchedAssetData.assetData.price} DRIFT`}</h5>
          </div>
        </StyledSummary>
        <StyledImage
          alt="Preview voucher"
          src={`${apiURL}/${fetchedAssetData.assetData.image}`}
        />
        <StyledDescription>{`${fetchedAssetData.assetData.description}`}</StyledDescription>
        <StyledButton
          onClick={handleBuy}
        >{`Buy for ${fetchedAssetData.assetData.price} DRIFT`}</StyledButton>
        <StyledBack>BACK</StyledBack>
        {/* CONFIRM BUY */}
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
      </DialogContainer>
    )
  );
}
