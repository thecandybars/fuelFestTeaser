import React from "react";
import { screenSize } from "../common/screenSize";
import styled from "styled-components";

const StyledMain = styled.main`
  height: ${screenSize}px;
  padding: 10px;
  color: ${(props) => props.theme.white};
  background-color: ${(props) => props.theme.black};
  overflow-y: scroll;
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
  /* background-color: pink; */
`;

export default function MainContainer({ children }) {
  return <StyledMain>{children}</StyledMain>;
}
