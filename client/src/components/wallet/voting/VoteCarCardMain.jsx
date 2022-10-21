import React from "react";
import styled from "styled-components";
import ownerIcon from "../../../icons/person_FILL0_wght400_GRAD0_opsz48.svg";
import detailsIcon from "../../../icons/speaker_notes_FILL0_wght400_GRAD0_opsz48.svg";
import {
  Avatar,
  AvatarGroup,
  Button,
  capitalize,
  Divider,
} from "@mui/material";
import { theme } from "../../../common/theme";
import { useNavigate } from "react-router-dom";
import { upgrades } from "../../../common/upgrades";
import UpgradeIconsRow from "../../_shared/UpgradeIconsRow";

const StyledCarCard = styled.div`
  /* margin: 10px; */
  font-family: "Oswald";
  color: #d9d9d9;
`;
const StyledCarPhoto = styled.img`
  width: 180px;
  object-fit: cover;
  object-position: bottom;
  /* border-radius: 10px; */
`;
const StyledCarInfo = styled.div`
  margin-left: 10px;
`;
const StyledCarTitle = styled.p`
  font-family: "Oswald";
  font-size: 1.5rem;
  margin: 10px 0;
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
  p {
    font-weight: lighter;
  }
`;
const StyledVoteButton = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-right: 12px;
  img {
    width: 38px;
    margin-right: 3px;
    margin-bottom: 3px;
  }
  h6 {
    font-family: "Oswald";
    color: ${(props) => props.theme.black};
    font-size: 0.7rem;
    font-weight: lighter;
  }
  p {
    font-family: "Oswald";
    color: ${(props) => props.theme.darkGreen};
    font-size: 0.7rem;
    /* font-weight: lighter; */
  }
`;
const StyledVoteBar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 5px 0 10px;
  padding: 5px 10px;
  background-color: ${(props) => props.theme.white};
  h3 {
    color: ${(props) => props.theme.black};
    font-size: 1.5rem;
  }
`;

export default function VoteCarCardMain(props) {
  const apiURL = process.env.REACT_APP_API;
  const navigate = useNavigate();

  const renderVoteButtons = props.car.voteCategories.map((category) => (
    <StyledVoteButton
      key={category.id}
      onClick={() => props.handleCategoryClick(category.id, props.car.id)}
    >
      <img alt={category.title} src={apiURL + "/" + category.icon} />
      <h6>{category.title}</h6>
      <p>
        {props.votes.find((vote) => vote.categoryId === category.id) &&
          (props.votes.find((vote) => vote.categoryId === category.id)
            .votingTokens *
            100) /
            props.frozenDrift +
            "%"}
      </p>
    </StyledVoteButton>
  ));
  // const renderCarUpgrades = upgrades.map(
  //   (upgrade) => props.car[upgrade] !== "" && capitalize(upgrade) + ", "
  // );

  return (
    <>
      <StyledCarTitle>{props.car.title}</StyledCarTitle>
      <StyledCarCard
        style={{ display: "flex" }}
        onClick={() => navigate(`/car/${props.car.id}`)}
      >
        <StyledCarPhoto
          alt="A car"
          src={`${apiURL}/${props.car.carImages[0].image}`}
        />
        <StyledCarInfo>
          <StyledData>
            <img alt="owner icon" src={ownerIcon} />
            <h3>{props.car.carOwner.name}</h3>
          </StyledData>
          <StyledData>
            <img alt="details icon" src={detailsIcon} />
            <h3>Details</h3>
          </StyledData>
          <StyledData
            style={{ flexDirection: "column", alignItems: "flex-start" }}
          >
            <h3 style={{ marginBottom: "5px" }}>Upgrades</h3>
            <UpgradeIconsRow
              carDetails={props.car}
              style={{ fill: theme.white }}
              overflowStyle={{ color: theme.white }}
              max={4}
            />
          </StyledData>
        </StyledCarInfo>
      </StyledCarCard>
      <StyledVoteBar>
        <h3>VOTE</h3>
        <div style={{ display: "flex", flexWrap: "wrap" }}>
          {renderVoteButtons}
        </div>
      </StyledVoteBar>
      <Divider color={theme.grayLine} />
    </>
  );
}
// const StyledCarCard = styled.div`
//   margin: 10px;
//   font-family: "Oswald";
//   color: #d9d9d9;
// `;
// const StyledCarPhoto = styled.img`
//   width: 140px;
//   object-fit: cover;
//   object-position: bottom;
//   border-radius: 10px;
// `;
// const StyledCarInfo = styled.div`
//   margin-left: 10px;
// `;
// const StyledCarTitle = styled.p`
//   font-size: 22px;
// `;
// const StyledData = styled.div`
//   display: flex;
//   align-items: center;

//   img {
//     width: 28px;
//     margin-right: 3px;
//     filter: invert(100%) sepia(4%) saturate(0%) hue-rotate(315deg)
//       brightness(88%) contrast(94%);
//   }
// `;

// export default function VoteCarCard(props) {
//   const { car, carOwner, carImages } = props.car;
//   const apiURL = process.env.REACT_APP_API;

//   return (
//     <StyledCarCard style={{ display: "flex" }}>
//       <StyledCarPhoto alt="A car" src={`${apiURL}/${carImages[0].image}`} />
//       <StyledCarInfo>
//         <StyledCarTitle>{car.title}</StyledCarTitle>
//         <StyledData>
//           <img alt="owner icon" src={ownerIcon} />
//           <p>{carOwner.name}</p>
//         </StyledData>
//         <StyledData>
//           <img alt="owner icon" src={detailsIcon} />
//           <p>Details</p>
//         </StyledData>
//         <Button>VOTE</Button>
//       </StyledCarInfo>
//     </StyledCarCard>
//   );
// }
