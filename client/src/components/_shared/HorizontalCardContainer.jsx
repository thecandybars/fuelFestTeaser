import React from "react";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: stretch;
  margin: 10px 0 5px;
  padding-bottom: 10px;
  border-bottom: 1px solid ${(props) => props.theme.grayLine};
  cursor: pointer;
`;

export default function HorizontalCardContainer({ children }) {
  return <Container>{children}</Container>;
}
