import React, { useEffect, useState } from "react";
import MainContainer from "../assets/MainContainer";
import Title from "../assets/Title";
import { getAssetByWallet, getVouchers } from "../services/assets";
import VoucherCard from "./VoucherCard";
import styled from "styled-components";
import vouchersBanner from "../img/vouchersBanner.jpg";
import { Link } from "react-router-dom";
import { walletId } from "../common/getLoginData";

const StyledContainer = styled.div`
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
`;
export default function WalletVouchers() {
  const [fetchedVouchers, setFetchedVouchers] = useState([]);
  console.log(
    "🚀 ~ file: WalletVouchers.jsx ~ line 18 ~ WalletVouchers ~ fetchedVouchers",
    fetchedVouchers
  );
  const [filteredVouchers, setFilteredVouchers] = useState([]);

  // INIT
  useEffect(() => {
    fetchVouchers();
  }, []);
  async function fetchVouchers() {
    const fetched = await getAssetByWallet(walletId);
    const vouchers = fetched.filter((asset) => asset.voucher !== null);
    setFetchedVouchers(vouchers);
    setFilteredVouchers(vouchers);
  }
  //// FILTER INPUTS
  const RenderBrandsOptions = fetchedVouchers
    .map((voucher) => voucher.voucher.brand)
    .filter((item, index, arr) => arr.indexOf(item) === index) // filtra repeticiones);
    .map((brand) => <option value={brand}>{brand}</option>);
  /// FILTER
  const [filterBrand, setFilterBrand] = useState("all");
  const [filterSearch, setFilterSearch] = useState("");
  useEffect(() => {
    setFilteredVouchers(
      fetchedVouchers.filter(
        (voucher) =>
          (filterBrand !== "all"
            ? voucher.voucher.brand === filterBrand
            : true) &&
          (filterSearch !== ""
            ? voucher.voucher.title.toLowerCase().includes(filterSearch) ||
              voucher.voucher.brand.toLowerCase().includes(filterSearch)
            : true)
      )
    );
  }, [filterBrand, filterSearch, fetchedVouchers]);

  const RenderVoucherCards = filteredVouchers.map((voucher) => (
    <VoucherCard data={{ ...voucher }} />
  ));

  return (
    <MainContainer>
      {<Title backButton="true">YOUR VOUCHERS</Title>}

      <Link to="/wallet/marketplace?category=Voucher">
        <img alt="banner" src={vouchersBanner} style={{ width: "100%" }} />
      </Link>

      <div
        style={{
          display: "flex",
          justifyContent: "space-around",
          marginTop: "10px",
        }}
      >
        <select
          name="filterManufacturer"
          onChange={(e) => setFilterBrand(e.target.value)}
        >
          <option value="all">All brands</option>
          {RenderBrandsOptions}
        </select>
        <input
          type="text"
          placeholder="search"
          onChange={(e) => setFilterSearch(e.target.value)}
        />
      </div>
      <hr />
      <StyledContainer>{RenderVoucherCards}</StyledContainer>
    </MainContainer>
  );
}
