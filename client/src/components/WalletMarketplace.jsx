import React, { useEffect, useState } from "react";
import WalletContainer from "../assets/WalletContainer";
import Title from "../assets/Title";
import { getNFTCards } from "../services/assets";
import NFTCardCard from "./NFTCardCard";
import styled from "styled-components";
import { Link } from "@mui/material";
import { style } from "@mui/system";

export default function WalletMarketplace() {
  const StyledContainer = styled.div`
    display: flex;
    justify-content: space-around;
    flex-wrap: wrap;
  `;
  const StyledAssetFilter = styled.select`
    border: 1px solid #d9d9d9;
    border-radius: 5px;
    color: #d9d9d9;
    width: 40%;
    padding: 2px;
    background-color: transparent;
  `;
  const StyledAssetSearch = styled.input`
    border: 1px solid #d9d9d9;
    border-radius: 5px;
    color: #d9d9d9;
    width: 60%;
    margin-left: 5px;
    padding: 2px;
    background-color: transparent;
  `;
  const StyledPriceRow = styled.div`
    display: flex;
    width: 75%;
    margin: 0 0 0 auto;
    padding: 2px 0;
    p {
      font-family: "Oswald";
      color: #feae2e;
      width: 70px;
    }
    input {
      border: 1px solid #d9d9d9;
      border-radius: 5px;
      color: #d9d9d9;
      width: 60%;
      margin-left: 5px;
      padding: 2px;
      background-color: transparent;
    }
  `;

  const [fetchedCards, setFetchedCards] = useState([]);
  const [filteredCards, setFilteredCards] = useState([]);
  useEffect(() => {
    fetchCards();
  }, []);
  async function fetchCards() {
    const fetched = await getNFTCards();
    setFetchedCards(fetched);
    setFilteredCards(fetched);
  }
  const RenderNFTCards = filteredCards.map((card) => {
    return (
      <>
        <NFTCardCard
          key={card.asset.id}
          imgFront={card.asset.astNFTCard.imageFront}
          collection={card.collection.short}
          title={card.asset.astNFTCard.name}
          price={card.asset.astNFTCard.price}
        />
      </>
    );
  });
  return (
    <WalletContainer>
      {<Title title="NFT MARKETPLACE" backButton="true" />}
      <div style={{ display: "flex", padding: "5px 0" }}>
        <StyledAssetFilter name="assetsFilter" onChange={(e) => console.log(e)}>
          <option value="all">All </option>
          <option value="drifting">NFT Cards</option>
          {/* <option value="guest">Vouchers</option> */}
          <option value="music">Others</option>
        </StyledAssetFilter>
        <StyledAssetSearch type="text" />
      </div>
      <div>
        <StyledPriceRow>
          <p>PRICE</p>
          <input type="number" placeholder="min" />
          <input type="number" placeholder="max" />
        </StyledPriceRow>
        <StyledPriceRow>
          <p>MINT</p>
          <input type="number" placeholder="min" />
          <input type="number" placeholder="max" />
        </StyledPriceRow>
      </div>

      <StyledContainer>{RenderNFTCards}</StyledContainer>
    </WalletContainer>
  );
}
