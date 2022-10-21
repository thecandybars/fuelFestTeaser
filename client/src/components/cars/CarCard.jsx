import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import PersonIcon from "@mui/icons-material/Person";
import PlaceIcon from "@mui/icons-material/Place";
import { Favorites } from "../../iconComponents";
import { theme } from "../../common/theme";
import HorizontalCardContainer from "../_shared/HorizontalCardContainer";
import OpenInMap from "../_shared/OpenInMap";
import UpgradeIconsRow from "../_shared/UpgradeIconsRow";

const CarImage = styled.img`
  width: 180px;
  height: 100%;
  object-fit: cover;
  object-position: bottom;
  border-radius: 5px;
`;
const CarData = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  margin-left: 5px;
`;
const OneColumn = styled.div`
  display: flex;
  align-items: center;
  padding-top: 2px;
  font-family: "Oswald";
  font-size: 1.3rem;
`;
const TwoColumns = styled.div`
  display: flex;
  align-items: center;
  /* padding-top: 2px; */
  justify-content: space-between;
  width: 100%;
`;
const CarTitle = styled.h3`
  font-size: 1.7rem;
  margin-top: 7px;
`;

const VoteIcon = styled.img`
  width: 30px;
  /* background-color: pink; */
  display: flex;
  /* justify-content: center; */
  margin-right: 2px;
  filter: invert(90%) sepia(0%) saturate(988%) hue-rotate(240deg)
    brightness(103%) contrast(71%);
  /* stroke: white; */
  /* filter: invert(100%); */
`;

export default function CarCard(props) {
  const apiURL = process.env.REACT_APP_API;
  const navigate = useNavigate();

  // STYLES
  const favIconStyle = {
    fill: props.isFavorite ? theme.white : "transparent",
    stroke: props.isFavorite ? "transparent" : theme.lightGray,
    strokeWidth: "12px",
    fontSize: "2rem",
  };
  return (
    <>
      <div onClick={() => navigate(`/car/${props.car.id}`)}>
        {/* TITLE + FAVORITE */}
        <TwoColumns>
          <CarTitle>
            {props.car.year && props.car.year + " "}
            {props.car.title}
          </CarTitle>
          <Favorites
            style={favIconStyle}
            onClick={(e) => {
              e.stopPropagation();
              props.togFav(props.car.id);
            }}
          />
        </TwoColumns>
        <HorizontalCardContainer>
          <TwoColumns style={{ alignItems: "flex-start" }}>
            <CarImage
              alt="A car"
              src={`${apiURL}/${
                !!props.car.carImages.length && props.car.carImages[0].image
              }`}
            />
            <CarData>
              {/* ROW OWNER */}
              <OneColumn>
                <PersonIcon />
                <p>{props.car.carOwner.name}</p>
              </OneColumn>
              {/* ROW LOCATION + MAP*/}
              <TwoColumns>
                <OneColumn>
                  <PlaceIcon />
                  <p>{props.car.location}</p>
                  <OpenInMap
                    direction="horizontal"
                    style={{ marginLeft: "15px" }}
                  />
                </OneColumn>
              </TwoColumns>
              {/* ROW VOTING CATEGORIES*/}
              <OneColumn
                style={{ flexDirection: "column", alignItems: "flex-start" }}
              >
                <h4 style={{ marginBottom: "5px" }}>Upgrades</h4>
                <UpgradeIconsRow carDetails={props.car} />
              </OneColumn>
            </CarData>
          </TwoColumns>
        </HorizontalCardContainer>
      </div>
    </>
  );
}
