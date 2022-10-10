import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { getAssetById, editAssetById } from "../../../services/assets";
import { Dialog } from "@mui/material";
import successfulTransactionIcon from "../../../img/successfulTransaction.svg";

const ModalContainer = styled.div`
  height: fit-content;
  padding: 25px 45px;
  background-color: rgba(10, 10, 10, 0.97);
  border: 0;
  color: ${(props) => props.theme.white};
  font-family: "Oswald";
`;
const StyledFirstLine = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 15px;
  div {
    display: flex;
    align-items: stretch;
    flex-direction: column;
    justify-content: space-between;
  }
  h1 {
    color: ${(props) => props.theme.yellow};
    margin-left: -15px;
  }
  img {
    width: 100px;
  }
`;
const StyledSummary = styled.div`
  margin-bottom: 25px;
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
    color: ${(props) => props.theme.yellow};
  }
`;
const StyledPrice = styled.div`
  display: flex;
  font-size: 1.2rem;
  p {
    color: ${(props) => props.theme.red};
  }
  input {
    margin: 0 5px;
    width: 90px;
  }
  span {
    color: ${(props) => props.theme.yellow};
  }
`;
const StyledListing = styled.div`
  display: flex;
  margin-top: 15px;
  font-size: 1.3rem;
  input {
    margin: 0;
    margin-right: 5px;
    width: 25px;
    background-color: ${(props) => props.theme.green};
  }
  p {
    color: ${(props) => props.theme.white};
  }
`;
const StyledBottomLine = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 25px;
  font-size: 1.3rem;
`;
const StyledButtonYes = styled.div`
  width: 80%;
  margin: 5px 0;
  padding: 1px 10px;
  background-color: ${(props) => props.theme.green};
  color: white;
  border-radius: 20px;
  font-family: "Oswald";
  text-align: center;
`;
const StyledButtonNo = styled.div`
  width: 70%;
  margin: 5px 0;
  padding: 1px 10px;
  text-decoration: underline;
  /* background-color: ${(props) => props.theme.red}; */
  color: white;
  border-radius: 20px;
  font-family: "Oswald";
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

export default function DialogSellNFT(props) {
  const apiURL = process.env.REACT_APP_API;

  // INIT
  const [fetchedAssetData, setFetchedAssetData] = useState({});

  useEffect(() => {
    fetchAssetData(props.assetId);
  }, [props.assetId]);
  async function fetchAssetData(assetId) {
    setFetchedAssetData(await getAssetById(assetId));
  }

  // EDIT
  const [confirmBuyOpen, setConfirmBuyOpen] = useState(false);
  const handleConfirmBuyClose = () => {
    setConfirmBuyOpen(false);
    props.closeDialog();
  };

  async function handleEdit() {
    const response = await editAssetById(
      fetchedAssetData.assetData.assetId,
      isListed,
      price
    );
    props.closeDialog();

    // if (response.status === 200) {
    //   setConfirmBuyOpen(true);
    // }
  }

  // EDIATBLE FIELDS
  const [isListed, setIsListed] = useState(false);
  const [price, setPrice] = useState(0);

  useEffect(() => {
    if (Object.keys(fetchedAssetData).length > 0) {
      setIsListed(fetchedAssetData.asset.isListed);
      setPrice(fetchedAssetData.assetData.price);
    }
  }, [fetchedAssetData]);
  // HANDLE FIELDS
  const handlePriceChange = (val) => {
    // const extractNumbers = /\d$/g;
    // setPrice(val.match(extractNumbers));
    setPrice(val);
  };
  return (
    Object.keys(fetchedAssetData).length !== 0 && (
      <ModalContainer>
        <StyledFirstLine>
          <div>
            <h1>Sell Listingg</h1>

            <h2>Summary</h2>
          </div>
          {fetchedAssetData.assetData.imageFrontType === "image" && (
            <img
              alt={props.title}
              src={`${apiURL}/${fetchedAssetData.assetData.imageFront}`}
            />
          )}
          {fetchedAssetData.assetData.imageFrontType === "video" && (
            <video autoPlay loop>
              <source
                src={`${apiURL}/${fetchedAssetData.assetData.imageFront}`}
                type="video/mp4"
              />
            </video>
          )}
          {/* <img
            alt="Preview NFT"
            src={`${apiURL}/${fetchedAssetData.assetData.imageFront}`}
          /> */}
        </StyledFirstLine>
        <StyledSummary>
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
            <h3>Seller</h3>
            <p>{`${fetchedAssetData.seller.firstName} ${fetchedAssetData.seller.lastName}`}</p>
          </div>
        </StyledSummary>
        <StyledPrice>
          <p>PRICE</p>
          <input
            type="number"
            value={price}
            onChange={(e) => handlePriceChange(e.target.value)}
          />
          <span>DRIFT</span>
        </StyledPrice>
        <StyledListing>
          <input
            checked={isListed}
            type="checkbox"
            onChange={(e) => setIsListed(e.target.checked)}
          />
          <p>Listed on Market</p>
        </StyledListing>

        <StyledBottomLine>
          <StyledButtonYes onClick={handleEdit}>
            {isListed ? `Sell for ${price} DRIFT` : "CONFIRM"}
          </StyledButtonYes>
          <StyledButtonNo onClick={handleEdit}>{`CANCEL`}</StyledButtonNo>
        </StyledBottomLine>

        {/* DO WE NEED A CONFIRMATION OR CANCEL DIALOG ?? */}
        <Dialog open={confirmBuyOpen} onClose={handleConfirmBuyClose}>
          <StyledConfirmTransaction>
            <img alt="Transaction Successful" src={successfulTransactionIcon} />
            <h2>Your NFT is now available for </h2>
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
