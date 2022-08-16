import React, { useEffect, useState } from "react";
import MainContainer from "../assets/MainContainer";
import Title from "../assets/Title";
import { getNFTCards } from "../services/assets";
import NFTCardCard from "./NFTCardCard";
import styled from "styled-components";
import { Link } from "@mui/material";

export default function WalletMarketplace() {
  const StyledContainer = styled.div`
    display: flex;
    justify-content: space-around;
    flex-wrap: wrap;
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
      <NFTCardCard
        imgFront={card.astNFTCard.imageFront}
        collection="fuelFest22LA"
        title={card.astNFTCard.name}
        price={card.astNFTCard.price}
      />
    );
  });
  return (
    <MainContainer>
      {<Title title="Marketplace" />}
      <select name="assetsFilter" onChange={(e) => console.log(e)}>
        <option value="all">All assets</option>
        <option value="drifting">Cards</option>
        <option value="guest">SuperCards</option>
        <option value="music">UberCards</option>
      </select>
      <select name="coolectionFilter" onChange={(e) => console.log(e)}>
        <option value="all">All collections</option>
        <option value="drifting">Los Angeles 2019</option>
        <option value="guest">Bogotá 2020</option>
        <option value="music">Denver 2021</option>
      </select>
      <br />
      <p>Price</p>
      <input type="number" placeholder="min" />
      <input type="number" placeholder="max" />
      <p>Mint</p>
      <input type="number" placeholder="min" />
      <input type="number" placeholder="max" />
      <hr />
      <StyledContainer>{RenderNFTCards}</StyledContainer>
    </MainContainer>
  );
}
