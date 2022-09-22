import React from "react";
import { screenSize } from "../../common/screenSize";
import styled from "styled-components";

const StyledMain = styled.main`
  /* height: ${screenSize}px; */
  padding: 10px;
  color: ${(props) => props.theme.white};
  background-color: ${(props) => props.theme.black};
  margin-bottom: 150px; /*=50px The height of BottomBar */
  /* height: 110%; */

  overflow-y: scroll;
  /* IE and Edge */
  /* -ms-overflow-style: none;  */
  /* Firefox */
  /* scrollbar-width: none;  */
  /* background-color: pink; */
`;

export default function MainContainer({ children }) {
  return <StyledMain>{children}</StyledMain>;
}
