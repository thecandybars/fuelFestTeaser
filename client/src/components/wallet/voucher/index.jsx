// DEMO PLACEHOLDERS VERSION
// import React, { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import MainContainer from "../assets/MainContainer";
// import Title from "../assets/Title";
// import placeholder1 from "../img/vouchersPlaceholder1.jpg";
// import placeholder2 from "../img/vouchersPlaceholder2.jpg";
// import placeholder3 from "../img/vouchersPlaceholder3.jpg";
// import vouchersBanner from "../img/vouchersBanner.jpg";

// export default function WalletVoting() {
//   const images = [placeholder1, placeholder2, placeholder3];
//   const [counter, setCounter] = useState(0);
//   const [image, setImage] = useState(images[0]);

//   useEffect(() => {
//     setImage(images[counter]);
//   }, [counter]);
//   return (
//     <MainContainer>
//       {<Title backButton="true">YOUR VOUCHERS</Title>}

//       <Link to="/wallet/marketplace?category=Voucher">
//         <img alt="banner" src={vouchersBanner} style={{ width: "100%" }} />
//       </Link>
//       <img
//         alt="phd"
//         src={image}
//         onClick={() => setCounter((prev) => (prev === 2 ? 0 : prev + 1))}
//       />
//     </MainContainer>
//   );
// }

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import MainContainer from "../../_shared/MainContainer";
import Title from "../../_shared/Title";
import styled from "styled-components";
import vouchersBanner from "../../../img/vouchersBanner.jpg";
import { Link } from "react-router-dom";
import { walletId } from "../../../common/getLoginData";
import { getVouchersByWallet } from "../../../services/voucher";
import NftCard from "../../_shared/NftCard";
import { theme } from "../../../common/theme";
import DialogQrRedeemVoucher from "./DialogQrRedeemVoucher";

const StyledContainer = styled.div`
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
`;
export default function WalletVouchers() {
  const apiURL = process.env.REACT_APP_API;
  const navigate = useNavigate();

  // INIT
  const [fetchedVouchers, setFetchedVouchers] = useState([]);
  const [filteredVouchers, setFilteredVouchers] = useState([]);
  const [reload, setReaload] = useState(false);
  useEffect(() => {
    fetchVouchers();
  }, [reload]);
  async function fetchVouchers() {
    const fetched = await getVouchersByWallet(walletId);
    const vouchers = fetched.filter((asset) => asset.voucher !== null);
    setFetchedVouchers(vouchers);
    setFilteredVouchers(vouchers);
  }
  //// FILTER INPUTS
  const RenderBrandsOptions = fetchedVouchers
    .map((voucher) => voucher.voucher.brand)
    .filter((item, index, arr) => arr.indexOf(item) === index) // filtra repeticiones);
    .map((brand) => (
      <option value={brand} key={brand}>
        {brand}
      </option>
    ));
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

  // RENDER VOUCHER CARDS
  const [nftCardPrimaryButtonId, setNftCardPrimaryButtonId] = useState("");
  const [nftCardSecondaryButtonId, setNftCardSecondaryButtonId] = useState("");
  const RenderVoucherCards = filteredVouchers.map((voucher) => (
    <NftCard
      key={voucher.asset.id}
      id={voucher.asset.id}
      title={voucher.voucher.title}
      image={`${apiURL}/${voucher.voucher.image}`}
      price={voucher.voucher.price}
      primaryActionTitle="REDEEM"
      primaryActionColor={theme.red}
      primaryAction={setNftCardPrimaryButtonId}
      secondaryActionTitle="Details"
      secondaryActionColor={theme.yellow}
      secondaryAction={() => {
        navigate("/wallet/voucherRedeem/" + voucher.asset.id);
      }}
    />
  ));

  // QR CODE DIALOG
  const [openQrDialog, setOpenQrDialog] = useState(false);
  const [dialogData, setDialogData] = useState({});
  useEffect(() => {
    if (nftCardPrimaryButtonId !== "") {
      setOpenQrDialog(true);
      setDialogData(
        fetchedVouchers.find(
          (voucher) => voucher.asset.id === nftCardPrimaryButtonId
        )
      );
    } else {
      setOpenQrDialog(false);
      setDialogData({});
    }
  }, [fetchedVouchers, nftCardPrimaryButtonId]);
  const renderRedeemDialog = Object.keys(dialogData).length !== 0 && (
    <DialogQrRedeemVoucher
      open={openQrDialog}
      vendor={dialogData.voucher.vendor.title}
      title={dialogData.voucher.title}
      image={dialogData.voucher.image}
      id={dialogData.asset.id}
      handleClose={setOpenQrDialog}
      clearDialog={setNftCardPrimaryButtonId}
      setReload={setReaload}
    />
  );

  return (
    <MainContainer>
      {renderRedeemDialog}
      <Title backButton="true">YOUR VOUCHERS</Title>
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
