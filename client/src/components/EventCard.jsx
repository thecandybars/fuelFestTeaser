import React from "react";
import { icons } from "../common/icons";
import { days, months } from "../common/dateNames";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  margin-top: 10px;
  margin-bottom: 3px;
  cursor: pointer;
`;
const EventData = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  margin-left: 5px;
  p {
    display: flex;
    align-items: center;
  }
`;
const EventTitle = styled.h3`
  display: flex;
  justify-content: space-between;
`;
const EventImage = styled.img`
  width: 100px;
  object-fit: cover;
  object-position: center;
`;
const Icon = styled.img`
  filter: invert(95%) sepia(5%) saturate(169%) hue-rotate(244deg)
    brightness(118%) contrast(100%); /* Color=white */
  width: 25px;
  height: 25px;
  margin-right: 5px;
`;
const FavIcon = styled.div`
  width: 50px;
  height: 50px;
  img {
    filter: invert(95%) sepia(5%) saturate(169%) hue-rotate(244deg)
      brightness(118%) contrast(100%); /* Color=white */
  }
`;

const EventDescription = styled.div`
  padding: 3px;
  color: ${(props) => props.theme.black};
  background-color: ${(props) => props.theme.white};
`;

export default function EventCard(props) {
  const fullDate = new Date(props.date);
  const dayName = days[fullDate.getDay()];
  const dayNumber =
    fullDate.getMinutes().toString().length === 2
      ? fullDate.getMinutes()
      : "0" + fullDate.getMinutes();
  const monthName = months[fullDate.getMonth()].toLowerCase();

  const apiURL = process.env.REACT_APP_API;
  return (
    <>
      <Container
        onClick={() => {
          props.showDesc(props.id);
        }}
      >
        <EventImage alt="The band" src={`${apiURL}/${props.image}`} />
        <EventData>
          <EventTitle>{props.title}</EventTitle>
          <p>
            <Icon alt="" src={icons.event.calendar} />
            {`${dayName} ${fullDate.getDate()} ${monthName}`}
          </p>
          <p>
            <Icon alt="" src={icons.event.clock} />
            {`${fullDate.getHours()}:${dayNumber}`}
          </p>
          <p>
            <Icon alt="" src={icons.location} />
            {props.location}
          </p>
        </EventData>
        <FavIcon
          onClick={(e) => {
            e.stopPropagation();
            props.togFav(props.id);
          }}
        >
          <img
            alt={props.isFavorite ? "Favorite" : "Not favorite"}
            src={props.isFavorite ? icons.favorite.on : icons.favorite.off}
          />
        </FavIcon>
      </Container>
      {props.desc && <EventDescription>{props.desc}</EventDescription>}
    </>
  );
}
