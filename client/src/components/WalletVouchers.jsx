import React, { useEffect, useState } from "react";
import MainContainer from "../assets/MainContainer";
import Title from "../assets/Title";
import { getVouchers } from "../services/assets";
import VoucherCard from "./VoucherCard";
import styled from "styled-components";

export default function WalletVouchers() {
  const StyledContainer = styled.div`
    display: flex;
    justify-content: space-around;
    flex-wrap: wrap;
  `;
  const [fetchedVouchers, setFetchedVouchers] = useState([]);
  const [filteredVouchers, setFilteredVouchers] = useState([]);

  useEffect(() => {
    fetchVouchers();
  }, []);
  async function fetchVouchers() {
    const fetched = await getVouchers();
    setFetchedVouchers(fetched);
    setFilteredVouchers(fetched);
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
    console.log("holas");
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
  }, [filterBrand, filterSearch]);

  const RenderVoucherCards = filteredVouchers.map((voucher) => (
    <VoucherCard data={{ ...voucher }} />
  ));
  return (
    <MainContainer>
      {<Title title="Vouchers" backButton="true" />}
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
