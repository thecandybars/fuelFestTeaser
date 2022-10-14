import React from "react";
import styled from "styled-components";
import burnableIcon from "../../icons/local_fire_department_FILL0_wght400_GRAD0_opsz48.svg";
import transferableIcon from "../../icons/swap_horiz_FILL0_wght400_GRAD0_opsz48.svg";
import facebookIcon from "../../icons/social/facebook.svg";
import twitterIcon from "../../icons/social/twitter.svg";
import instagramIcon from "../../icons/social/instagram.svg";
import youtubeIcon from "../../icons/social/youtube.svg";
import OwnerIcon from "@mui/icons-material/Man";
import MainContainer from "../_shared/MainContainer";
import Title from "../../components/_shared/Title";
import { theme } from "../../common/theme";
import { Link } from "react-router-dom";
import { Location, Map } from "../../iconComponents";
import OpenInMap from "./OpenInMap";

// STYLED COMPONENTS
const StyledLeft = styled.div`
  font-family: "Oswald";
  display: flex;
  flex-direction: column;
  width: 40%;
`;
const StyledRight = styled.div`
  font-family: "Oswald";
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 60%;
`;
const StyledDataCol = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 10px;
`;
const StyledDataRow = styled.div`
  display: flex;
  flex-direction: row;
`;
const StyledSubtitle = styled.p`
  color: ${(props) => props.theme.white};
  font-size: 1.3rem;
`;
const StyledInfo = styled.p`
  color: ${(props) => props.theme.red};
  font-size: 1.1rem;
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
  font-size: 1.7rem;
  color: ${(props) => props.theme.yellow};
  margin: 0;
  padding: 0;
`;
const StyledButton = styled.div`
  width: 60%;
  margin: 20px 0 5px;
  padding: 1px 10px;
  background-color: #00703d;
  color: ${(props) => props.theme.white};
  border-radius: 20px;
  font-size: 1.5rem;
  text-align: center;
`;
const Data = styled.div`
  display: flex;
  flex-direction: column;
`;
const NftImage = styled.img`
  width: 200px;
  margin: 0 auto;
  border-radius: 2%;
`;

// VOUCHER STYLES
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
NftCardDetail.defaultProps = {
  id: "0",
  type: "carCard",
  title: "Card title",
  data: {},
  image: "#",
  imageType: "image",
  price: "999",
  actionButton: {
    action: () => console.log("action button clicked!"),
    label: "Buy",
    color: theme.green,
  },
};

export default function NftCardDetail(props) {
  const apiURL = process.env.REACT_APP_API;
  let data;
  data =
    props.type === "carCard" ? (
      <>
        <StyledDataCol>
          <StyledSubtitle>Mint number</StyledSubtitle>
          <StyledInfo>
            {props.data.mintNum} of {props.data.mintTotal} (max.{" "}
            {props.data.mintMax})
          </StyledInfo>
        </StyledDataCol>
        <StyledDataRow>
          <OwnerIcon />
          <StyledSubtitle>{props.data.carOwnerName}</StyledSubtitle>
        </StyledDataRow>
        <StyledDataRow>
          {props.data.carOwnerFacebook && (
            <StyledIcon alt="facebook icon" src={facebookIcon} />
          )}
          {props.data.carOwnerTwitter && (
            <StyledIcon alt="twitter icon" src={twitterIcon} />
          )}
          {props.data.carOwnerInstagram && (
            <StyledIcon alt="instagram icon" src={instagramIcon} />
          )}
          {props.data.carOwnerYoutube && (
            <StyledIcon alt="youtube icon" src={youtubeIcon} />
          )}
        </StyledDataRow>
        {false && props.data.voteCategories.length > 0 && (
          <>
            <StyledSubtitle>Upgrades</StyledSubtitle>
            {props.data.voteCategories.map((e) => (
              <div style={{ display: "flex", alignItems: "center" }}>
                <StyledSubtitle style={{ textTransform: "capitalize" }}>
                  <StyledIcon alt={e.title} src={`${apiURL}/${e.icon}`} />
                  {e.category}
                </StyledSubtitle>
              </div>
            ))}
          </>
        )}
        {false && Object.keys(props.data.sponsors).length > 0 && (
          <>
            <StyledSubtitle>Sponsors</StyledSubtitle>
            {props.car.sponsors.map((e) => (
              <StyledInfo>{e.title}</StyledInfo>
            ))}
          </>
        )}
        <div>
          {!!props.data.transferable && (
            <StyledDataRow>
              <StyledIconRed alt="transferable icon" src={transferableIcon} />
              <StyledInfo style={{ color: "#d9d9d9" }}>Transferable</StyledInfo>
            </StyledDataRow>
          )}
          {!!props.data.burnable && (
            <StyledDataRow>
              <StyledIconRed alt="burnable icon" src={burnableIcon} />
              <StyledInfo style={{ color: "#d9d9d9" }}>Burnable</StyledInfo>
            </StyledDataRow>
          )}
        </div>
      </>
    ) : (
      (data =
        props.type === "voucher" ? (
          <>
            <StyledDataCol>
              <StyledSubtitle>Voucher ID</StyledSubtitle>
              <StyledInfo>{props.data.id}</StyledInfo>
            </StyledDataCol>
            <StyledDataCol>
              <StyledSubtitle>Description</StyledSubtitle>
              <StyledInfo>{props.data.description}</StyledInfo>
            </StyledDataCol>
            <StyledDataCol>
              <Grid3>
                <VendorLogo
                  alt="logo"
                  src={`${apiURL}/${props.data.vendorLogo}`}
                  width="50px"
                />
                <StyledSubtitle>Vendor</StyledSubtitle>
                <StyledInfo>{props.data.vendorTitle}</StyledInfo>
              </Grid3>
            </StyledDataCol>
            <StyledDataCol>
              <Grid4>
                <Location style={{ fill: "white", fontSize: "1.8rem" }} />
                <StyledSubtitle>Tent #{props.data.vendorTent}</StyledSubtitle>
                <div></div>
                <OpenInMap
                  color={theme.red}
                  text="Open in Map"
                  fontSize="1rem"
                  direction="horizontal"
                />
              </Grid4>
            </StyledDataCol>
          </>
        ) : null)
    );
  return (
    <MainContainer>
      <Title backButton="true" color={theme.red}>
        {props.title}
      </Title>
      <StyledDataRow>
        <StyledLeft>
          <Data>{data}</Data>
        </StyledLeft>
        <StyledRight>
          {props.imageType === "image" && (
            <NftImage alt={props.title} src={`${apiURL}/${props.image}`} />
          )}
          {props.imageType === "video" && (
            <video width="200px" autoPlay loop>
              <source src={`${apiURL}/${props.image}`} type="video/mp4" />
            </video>
          )}
          <StyledButton
            onClick={props.actionButton.action}
            style={{ backgroundColor: props.actionButton.color }}
          >
            {props.actionButton.label}
          </StyledButton>
          {props.price !== "" && <StyledPrice>{props.price} DRIFT</StyledPrice>}
        </StyledRight>
      </StyledDataRow>
    </MainContainer>
  );
}
