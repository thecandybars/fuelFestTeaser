import React from "react";
import styled from "styled-components";

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

export default function CardsContainerColumn({ children }) {
  return <StyledContainer>{children}</StyledContainer>;
}
