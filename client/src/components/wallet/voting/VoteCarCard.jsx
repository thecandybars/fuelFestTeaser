import React from "react";
import styled from "styled-components";
import ownerIcon from "../../../icons/person_FILL0_wght400_GRAD0_opsz48.svg";
import detailsIcon from "../../../icons/speaker_notes_FILL0_wght400_GRAD0_opsz48.svg";
import { Button } from "@mui/material";

const StyledCarCard = styled.div`
  margin: 10px;
  font-family: "Oswald";
  color: #d9d9d9;
`;
const StyledCarPhoto = styled.img`
  width: 140px;
  object-fit: cover;
  object-position: bottom;
  border-radius: 10px;
`;
const StyledCarInfo = styled.div`
  margin-left: 10px;
`;
const StyledCarTitle = styled.p`
  font-size: 22px;
`;
const StyledData = styled.div`
  display: flex;
  align-items: center;

  img {
    width: 28px;
    margin-right: 3px;
    filter: invert(100%) sepia(4%) saturate(0%) hue-rotate(315deg)
      brightness(88%) contrast(94%);
  }
`;

export default function VoteCarCard(props) {
  const { car, carOwner, carImages } = props.data;
  const apiURL = process.env.REACT_APP_API;

  return (
    <StyledCarCard style={{ display: "flex" }}>
      <StyledCarPhoto alt="A car" src={`${apiURL}/${carImages[0].image}`} />
      <StyledCarInfo>
        <StyledCarTitle>{car.title}</StyledCarTitle>
        <StyledData>
          <img alt="owner icon" src={ownerIcon} />
          <p>{carOwner.name}</p>
        </StyledData>
        <StyledData>
          <img alt="owner icon" src={detailsIcon} />
          <p>Details</p>
        </StyledData>
        <Button>VOTE</Button>
      </StyledCarInfo>
    </StyledCarCard>
  );
}
