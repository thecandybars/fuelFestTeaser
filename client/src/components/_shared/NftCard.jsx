import { Badge } from "@mui/material";
import React from "react";
import styled from "styled-components";

const Card = styled.div`
  width: 150px;
  font-family: "Oswald";
  text-align: center;
  margin-top: 20px;
`;
const PrimaryButton = styled.div`
  width: fit-content;
  padding: 0px 25px;
  border: none;
  border-radius: 15px;
  margin: 0 auto;
`;
const SecondaryButton = styled.div`
  color: ${(props) => props.theme.yellow};
  width: fit-content;
  text-decoration: underline;
`;
const Title = styled.div`
  height: 54px;
  display: flex;
  align-items: center;
  justify-content: center;
  h2 {
    font-size: 1.1rem;
    color: ${(props) => props.theme.white};
  }
`;
const Price = styled.p`
  font-size: 0.9rem;
  color: ${(props) => props.theme.yellow};
`;

const NftImage = styled.img`
  width: 200px;
  border-radius: 2%;
`;
const NftVideo = styled.video`
  height: 232px;
  border-radius: 2%;
`;
const TwoColumns = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: flex-start;
  padding-top: 2px;
  width: 100%;
`;

/// DEFAULT
NftCard.defaultProps = {
  id: "",
  type: "carCard",
  title: "myTitle",
  price: 666,
  image: "",
  imageType: "image",
  badge: 0,
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
        <Badge
          badgeContent={props.badge}
          color="red"
          anchorOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          overlap="rectangular"
          style={{
            "&.MuiBadgeBadge": {
              color: "yellow",
              backgroundColor: "#686868",
            },
          }}
        >
          {props.imageType === "image" && (
            <NftImage
              alt={props.title}
              src={props.image}
              onClick={() => props.primaryAction(props.id)}
            />
          )}
          {props.imageType === "video" && (
            <NftVideo
              autoPlay
              loop
              onClick={() => props.primaryAction(props.id)}
            >
              <source src={props.image} type="video/mp4" />
            </NftVideo>
          )}
        </Badge>

        <Title>
          <h2>{props.title}</h2>
        </Title>

        {/* <Price>{props.price} DRIFT</Price> */}
        <TwoColumns>
          <SecondaryButton onClick={() => props.secondaryAction(props.id)}>
            {props.secondaryActionTitle}
          </SecondaryButton>
          <div>
            <PrimaryButton
              onClick={() => props.primaryAction(props.id)}
              style={{ backgroundColor: props.primaryActionColor }}
            >
              {props.primaryActionTitle}
            </PrimaryButton>
            <Price>{props.price} DRIFT</Price>
          </div>
        </TwoColumns>
      </Card>
    </>
  );
}
