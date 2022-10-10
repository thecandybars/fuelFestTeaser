import React, { useContext, useEffect, useState } from "react";
import { buyAssetFromWallet, getAssetById } from "../../../services/assets";
import { walletId } from "../../../common/getLoginData";
import { BoughtAssetContext } from "./index.jsx";
import styled from "styled-components";
import { Dialog } from "@mui/material";
import successfulTransactionIcon from "../../../img/successfulTransaction.svg";

const DialogContainer = styled.div`
  height: fit-content;
  padding: 15px;
  background-color: ${(props) => props.theme.dialogBackground};
  border: 0;
  color: ${(props) => props.theme.white};
`;
const StyledFirstLine = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  h1 {
    color: ${(props) => props.theme.green};
  }
  img {
    width: 100px;
  }
  video {
    width: 100px;
  }
`;
const StyledSummary = styled.div`
  h2 {
    font-size: 1.5rem;
    margin-bottom: 0.5rem;
  }
  div {
    display: flex;
    margin-bottom: 5px;
  }
  h3 {
    width: 40%;
    font-size: 1.1rem;
    color: ${(props) => props.theme.white};
  }
  p {
    width: 60%;
    font-family: "Oswald";
    font-size: 1.1rem;
    color: ${(props) => props.theme.yellow};
  }
  h5 {
    width: 130px;
    width: 60%;
    font-size: 1.1rem;
    color: ${(props) => props.theme.green};
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
  background-color: ${(props) => props.theme.green};
  color: white;
  border-radius: 20px;
  font-family: "Oswald";
  font-size: 18px;
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
        <StyledFirstLine>
          <h1>Buy Listing</h1>
          <img
            alt={props.title}
            src={`${apiURL}/${fetchedAssetData.assetData.image}`}
          />
        </StyledFirstLine>
        <StyledSummary>
          <h2>Summary</h2>
          <div>
            <h3>Brand</h3>
            <p>{`${fetchedAssetData.seller.firstName} ${fetchedAssetData.seller.lastName}`}</p>
          </div>
          <div>
            <h3>ID</h3>
            <p>{`${fetchedAssetData.assetData.assetId}`}</p>
          </div>
          <div>
            <h3>Description</h3>
            <p>{`${fetchedAssetData.assetData.description}`}</p>
          </div>
          <br />
          <div>
            <h3>Price</h3>
            <h5>{`${fetchedAssetData.assetData.price} DRIFT`}</h5>
          </div>
        </StyledSummary>

        <StyledBottomLine>
          <StyledButton
            onClick={handleBuy}
          >{`Buy for ${fetchedAssetData.assetData.price} DRIFT`}</StyledButton>
          <p>Make offer</p>
        </StyledBottomLine>
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

      // <DialogContainer>
      //   <StyledHeader>
      //     <h1>Details</h1>
      //     <h2>{`${fetchedAssetData.assetData.title}`}</h2>
      //   </StyledHeader>
      //   <StyledSummary>
      //     <div>
      //       <h3>SaleID</h3>
      //       <p>¿¿¿???</p>
      //     </div>
      //     <div>
      //       <h3>Vendor</h3>
      //       <p>{`${fetchedAssetData.seller.firstName} ${fetchedAssetData.seller.lastName}`}</p>
      //     </div>
      //     <div>
      //       <h3>Location</h3>
      //       <p>See location on map</p>
      //     </div>

      //     <div>
      //       <h3>Price</h3>
      //       <h5>{`${fetchedAssetData.assetData.price} DRIFT`}</h5>
      //     </div>
      //   </StyledSummary>
      //   <StyledImage
      //     alt="Preview voucher"
      //     src={`${apiURL}/${fetchedAssetData.assetData.image}`}
      //   />
      //   <StyledDescription>{`${fetchedAssetData.assetData.description}`}</StyledDescription>
      //   <StyledButton
      //     onClick={handleBuy}
      //   >{`Buy for ${fetchedAssetData.assetData.price} DRIFT`}</StyledButton>
      //   <StyledBack>BACK</StyledBack>
      //   {/* CONFIRM BUY */}
      //   <Dialog open={confirmBuyOpen} onClose={handleConfirmBuyClose}>
      //     <StyledConfirmTransaction>
      //       <img alt="Transaction Successful" src={successfulTransactionIcon} />
      //       <h2>Transaction Successful!</h2>
      //       <p>
      //         View Transaction: <span>87346587</span>
      //       </p>
      //       <div onClick={handleConfirmBuyClose}>Close</div>
      //     </StyledConfirmTransaction>
      //   </Dialog>
      // </DialogContainer>
    )
  );
}
