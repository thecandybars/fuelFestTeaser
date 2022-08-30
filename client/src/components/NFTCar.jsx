import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getNFTCard } from "../services/assets";
import styled from "styled-components";
import BackButton from "../assets/BackButton";
import burnableIcon from "../icons/local_fire_department_FILL0_wght400_GRAD0_opsz48.svg";
import transferableIcon from "../icons/swap_horiz_FILL0_wght400_GRAD0_opsz48.svg";
import facebookIcon from "../icons/social/facebook.svg";
import twitterIcon from "../icons/social/twitter.svg";
import instagramIcon from "../icons/social/instagram.svg";
import youtubeIcon from "../icons/social/youtube.svg";
import OwnerIcon from "@mui/icons-material/Man";
import Modal from "@mui/material/Modal";
import ModalBuyNFT from "./WalletMarketplace/ModalBuyNFT";
import { Dialog } from "@mui/material";

// STYLED COMPONENTS
const StyledContainer = styled.div`
  margin: 10px;
`;
const StyledLeft = styled.div`
  display: flex;
  flex-direction: column;
  width: 40%;
`;
const StyledRight = styled.div`
  width: 60%;
`;
const StyledTitle = styled.h1`
  font-size: 32px;
  text-align: left;
  color: #da1921;
  margin-left: 0px;
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
`;
const StyledIconRed = styled.img`
  width: 25px;
  height: 25px;
  margin-right: 10px;
  filter: invert(12%) sepia(74%) saturate(5874%) hue-rotate(352deg)
    brightness(104%) contrast(91%); /* Color=red */
`;
const StyledPrice = styled.p`
  font-family: "Oswald";
  font-size: 36px;
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
  const [nftCarFetched, setNftCarFetched] = useState({});
  useEffect(() => {
    fetchNFTCar(assetId);
  }, [assetId]);
  const fetchNFTCar = async (assetId) => {
    setNftCarFetched(await getNFTCard(assetId));
  };

  // MODAL
  const [modalOpen, setModalOpen] = useState(false);
  function handleModalClose() {
    setModalOpen(false);
  }

  return (
    // false &&
    Object.keys(nftCarFetched).length !== 0 && (
      <StyledContainer>
        <div
          style={{
            display: "flex",
            alignItems: "baseline",
            // justifyContent: "space-between",
          }}
        >
          <BackButton />
          <StyledTitle>{nftCarFetched.nftCard.name}</StyledTitle>
        </div>
        <div style={{ display: "flex" }}>
          <StyledLeft>
            <StyledSubtitle>Mint number</StyledSubtitle>
            <StyledInfo>
              {nftCarFetched.nftCard.mintNum} of {nftCarFetched.nftCard.mintMax}{" "}
              (max. {nftCarFetched.nftCard.mintMax})
            </StyledInfo>

            <div style={{ display: "flex" }}>
              <OwnerIcon />
              <StyledSubtitle>{nftCarFetched.car.carOwner.name}</StyledSubtitle>
            </div>
            <div style={{ display: "flex" }}>
              {nftCarFetched.car.carOwner.facebook && (
                <StyledIcon alt="facebook icon" src={facebookIcon} />
              )}
              {nftCarFetched.car.carOwner.twitter && (
                <StyledIcon alt="twitter icon" src={twitterIcon} />
              )}
              {nftCarFetched.car.carOwner.instagram && (
                <StyledIcon alt="instagram icon" src={instagramIcon} />
              )}
              {nftCarFetched.car.carOwner.youtube && (
                <StyledIcon alt="youtube icon" src={youtubeIcon} />
              )}
            </div>

            {nftCarFetched.car.voteCategories.length > 0 && false && (
              <>
                <StyledSubtitle>Upgrades</StyledSubtitle>
                {nftCarFetched.car.voteCategories.map((e) => (
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <StyledSubtitle style={{ textTransform: "capitalize" }}>
                      <StyledIcon alt={e.title} src={`${apiURL}/${e.icon}`} />
                      {e.category}
                    </StyledSubtitle>
                  </div>
                ))}
              </>
            )}

            {nftCarFetched.car.sponsors.length > 0 && false && (
              <>
                <StyledSubtitle>Sponsors</StyledSubtitle>
                {nftCarFetched.car.sponsors.map((e) => (
                  <StyledInfo>{e.title}</StyledInfo>
                ))}
              </>
            )}
            <div>
              {!!nftCarFetched.nftCard.transferable && (
                <div style={{ display: "flex" }}>
                  <StyledIconRed
                    alt="transferable icon"
                    src={transferableIcon}
                  />
                  <StyledInfo style={{ color: "#d9d9d9" }}>
                    Transferable
                  </StyledInfo>
                </div>
              )}
              {!!nftCarFetched.nftCard.burnable && (
                <div style={{ display: "flex" }}>
                  <StyledIconRed alt="burnable icon" src={burnableIcon} />
                  <StyledInfo style={{ color: "#d9d9d9" }}>Burnable</StyledInfo>
                </div>
              )}
            </div>
          </StyledLeft>
          <StyledRight>
            <img
              alt="An NFT car card"
              src={`${apiURL}/${nftCarFetched.nftCard.imageFront}`}
            />
            <div style={{ display: "flex", justifyContent: "center" }}>
              <StyledPrice>{nftCarFetched.nftCard.price} DRIFT</StyledPrice>
            </div>
            <StyledButton onClick={() => setModalOpen(true)}>Buy</StyledButton>
          </StyledRight>
        </div>
        {/* DIALOG WINDOW */}
        {
          <Dialog open={modalOpen} onClose={handleModalClose}>
            <ModalBuyNFT
              // key={nftCarFetched.nftCard.assetId}
              assetId={nftCarFetched.nftCard.assetId}
            />
          </Dialog>
        }
      </StyledContainer>
    )
  );
}
