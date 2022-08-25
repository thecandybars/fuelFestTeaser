import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getAsset } from "../services/assets";
import styled from "styled-components";
import BackButton from "../assets/BackButton";
import burnableIcon from "../icons/local_fire_department_FILL0_wght400_GRAD0_opsz48.svg";
import transferableIcon from "../icons/swap_horiz_FILL0_wght400_GRAD0_opsz48.svg";

// STYLED COMPONENTS
const StyledContainer = styled.div`
  margin: 10px;
`;
const StyledLeft = styled.div`
  width: 40%;
`;
const StyledRight = styled.div`
  width: 60%;
`;
const StyledTitle = styled.h1`
  font-size: 32px;
  color: #da1921;
  margin-bottom: 20px;
`;
const StyledSubtitle = styled.p`
  font-family: "Oswald";
  color: #a1a1a1;
`;
const StyledInfo = styled.p`
  font-family: "Oswald";
  margin-bottom: 10px;
  color: #da1921;
`;
const StyledIcon = styled.img`
  width: 25px;
  height: 25px;
  margin-right: 10px;
  filter: invert(12%) sepia(74%) saturate(5874%) hue-rotate(352deg)
    brightness(104%) contrast(91%); /* Color=red */
`;
const StyledPrice = styled.p`
  font-family: "Oswald";
  margin-bottom: 10px;
  color: #feae2e;
  margin-left: 8px;
`;
const StyledButton = styled.div`
  padding: 1px 10px;
  background-color: #00703d;
  color: white;
  border-radius: 20px;
  font-family: "Oswald";
  font-size: 18px;
  text-align: center;
`;

export default function NFTCar() {
  const { assetId } = useParams();
  const apiURL = process.env.REACT_APP_API;

  //   INIT
  const [data, setData] = useState({});
  useEffect(() => {
    fetchNFTCar(assetId);
  }, []);
  const fetchNFTCar = async (assetId) => {
    setData(await getAsset(assetId));
  };

  return (
    Object.keys(data).length !== 0 && (
      <StyledContainer>
        <div
          style={{
            display: "flex",
            alignItems: "baseline",
            justifyContent: "space-between",
          }}
        >
          <StyledTitle>{data.astNFTCard.name}</StyledTitle>
          <BackButton />
        </div>
        <div style={{ display: "flex" }}>
          <StyledLeft>
            <StyledSubtitle>ID</StyledSubtitle>
            <StyledInfo style={{ color: "#d9d9d9" }}>
              #{data.astNFTCard.id.slice(0, data.astNFTCard.id.indexOf("-"))}
            </StyledInfo>
            <StyledSubtitle>Owner</StyledSubtitle>
            <StyledInfo>{data.astNFTCard.owner}</StyledInfo>
            <StyledSubtitle>Mint number</StyledSubtitle>
            <StyledInfo>
              {data.astNFTCard.mintNum} of {data.astNFTCard.mintMax} (max.{" "}
              {data.astNFTCard.mintMax})
            </StyledInfo>
            <StyledSubtitle>Collection</StyledSubtitle>
            <StyledInfo>???</StyledInfo>
            <StyledSubtitle>Schema</StyledSubtitle>
            <StyledInfo>overall</StyledInfo>
            <StyledSubtitle>Template ID</StyledSubtitle>
            <StyledInfo>
              #
              {data.astNFTCard.templateId.slice(
                0,
                data.astNFTCard.templateId.indexOf("-")
              )}
            </StyledInfo>
            {!!data.astNFTCard.transferable && (
              <div style={{ display: "flex" }}>
                <StyledIcon alt="transferable icon" src={transferableIcon} />
                <StyledInfo style={{ color: "#d9d9d9" }}>
                  Transferable
                </StyledInfo>
              </div>
            )}
            {!!data.astNFTCard.burnable && (
              <div style={{ display: "flex" }}>
                <StyledIcon alt="burnable icon" src={burnableIcon} />
                <StyledInfo style={{ color: "#d9d9d9" }}>Burnable</StyledInfo>
              </div>
            )}
          </StyledLeft>
          <StyledRight>
            <img
              alt="An NFT card"
              src={`${apiURL}/${data.astNFTCard.imageFront}`}
            />
            <div style={{ display: "flex", justifyContent: "center" }}>
              <StyledSubtitle>Price</StyledSubtitle>
              <StyledPrice>100 DRIFT</StyledPrice>
            </div>
            <StyledButton>Buy</StyledButton>
          </StyledRight>
        </div>
      </StyledContainer>
    )
  );
}
