import React from "react";
import { useNavigate } from "react-router-dom";
import { ArrowBack } from "../iconComponents";

export default function BackButton(props) {
  const { style } = props;
  const arrowBackStyle = {
    fill: "white",
    fontSize: "1rem",
    ...style,
  };
  const navigate = useNavigate();
  return <ArrowBack onClick={() => navigate(-1)} style={arrowBackStyle} />;
}
