import React, { useEffect, useState } from "react";
import WalletContainer from "../assets/WalletContainer";
import Title from "../assets/Title";
import { getNFTCards } from "../services/assets";
import NFTCardCard from "./NFTCardCard";
import styled from "styled-components";
import { Link } from "@mui/material";
import { style } from "@mui/system";

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
export default function WalletMarketplace() {
  const [fetchedCards, setFetchedCards] = useState([]);
  console.log(
    "🚀 ~ file: WalletMarketplace.jsx ~ line 54 ~ WalletMarketplace ~ fetchedCards",
    fetchedCards
  );
  const [filteredCards, setFilteredCards] = useState([]);
  useEffect(() => {
    fetchCards();
  }, []);
  async function fetchCards() {
    const fetched = await getNFTCards();
    setFetchedCards(fetched);
    setFilteredCards(fetched);
  }
  // CARDS
  const RenderNFTCards = filteredCards.map((card) => {
    return (
      <>
        <NFTCardCard
          key={card.asset.id}
          id={card.asset.id}
          imgFront={card.asset.astNFTCard.imageFront}
          collection={card.collection.short}
          title={card.asset.astNFTCard.name}
          price={card.asset.astNFTCard.price}
        />
      </>
    );
  });

  // FILTERS
  const [filterCategory, setFilterCategory] = useState("all");
  const [filterSearch, setFilterSearch] = useState("");
  const [filterPrice, setFilterPrice] = useState({
    min: "",
    max: "",
  });
  const [filterMint, setFilterMint] = useState({
    min: "",
    max: "",
  });
  // card:
  // asset:
  // astNFTCard:
  // assetId: "dbb148fa-9031-4393-9fc0-1d0974d24aea"
  // burnable: true
  // createdAt: "2022-08-23T16:04:49.503Z"
  // id: "543691f2-9c20-4166-99bd-7bc906e35f0a"
  // imageBack: "uploads/NFTCard/NFTCard-1660680037824.png"
  // imageFront: "uploads/NFTCard/NFTCard-1660680119281.jpeg"
  // mintMax: 3
  // mintNum: 1
  // mintTotal: 3
  // name: "Nissan GT-R 'Frank 6.0'"
  // owner: "Oliver Atom"
  // price: 200
  // templateId: "c98fc7a9-2824-4a62-a543-56b9dca0a176"
  // transferable: true
  // updatedAt: "2022-08-23T16:04:49.503Z"
  // [[Prototype]]: Object
  // categoryId: "8664b015-7972-408a-bf8d-1ef55b0da2fc"
  // createdAt: "2022-08-23T16:04:49.492Z"
  // id: "dbb148fa-9031-4393-9fc0-1d0974d24aea"
  // isListed: true
  // updatedAt: "2022-08-23T16:04:49.492Z"
  // walletId: "147a9663-e722-4667-b54e-44b5817e0bd9"
  // [[Prototype]]: Object
  // collection:
  // createdAt: "2022-08-23T16:04:49.306Z"
  // dateEnd: "2022-12-31T05:00:00.000Z"
  // dateStart: "2022-01-01T05:00:00.000Z"
  // id: "40f41d79-21ae-4db8-8d1d-bb831eabc337"
  // location: "Test City"
  // short: "FuelFestTest22"
  // title: "FuelFest Test edition"
  // updatedAt: "2022-08-23T16:04:49.306Z"
  useEffect(() => {
    setFilteredCards(
      fetchedCards.filter(
        (card) =>
          (filterSearch !== ""
            ? card.asset.astNFTCard.name.toLowerCase().includes(filterSearch)
            : true) &&
          (filterPrice.min !== ""
            ? card.asset.astNFTCard.price >= filterPrice.min
            : true) &&
          (filterPrice.max !== ""
            ? card.asset.astNFTCard.price <= filterPrice.max
            : true) &&
          (filterMint.min !== ""
            ? card.asset.astNFTCard.mintNum >= filterMint.min
            : true) &&
          (filterMint.max !== ""
            ? card.asset.astNFTCard.mintNum <= filterMint.max
            : true)
      )
    );
  }, [filterCategory, filterSearch, filterPrice, filterMint]);

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
        <StyledAssetSearch
          type="text"
          onChange={(e) => {
            setFilterSearch(e.target.value);
          }}
        />
      </div>
      <div>
        <StyledPriceRow>
          <p>PRICE</p>
          <input
            type="number"
            placeholder="min"
            onChange={(e) =>
              setFilterPrice((prev) => ({ ...prev, min: e.target.value }))
            }
          />
          <input
            type="number"
            placeholder="max"
            onChange={(e) =>
              setFilterPrice((prev) => ({ ...prev, max: e.target.value }))
            }
          />
        </StyledPriceRow>
        <StyledPriceRow>
          <p>MINT</p>
          <input
            type="number"
            placeholder="min"
            onChange={(e) =>
              setFilterMint((prev) => ({ ...prev, min: e.target.value }))
            }
          />
          <input
            type="number"
            placeholder="max"
            onChange={(e) =>
              setFilterMint((prev) => ({ ...prev, max: e.target.value }))
            }
          />
        </StyledPriceRow>
      </div>

      <StyledContainer>{RenderNFTCards}</StyledContainer>
    </WalletContainer>
  );
}
