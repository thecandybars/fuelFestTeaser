import React from "react";
import styled from "styled-components";

const StyledMain = styled.main`
  /* margin: 0 10px; */
  padding: 10px;
  /*=150px?? The height of BottomBar */
  padding-bottom: 150px;
  color: ${(props) => props.theme.white};
  background-color: ${(props) => props.theme.black};
  overflow-y: scroll;
  ::-webkit-scrollbar {
    display: none;
  }
  /* IE and Edge */
  -ms-overflow-style: none;
  /* Firefox */
  scrollbar-width: none;
`;

export default function MainContainer({ children }) {
  return <StyledMain>{children}</StyledMain>;
}
