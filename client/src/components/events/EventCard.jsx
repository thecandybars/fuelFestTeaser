import React from "react";
import { icons } from "../../common/icons";
import { days, months } from "../../common/dateNames";
import styled from "styled-components";
import { Collapse } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Favorites } from "../../iconComponents";
import { theme } from "../../common/theme";
import HorizontalCardContainer from "../_shared/HorizontalCardContainer";
import ExpandeMoreTriangle from "../_shared/ExpandeMoreTriangle";
import OpenInMap from "../_shared/OpenInMap";

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
// COLLAPSABLE EVENT DESCRIPTION
const CollapseButton = styled.div`
  font-size: 1rem;
  margin-left: 20px;
`;

const EventDescription = styled.div`
  padding: 3px;
  color: ${(props) => props.theme.black};
  background-color: ${(props) => props.theme.white};
`;

export default function EventCard(props) {
  const { data } = props;
  const fullDateStart = new Date(data.dateStart);
  const dayNameStart = days[fullDateStart.getDay()];
  const dayNumberStart =
    fullDateStart.getMinutes().toString().length === 2
      ? fullDateStart.getMinutes()
      : "0" + fullDateStart.getMinutes();
  const monthName = months[fullDateStart.getMonth()].toLowerCase();

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
      <div
        onClick={() => {
          props.showDesc(props.id);
        }}
      >
        <HorizontalCardContainer>
          <EventImage alt="The band" src={`${apiURL}/${props.image}`} />
          <EventData>
            <div style={{ display: "flex" }}>
              <EventTitle>{props.title}</EventTitle>
              <ExpandeMoreTriangle open={props.desc} />
            </div>
            <p>
              <Icon alt="" src={icons.event.calendar} />
              {`${dayNameStart} ${fullDateStart.getDate()} ${monthName}`}
            </p>
            <p>
              <Icon alt="" src={icons.event.clock} />
              {`${fullDateStart.getHours()}:${dayNumberStart}`}
            </p>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <p>
                <Icon alt="" src={icons.location} />
                {props.location}
              </p>
              <OpenInMap />
            </div>
          </EventData>

          <Favorites
            style={favIconStyle}
            onClick={(e) => {
              e.stopPropagation();
              props.togFav(props.id);
            }}
          />
        </HorizontalCardContainer>
      </div>
      {props.desc && (
        <Collapse in={!!props.desc} timeout="auto" unmountOnExit>
          <EventDescription>{props.desc}</EventDescription>
        </Collapse>
      )}
    </>
  );
}
