import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { Owner, Location, Map } from "../../iconComponents";
import { icons } from "../../common/icons";
import { Favorites } from "../../iconComponents";
import camelCase from "../../common/camelCase";
import { theme } from "../../common/theme";

const Container = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: stretch;
  margin-top: 10px;
  cursor: pointer;
  padding-bottom: 5px;
  border-bottom: 1px solid #2d2d2d;
`;
const CarImage = styled.img`
  width: 140px;
  object-fit: cover;
  object-position: bottom;
  border-radius: 10px;
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
`;
const TwoColumns = styled.div`
  display: flex;
  align-items: center;
  padding-top: 2px;
  justify-content: space-between;
  width: 100%;
`;
const CarTitle = styled.h3`
  font-size: 1.3rem;
  margin-bottom: 7px;
`;
const MapLink = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  font-size: 2rem;
  fill: ${(props) => props.theme.yellow};
  p {
    font-size: small;
    color: ${(props) => props.theme.yellow};
  }
`;
const SmIcon = styled.div`
  font-size: 2rem;
  display: flex;
  justify-content: center;
  margin-right: 2px;
  fill: white;
`;
const VoteIcon = styled.img`
  width: 36px;
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
      <Container onClick={() => navigate(`/car/${props.car.id}`)}>
        {/* Delete TwoColumns element to force image to be square */}
        <TwoColumns style={{ alignItems: "flex-start" }}>
          <CarImage
            alt="A car"
            src={`${apiURL}/${
              !!props.car.carImages.length && props.car.carImages[0].image
            }`}
          />
          <CarData>
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
            {/* ROW OWNER */}
            <OneColumn>
              <SmIcon>
                <Owner />
              </SmIcon>
              <p>{props.car.carOwner.name}</p>
            </OneColumn>
            {/* ROW LOCATION + MAP*/}
            <TwoColumns>
              <OneColumn>
                <SmIcon>
                  <Location />
                </SmIcon>
                <p>{props.car.location}</p>
              </OneColumn>
              <MapLink>
                {/* <SmIcon> */}
                <Map />
                {/* </SmIcon> */}
                <p>map</p>
              </MapLink>
            </TwoColumns>
            {/* ROW VOTING CATEGORIES*/}
            <OneColumn>
              {props.car.voteCategories.map((voteCat) => (
                <VoteIcon
                  alt={voteCat.title}
                  src={icons.voting[camelCase(voteCat.title)]}
                  key={voteCat.id}
                />
              ))}
            </OneColumn>
          </CarData>
        </TwoColumns>
      </Container>
    </>
  );
}
