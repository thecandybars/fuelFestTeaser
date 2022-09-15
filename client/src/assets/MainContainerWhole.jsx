import React from "react";
import styled from "styled-components";

const StyledMain = styled.main`
  color: ${(props) => props.theme.white};
  background-color: ${(props) => props.theme.black};
  margin-bottom: 50px; /* The height of BottomBar */
`;

export default function MainContainer({ children }) {
  return <StyledMain>{children}</StyledMain>;
}
