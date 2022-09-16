import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import MainContainer from "../../assets/MainContainer";
import { getVoucher } from "../../services/assets";
import styled from "styled-components";
import { Dialog } from "@mui/material";
import { theme } from "../../common/theme";
import DialogBuyVoucher from "./DialogBuyVoucher";
import Title from "../../assets/Title";
import { Location, Map } from "../../iconComponents";

// STYLED COMPONENTS
const StyledLeft = styled.div`
  display: flex;
  flex-direction: column;
  width: 40%;
`;
const StyledRight = styled.div`
  width: 60%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const Info = styled.div`
  margin-left: 10px;
  margin-bottom: 20px;
`;
const StyledSubtitle = styled.p`
  font-family: "Oswald";
  color: ${(props) => props.theme.white};
  font-size: 1rem;
`;
const StyledInfo = styled.p`
  font-family: "Oswald";
  color: #da1921;
  font-size: 1rem;
`;
const Grid4 = styled.div`
  display: grid;
  grid-template-columns: 2.5rem auto;
`;
const Grid3 = styled.div`
  display: grid;
  grid-template-columns: 3.5rem auto;
  align-items: center;
`;
const VendorLogo = styled.img`
  grid-row: 1 / 3;
  width: 40px;
  margin-right: 10px;
`;
const VoucherImage = styled.img`
  width: 90%;
  margin: 0 0 15px 15px;
`;
const StyledPrice = styled.p`
  font-family: "Oswald";
  font-size: 36px;
  margin-bottom: 10px;
  color: #feae2e;
  margin-left: 8px;
`;
const StyledButton = styled.div`
  padding: 2px 70px;
  background-color: ${(props) => props.theme.green};
  color: white;
  border-radius: 40px;
  font-family: "Oswald";
  font-size: 2rem;
  text-align: center;
`;

export default function VoucherDetail() {
  const { voucherId } = useParams();
  const apiURL = process.env.REACT_APP_API;

  // INIT
  const [fetchedVoucher, setFetchedVoucher] = useState({});
  const fetchVoucher = async (voucherId) => {
    setFetchedVoucher(await getVoucher(voucherId));
  };
  useEffect(() => {
    fetchVoucher(voucherId);
  }, [voucherId]);

  //DIALOG
  const [dialogOpen, setDialogOpen] = useState(false);
  const handleDialogClose = () => {
    setDialogOpen(false);
  };

  return (
    Object.keys(fetchedVoucher).length !== 0 && (
      <MainContainer>
        <Title backButton="true" color={theme.red}>
          {fetchedVoucher.title}
        </Title>
        <div style={{ display: "flex" }}>
          <StyledLeft>
            <Info>
              <StyledSubtitle>Voucher ID</StyledSubtitle>
              <StyledInfo>{fetchedVoucher.assetId}</StyledInfo>
            </Info>
            <Info>
              <StyledSubtitle>Description</StyledSubtitle>
              <StyledInfo>{fetchedVoucher.description}</StyledInfo>
            </Info>
            <Info>
              <Grid3>
                <VendorLogo
                  alt="logo"
                  src={`${apiURL}/${fetchedVoucher.vendor.logo}`}
                  width="50px"
                />
                <StyledSubtitle>Vendor</StyledSubtitle>
                <StyledInfo>{fetchedVoucher.vendor.title}</StyledInfo>
              </Grid3>
            </Info>
            <Info>
              <Grid4>
                <Location style={{ fill: "white", fontSize: "1.8rem" }} />
                <StyledSubtitle>
                  Tent #{fetchedVoucher.vendor.tent}
                </StyledSubtitle>
                <Map style={{ fill: `${theme.red}`, fontSize: "1.8rem" }} />
                <StyledInfo style={{ textDecoration: "underline" }}>
                  <Link to="#">See it on map</Link>
                </StyledInfo>
              </Grid4>
            </Info>
          </StyledLeft>

          <StyledRight>
            <VoucherImage
              alt={fetchVoucher.title}
              src={`${apiURL}/${fetchedVoucher.image}`}
            />
            <div style={{ display: "flex", justifyContent: "center" }}>
              <StyledPrice>{fetchedVoucher.price} DRIFT</StyledPrice>
            </div>
            <StyledButton onClick={() => setDialogOpen(true)}>Buy</StyledButton>
          </StyledRight>
        </div>

        {/* DIALOG */}
        <Dialog open={dialogOpen} onClose={handleDialogClose}>
          <DialogBuyVoucher
            assetId={fetchedVoucher.assetId}
            closeDialog={handleDialogClose}
          />
        </Dialog>
      </MainContainer>
    )
  );
}
