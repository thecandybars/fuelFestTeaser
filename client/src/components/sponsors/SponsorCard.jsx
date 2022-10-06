import React from "react";
import { icons } from "../../common/icons";
import { days, months } from "../../common/dateNames";
import styled from "styled-components";
import { Collapse } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Favorites } from "../../iconComponents";
import { theme } from "../../common/theme";

const Container = styled.div`
  display: flex;
  margin-top: 10px;
  margin-bottom: 3px;
  cursor: pointer;
  font-family: "Oswald";
`;
const SponsorData = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  margin-left: 5px;
  p {
    display: flex;
    align-items: center;
    font-family: "Nunito";
  }
`;
const SponsorTitle = styled.h3`
  display: flex;
  justify-content: space-between;
`;
const LeftImage = styled.div`
  width: 200px;
  margin-right: 10px;
`;
const SponsorImage = styled.img`
  object-fit: cover;
  object-position: center;
`;
const SponsorLogo = styled.img`
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

const SponsorDescription = styled.div`
  padding: 3px;
  color: ${(props) => props.theme.black};
  background-color: ${(props) => props.theme.white};
`;

export default function SponsorCard(props) {
  const apiURL = process.env.REACT_APP_API;

  // STYLES
  const favIconStyle = {
    fill: props.isFavorite ? theme.white : "transparent",
    stroke: props.isFavorite ? "transparent" : theme.lightGray,
    strokeWidth: "12px",
    fontSize: "3rem",
  };

  return (
    <>
      <Container>
        <LeftImage>
          {props.data.image !== "" ? (
            <SponsorImage alt="logo" src={`${apiURL}/${props.data.image}`} />
          ) : (
            <SponsorLogo
              alt={props.data.title}
              src={`${apiURL}/${props.data.logo}`}
            />
          )}
        </LeftImage>
        <SponsorData>
          <div style={{ display: "flex" }}>
            <SponsorTitle>{props.data.title}</SponsorTitle>
          </div>
          <p>{props.data.descriptionShort}</p>
          <p>{props.data.vendor !== null && props.data.vendor.tent}</p>
          <p>{props.data.vendor !== null && "See it on the map"}</p>
        </SponsorData>

        <Favorites
          style={favIconStyle}
          onClick={(e) => {
            e.stopPropagation();
            props.togFav(props.id);
          }}
        />
      </Container>
    </>
  );
}
