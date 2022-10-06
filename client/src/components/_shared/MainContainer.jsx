import React from "react";
import { screenSize } from "../../common/screenSize";
import styled from "styled-components";

const StyledMain = styled.main`
  padding: 10px;
  color: ${(props) => props.theme.white};
  background-color: ${(props) => props.theme.black};
  /*=50px The height of BottomBar */
  padding-bottom: 150px;

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
