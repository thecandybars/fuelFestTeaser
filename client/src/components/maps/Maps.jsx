import { Drawer } from "@mui/material";
import React, { useEffect, useState } from "react";
import MainContainer from "../_shared/MainContainer";
import Title from "../../components/_shared/Title";
import map from "../../img/maps/map1.jpeg";
import label from "../../img/maps/map2.png";

export default function Maps() {
  // ZOOM
  const [zoom, setZoom] = useState(300);
  const step = 1.2;
  const handleZoomIn = () =>
    setZoom((prev) => (prev >= 700 ? 700 : parseInt(prev * step)));
  const handleZoomOut = () =>
    setZoom((prev) => (prev <= 100 ? 100 : parseInt(prev / step)));

  // LABEL
  const [labelState, setLabelState] = useState(false);

  // STYLES
  const imgScroll = {
    width: "100vw",
    height: "100vh",
    overflow: "scroll",
  };
  const imgStyle = {
    width: `${zoom}%`,
    height: `${zoom}%`,
    transition: " 250ms cubic-bezier(0.5, 0, 0.5, 1)",
  };
  return (
    <MainContainer>
      <Title backButton="true">MAPS</Title>
      <div
        style={{
          marginBottom: "20px",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <input type="text" placeholder="search" size="40" />
        <div>
          <button
            onClick={handleZoomOut}
            style={{ fontSize: "1.3rem", width: "30px" }}
          >
            -
          </button>
          <button
            onClick={handleZoomIn}
            style={{ fontSize: "1.3rem", width: "30px" }}
          >
            +
          </button>
        </div>
      </div>
      <div style={imgScroll}>
        <div style={imgStyle}>
          <img
            alt="sponsors"
            src={map}
            onClick={() => setLabelState((prev) => !prev)}
          />
        </div>
      </div>
      <Drawer
        anchor={"bottom"}
        open={labelState}
        onClose={() => setLabelState(false)}
      >
        <img alt="label" src={label} />
      </Drawer>
    </MainContainer>
  );
}
