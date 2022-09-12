import React, { useEffect, useState, createContext } from "react";
import Title from "../assets/Title";
import { getAllAssets } from "../services/assets";
import NFTCardCard from "./WalletMarketplace/NFTCardCard";
import VoucherCard from "./WalletMarketplace/VoucherCard";
import styled from "styled-components";
import MainContainer from "../assets/MainContainer";
import { useSearchParams } from "react-router-dom";

// STYLED COMPONENTS
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

// ASSET HAS BEEN BOUGHT TRACKING
export const BoughtAssetContext = createContext();

export default function WalletMarketplace() {
  const [fetchedAssets, setFetchedAssets] = useState([]);
  const [filteredAssets, setFilteredAssets] = useState([]);

  // ASSET HAS BEEN BOUGHT TRACKING (TO  TRIGGER RENDER AFTER ASSET HAS BEEN BOUGHT)
  const [boughtAsset, setBoughtAsset] = useState(false);
  const handleBoughAsset = (wasBought) => setBoughtAsset(wasBought);
  useEffect(() => {
    fetchAssets();
    setBoughtAsset(false);
  }, [boughtAsset]);

  useEffect(() => {
    fetchAssets();
  }, []);
  async function fetchAssets() {
    const fetched = await getAllAssets();
    setFetchedAssets(fetched);
    setFilteredAssets(fetched);
  }

  // RENDER CARDS : nfts / vouchers
  const RenderNFTAssets = filteredAssets.map((asset) => {
    if (asset.assetCategory.table === "AstNFTCard")
      return <NFTCardCard key={asset.id} data={asset} />;
    if (asset.assetCategory.table === "Voucher")
      return <VoucherCard key={asset.id} data={asset} />;
    return {};
  });

  // FILTERS
  const [searchParams, setSearchParams] = useSearchParams();
  console.log(
    "🚀 ~ file: WalletMarketplace.jsx ~ line 90 ~ WalletMarketplace ~ searchParams",
    searchParams.get("category")
  );
  const initFilterCategory =
    searchParams.get("category") === null
      ? "all"
      : searchParams.get("category");

  const [filterCategory, setFilterCategory] = useState(initFilterCategory);
  const [filterSearch, setFilterSearch] = useState("");
  const [filterPrice, setFilterPrice] = useState({
    min: "",
    max: "",
  });
  const [filterMint, setFilterMint] = useState({
    min: "",
    max: "",
  });
  // apply filters
  useEffect(() => {
    const NFTCards = fetchedAssets
      .filter((asset) => asset.assetCategory.title === "NFT Card")
      .filter(
        (card) =>
          (filterCategory !== "all"
            ? card.assetCategory.title === filterCategory
            : true) &&
          (filterSearch !== ""
            ? card.astNFTCard.name.toLowerCase().includes(filterSearch)
            : true) &&
          (filterPrice.min !== ""
            ? card.astNFTCard.price >= filterPrice.min
            : true) &&
          (filterPrice.max !== ""
            ? card.astNFTCard.price <= filterPrice.max
            : true) &&
          (filterMint.min !== ""
            ? card.astNFTCard.mintNum >= filterMint.min
            : true) &&
          (filterMint.max !== ""
            ? card.astNFTCard.mintNum <= filterMint.max
            : true)
      );
    const vouchers = fetchedAssets
      .filter((asset) => asset.assetCategory.title === "Voucher")
      .filter(
        (voucher) =>
          (filterCategory !== "all"
            ? voucher.assetCategory.title === filterCategory
            : true) &&
          (filterSearch !== ""
            ? voucher.voucher.title.toLowerCase().includes(filterSearch) ||
              voucher.voucher.brand.toLowerCase().includes(filterSearch)
            : true) &&
          (filterPrice.min !== ""
            ? voucher.voucher.price >= filterPrice.min
            : true) &&
          (filterPrice.max !== ""
            ? voucher.voucher.price <= filterPrice.max
            : true)
      );
    setFilteredAssets([...NFTCards, ...vouchers]);
  }, [filterCategory, filterSearch, filterPrice, filterMint, fetchedAssets]);

  // FILTER CATEGORY OPTIONS
  const RenderCategoryFilterOptions = fetchedAssets
    .map((asset) => asset.assetCategory.title)
    .filter((category, index, arr) => arr.indexOf(category) === index)
    .map((category) => (
      <option key={category} value={category}>
        {category}
      </option>
    ));

  return (
    <BoughtAssetContext.Provider value={handleBoughAsset}>
      <MainContainer>
        {<Title title="NFT MARKETPLACE" backButton="true" />}
        <div style={{ display: "flex", padding: "5px 0" }}>
          {/* ASSET CATEGORY FILTER */}
          <StyledAssetFilter
            name="assetsFilter"
            onChange={(e) => setFilterCategory(e.target.value)}
            defaultValue="Voucher"
          >
            <option value="all">All </option>
            {RenderCategoryFilterOptions}
          </StyledAssetFilter>
          {/* SEARCH TEXT STRING FILTER */}
          <StyledAssetSearch
            type="text"
            onChange={(e) => {
              setFilterSearch(e.target.value);
            }}
          ></StyledAssetSearch>
        </div>
        <div>
          {/* PRICE FILTER */}
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
          {/* MINT FILTER */}
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
        {/* CARDS RENDER */}
        <StyledContainer>{RenderNFTAssets}</StyledContainer>
      </MainContainer>
    </BoughtAssetContext.Provider>
  );
}
