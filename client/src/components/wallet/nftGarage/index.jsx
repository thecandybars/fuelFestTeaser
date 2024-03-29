import React, { useEffect, useState } from "react";
import Title from "../../_shared/Title";
import { getAssetByWallet } from "../../../services/assets";
import NFTCardCard from "./NFTCarCard";
import VoucherCard from "./VoucherCard";
import styled from "styled-components";
import { walletId } from "../../../common/getLoginData";
import MainContainer from "../../_shared/MainContainer";
import NftVoucherCard from "./NftVoucherCard";

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
  color: "secondary";
  width: 60%;
  margin-left: 5px;
  padding: 2px;
  background-color: transparent;
`;
// const StyledPriceRow = styled.div`
//   display: flex;
//   width: 75%;
//   margin: 0 0 0 auto;
//   padding: 2px 0;
//   p {
//     font-family: "Oswald";
//     color: #feae2e;
//     width: 70px;
//   }
//   input {
//     border: 1px solid #d9d9d9;
//     border-radius: 5px;
//     color: #d9d9d9;
//     width: 60%;
//     margin-left: 5px;
//     padding: 2px;
//     background-color: transparent;
//   }
// `;
export default function WalletMarketplace() {
  const [fetchedAssets, setFetchedAssets] = useState([]);
  const [filteredAssets, setFilteredAssets] = useState([]);

  const [reload, setReload] = useState(false);
  const handleReload = (reload) => setReload(reload);
  useEffect(() => {
    fetchAssets();
    setReload(false);
  }, [reload]);
  async function fetchAssets() {
    const fetched = await getAssetByWallet(walletId);
    setFetchedAssets(fetched);
    setFilteredAssets(fetched);
  }

  // RENDER CARDS : nfts / vouchers
  const RenderNFTAssets = filteredAssets.map((asset) => {
    if (asset.assetCategory.table === "AstNFTCard")
      return (
        <NFTCardCard key={asset.id} data={asset} handleReload={handleReload} />
      );
    if (asset.assetCategory.table === "Voucher")
      return (
        <NftVoucherCard
          key={asset.id}
          data={asset}
          handleReload={handleReload}
        />
      );
    return {};
  });

  // FILTERS
  const [filterCategory, setFilterCategory] = useState("all");
  const [filterSearch, setFilterSearch] = useState("");
  const [filterPrice] = useState({
    min: "",
    max: "",
  });
  const [filterMint] = useState({
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
            ? card.astNFTCard.name
                .toLowerCase()
                .includes(filterSearch.toLowerCase())
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
    <MainContainer>
      {<Title backButton="true">NFT GARAGE</Title>}
      <div style={{ display: "flex", padding: "5px 0" }}>
        {/* ASSET CATEGORY FILTER */}
        <StyledAssetFilter
          name="assetsFilter"
          onChange={(e) => setFilterCategory(e.target.value)}
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
        {/* <StyledPriceRow>
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
          </StyledPriceRow> */}
        {/* MINT FILTER */}
        {/* <StyledPriceRow>
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
          </StyledPriceRow> */}
      </div>
      {/* CARDS RENDER */}
      <StyledContainer>{RenderNFTAssets}</StyledContainer>
    </MainContainer>
  );
}
