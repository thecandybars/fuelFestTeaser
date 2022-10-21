import React from "react";
import styled from "styled-components";

const StyledMain = styled.main`
  color: ${(props) => props.theme.white};
  background-color: ${(props) => props.theme.black};
  padding-bottom: 150px; /* The height of BottomBar x2 */
`;

export default function MainContainer({ children }) {
  return <StyledMain>{children}</StyledMain>;
}
