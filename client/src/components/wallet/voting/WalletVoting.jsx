import React from "react";
import MainContainer from "../../_shared/MainContainer";
import Title from "../../../components/_shared/Title";
import bestLights from "../../../img/best-lights.jpg";
import bestInterior from "../../../img/best-interior.jpg";
import bestPaint from "../../../img/best-paint.jpg";
import bestRims from "../../../img/best-rims.jpg";
import bestStereo from "../../../img/best-stereo.jpg";
import styled from "styled-components";
import { Link } from "react-router-dom";

const Flex = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  align-items: center;
  height: 80%;
`;
const BestImg = styled.img`
  width: 150px;
  border-radius: 100px;
  border: 3px solid ${(props) => props.theme.yellow};
`;

export default function WalletVoting() {
  return (
    <MainContainer>
      <Title backButton="true">VOTING</Title>
      <Flex>
        <Link to="/wallet/voting/category/interior">
          <BestImg alt="Best interior" src={bestInterior} />
        </Link>
        <Link to="/wallet/voting/category/lights">
          <BestImg alt="Best lights" src={bestLights} />
        </Link>
        <Link to="/wallet/voting/category/paint">
          <BestImg alt="Best paint" src={bestPaint} />
        </Link>
        <Link to="/wallet/voting/category/rims">
          <BestImg alt="Best rims" src={bestRims} />
        </Link>
        <Link to="/wallet/voting/category/stereo">
          <BestImg alt="Best stereo" src={bestStereo} />
        </Link>
      </Flex>
    </MainContainer>
  );
}
