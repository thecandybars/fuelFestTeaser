import React from "react";
import { useNavigate } from "react-router-dom";
import { ArrowBack } from "../iconComponents";

export default function BackButton(props) {
  console.log("🚀 ~ file: BackButton.jsx ~ line 6 ~ BackButton ~ props", props);
  const { style } = props;
  const arrowBackStyle = {
    fill: "red",
    fontSize: "3rem",
    marginRight: "10px",
    ...style,
  };
  const navigate = useNavigate();
  return <ArrowBack onClick={() => navigate(-1)} style={arrowBackStyle} />;
}
