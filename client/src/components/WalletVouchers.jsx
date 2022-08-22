import React, { useEffect, useState } from "react";
import MainContainer from "../assets/MainContainer";
import Title from "../assets/Title";
import { getVouchers } from "../services/assets";
import VoucherCard from "./VoucherCard";
import styled from "styled-components";
import vouchersBanner from "../img/vouchersBanner.jpg";
import placeholder1 from "../img/vouchersPlaceholder1.jpg";
import placeholder2 from "../img/vouchersPlaceholder2.jpg";
import placeholder3 from "../img/vouchersPlaceholder3.jpg";

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

  const images = [placeholder1, placeholder2, placeholder3];
  const [counter, setCounter] = useState(0);
  const [image, setImage] = useState(images[0]);
  function handleImage() {
    setCounter((prev) => (prev === 2 ? 0 : prev + 1));
    setImage(images[counter]);
  }

  return (
    <MainContainer>
      {<Title title="VOUCHERS" backButton="true" />}

      <img alt="phd" src={image} onClick={handleImage} />

      {/* <img alt="banner" src={vouchersBanner} style={{ width: "100%" }} />
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
      <StyledContainer>{RenderVoucherCards}</StyledContainer> */}
    </MainContainer>
  );
}
