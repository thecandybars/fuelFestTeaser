import React, { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { icons } from "../common/icons";

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
  align-items: baseline;
  padding-top: 2px;
  justify-content: space-between;
`;
const CarTitle = styled.h3`
  font-size: 1.3rem;
  margin-bottom: 7px;
`;
const MapLink = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  color: #da1921;
  font-size: small;
  img {
    margin: 0 auto;
    height: 25px;
    filter: invert(82%) sepia(26%) saturate(3334%) hue-rotate(334deg)
      brightness(102%) contrast(99%);
  }
  p {
    color: ${(props) => props.theme.yellow};
  }
`;
const MapIcon = styled.div`
  min-width: 25px;
  display: flex;
  justify-content: center;
  margin-right: 2px;
`;
const SmIcon = styled.div`
  min-width: 25px;
  display: flex;
  justify-content: center;
  margin-right: 2px;
  img {
    margin: 0 auto;
    height: 25px;
    /* padding-left: 5px; */
    filter: invert(100%) sepia(4%) saturate(0%) hue-rotate(315deg)
      brightness(88%) contrast(94%);
  }
`;

export default function CarCard(props) {
  const apiURL = process.env.REACT_APP_API;

  // DIALOG
  const [, setCarDetailOpen] = useState(false);

  return (
    <>
      <Link to={`/car/${props.car.id}`}>
        <Container onClick={() => setCarDetailOpen(true)}>
          <CarImage
            alt="A car"
            src={`${apiURL}/${
              !!props.car.carImages.length && props.car.carImages[0].image
            }`}
          />
          <CarData>
            {/* TITLE + FAVORITE */}
            <TwoColumns>
              <CarTitle>{props.car.title}</CarTitle>
              <SmIcon>
                <img
                  alt={props.car.isFavorite ? "Favorite" : "Not favorite"}
                  src={
                    props.car.isFavorite
                      ? icons.favorite.on
                      : icons.favorite.off
                  }
                  onClick={(e) => {
                    e.stopPropagation();
                    props.togFav(props.car.id);
                  }}
                />
              </SmIcon>
            </TwoColumns>
            {/* ROW OWNER */}
            <OneColumn>
              <SmIcon>
                <img alt="owner icon" src={icons.owner} />
              </SmIcon>
              {props.car.carOwner.name}
            </OneColumn>
            {/* ROW LOCATION + MAP*/}
            <TwoColumns>
              <OneColumn>
                <SmIcon>
                  <img alt="location icon" src={icons.location} />
                </SmIcon>
                <p>{props.car.location}</p>
              </OneColumn>
              <MapLink>
                <img alt="map icon" src={icons.map} />

                {/* <Link to="#"> */}
                <p>map</p>
                {/* </Link> */}
              </MapLink>
            </TwoColumns>
            {/* ROW VOTING CATEGORIES*/}
            <OneColumn>
              {props.car.voteCategories.map((voteCat) => (
                <SmIcon
                  key={voteCat.id}
                  alt="icon"
                  src={`${apiURL}/${voteCat.icon}`}
                />
              ))}
            </OneColumn>
          </CarData>
        </Container>
      </Link>
    </>
  );
}
