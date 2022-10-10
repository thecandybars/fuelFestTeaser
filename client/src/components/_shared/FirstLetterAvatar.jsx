import React from "react";
import styled from "styled-components";
import { theme } from "../../common/theme";

const Avatar = styled.div`
  text-align: center;
  margin-bottom: 5px;
  padding: 2px;
  height: 25px;
  width: 25px;
  border: 1px solid black;
  font-weight: bolder;
  border-radius: 50%;
`;

FirstLetterAvatar.defaulProps = {
  title: "",
  color: theme.white,
  backgroundColor: theme.black,
  fontSize: "1rem",
};

export default function FirstLetterAvatar(props) {
  return (
    <Avatar
      style={{
        color: props.color,
        backgroundColor: props.backgroundColor,
        fontSize: props.fontSize,
      }}
    >
      {props.title[0].toUpperCase()}
    </Avatar>
  );
}
