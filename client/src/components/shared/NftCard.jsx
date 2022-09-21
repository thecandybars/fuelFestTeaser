import React from "react";
import styled from "styled-components";

const Card = styled.div`
  width: 150px;
  font-family: "Oswald";
  text-align: center;
  /* font-size: smaller; */
  margin-top: 20px;
`;
const PrimaryButton = styled.div`
  width: fit-content;
  padding: 0px 25px;
  border: none;
  border-radius: 15px;
`;
const SecondaryButton = styled.div`
  color: ${(props) => props.theme.yellow};
  width: fit-content;
`;
const Title = styled.div`
  height: 54px;
  display: flex;
  align-items: center;
  justify-content: center;
  h2 {
    font-size: 1rem;
    color: ${(props) => props.theme.white};
  }
`;
const Price = styled.p`
  color: ${(props) => props.theme.yellow};
`;
const NftImage = styled.img`
  width: 200px;
  /* border: 2px solid ${(props) => props.theme.yellow}; */
  border-radius: 2%;
`;
const ButtonsRow = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  margin-top: 5px;
`;

/// DEFAULT
NftCard.defaultProps = {
  id: "",
  title: "myTitle",
  price: 666,
  image: "",
  primaryActionTitle: "BUY",
  primaryAction: (e) => console.log("Primary action! " + e),
  primaryActionColor: "purple",
  secondaryActionTitle: "Details",
  secondaryAction: (e) => console.log("Secondary action !" + e),
};
export default function NftCard(props) {
  return (
    <>
      <Card>
        <NftImage
          alt={props.title}
          src={props.image}
          onClick={() => props.primaryAction(props.id)}
        />
        <Title>
          <h2>{props.title}</h2>
        </Title>
        <Price>{props.price} DRIFT</Price>
        <ButtonsRow>
          <SecondaryButton onClick={() => props.secondaryAction(props.id)}>
            {props.secondaryActionTitle}
          </SecondaryButton>
          <PrimaryButton
            onClick={() => props.primaryAction(props.id)}
            style={{ backgroundColor: props.primaryActionColor }}
          >
            {props.primaryActionTitle}
          </PrimaryButton>
        </ButtonsRow>
      </Card>
    </>
  );
}
