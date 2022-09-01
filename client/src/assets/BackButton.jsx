import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import backIcon from "../icons/arrow_back_ios_new_FILL0_wght400_GRAD0_opsz48.svg";

const StyledBackButton = styled.img`
  /* width: 35px; */
  /* background-color: pink; */
  margin: 0;
  height: 30px;
  padding-right: 10px;
  filter: invert(95%) sepia(5%) saturate(169%) hue-rotate(244deg)
    brightness(118%) contrast(100%);
`;

export default function BackButton(props) {
  const { style } = props;
  const navigate = useNavigate();
  return (
    <StyledBackButton
      alt="go back"
      src={backIcon}
      onClick={() => navigate(-1)}
      style={style}
    />
  );
}
