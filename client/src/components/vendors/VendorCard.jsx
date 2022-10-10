import React from "react";
import styled from "styled-components";
import { Avatar, Badge, Collapse } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Favorites } from "../../iconComponents";
import { theme } from "../../common/theme";
import HorizontalCardContainer from "../_shared/HorizontalCardContainer";
import { Location, Map } from "../../iconComponents";
import styledEngine from "@mui/styled-engine";

const StyledBadge = styledEngine(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    left: 52,
    bottom: "15%",
    fontFamily: "Oswald",
    fontSize: "1.1rem",
    borderRadius: "0px",
    padding: "13px 13px",
    paddingRight: "40px",
  },
}));

const VendorData = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  margin-left: 5px;
  font-family: "Oswald";
  h3 {
    color: gray;
  }
  p {
    display: flex;
    align-items: center;
    /* font-family: "Nunito"; */
  }
`;

const LeftImage = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 150px;
  margin-right: 10px;
`;
const VendorLogoBmp = styled.img`
  object-fit: cover;
  object-position: center;
`;
const VendorLogoSvg = styled.img`
  filter: invert(100%) sepia(0%) saturate(7473%) hue-rotate(114deg)
    brightness(113%) contrast(102%);
`;
const Icon = styled.img`
  filter: invert(95%) sepia(5%) saturate(169%) hue-rotate(244deg)
    brightness(118%) contrast(100%); /* Color=white */
  width: 25px;
  height: 25px;
  margin-right: 5px;
`;
// COLLAPSABLE EVENT DESCRIPTION
const CollapseButton = styled.div`
  font-size: 1rem;
  margin-left: 20px;
`;

const VendorDescription = styled.div`
  padding: 3px;
  color: ${(props) => props.theme.black};
  background-color: ${(props) => props.theme.white};
`;

export default function VendorCard(props) {
  const apiURL = process.env.REACT_APP_API;

  // STYLES
  const favIconStyle = {
    fill: props.isFavorite ? theme.white : "transparent",
    stroke: props.isFavorite ? "transparent" : theme.lightGray,
    strokeWidth: "12px",
    fontSize: "3rem",
  };
  const avatarStyle = {
    width: 60,
    height: 60,
    color: theme.black,
    bgcolor: theme.white,
    fontSize: "2rem",
  };

  return (
    <>
      <HorizontalCardContainer>
        <StyledBadge
          badgeContent={props.data.isSponsor ? "SPONSOR" : 0}
          color="red"
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left",
          }}
          overlap="rectangular"
        >
          <LeftImage>
            {props.data.logo.slice(props.data.logo.lastIndexOf(".")) ===
            "svg" ? (
              <VendorLogoSvg
                alt={props.data.title}
                src={`${apiURL}/${props.data.logo}`}
              />
            ) : props.data.logo !== "" ? (
              <VendorLogoBmp alt="logo" src={`${apiURL}/${props.data.logo}`} />
            ) : (
              <Avatar sx={avatarStyle}>
                {props.data.title[0].toUpperCase()}
              </Avatar>
            )}
          </LeftImage>
        </StyledBadge>

        <VendorData>
          <h2>{props.data.title}</h2>
          <h3>{props.data.descriptionShort}</h3>
          <p>
            <Location style={{ fill: theme.white, fontSize: "2rem" }} />
            {props.data.tent}
          </p>
          <p>
            <Map style={{ fill: theme.red, fontSize: "2rem" }} />
            See it in the map
          </p>
        </VendorData>

        <Favorites
          style={favIconStyle}
          onClick={(e) => {
            e.stopPropagation();
            props.toggleFav(props.data.id);
          }}
        />
      </HorizontalCardContainer>
    </>
  );
}
