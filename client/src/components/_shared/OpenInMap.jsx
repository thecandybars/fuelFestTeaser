import React from "react";
import { Map } from "../../iconComponents";
import styled from "styled-components";
import { theme } from "../../common/theme";
import { useNavigate } from "react-router-dom";

const StyledContainer = styled.div`
  display: flex;
  align-items: center;
  font-family: "Oswald";
  width: fit-content;
`;
const StyledVerticalLine = styled.p`
  font-size: 1rem;
  margin-top: -6px;
`;
const StyledHorizontalLine = styled.span`
  font-size: 1rem;
`;
OpenInMap.defaultProps = {
  direction: "horizontal",
  color: theme.yellow,
  param: "",
  text: "MAP",
  fontSize: "1rem",
};

export default function OpenInMap(props) {
  const navigate = useNavigate();
  const direction = props.direction === "vertical" ? "column" : "row";
  const renderText =
    props.direction === "vertical" ? (
      <StyledVerticalLine style={{ fontSize: props.fontSize }}>
        {props.text}
      </StyledVerticalLine>
    ) : (
      <StyledHorizontalLine style={{ fontSize: props.fontSize }}>
        {props.text}
      </StyledHorizontalLine>
    );
  return (
    <div onClick={() => navigate("/maps/" + props.param)}>
      <StyledContainer
        style={{
          flexDirection: direction,
          color: props.color,
          fill: props.color,
        }}
      >
        <Map />
        {renderText}
      </StyledContainer>
    </div>
  );
}
