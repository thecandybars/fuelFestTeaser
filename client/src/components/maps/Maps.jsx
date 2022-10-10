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
  const [width, setWidth] = useState(400);
  const [clicked, setClicked] = useState("");
  console.log("🚀 ~ file: Maps.jsx ~ line 33 ~ Maps ~ clicked", clicked);
  return (
    <MainContainer>
      <input
        value={width}
        type="range"
        min="50"
        max="2000"
        onChange={(e) => setWidth(e.target.value)}
      />
      <div
        style={{
          overflowX: "visible",
          overflowY: "scroll",
          height: "600px",
          width: "400px",
          backgroundColor: "cyan",
        }}
      >
        <svg
          width={width}
          version="1.1"
          // viewBox="0 0 400 600"
          viewBox="0 0 210 297"
        >
          <g stroke="#fff" stroke-miterlimit=".7" stroke-width=".3175">
            <rect
              x="51.074"
              y="53.873"
              width="129.43"
              height="191"
              ry="64.717"
              fill="#feae2e"
            />
            <ellipse
              id="someGreenCircle"
              cx="92.178"
              cy="111.77"
              rx="20.465"
              ry="20.115"
              fill="#0f0"
              onClick={(e) => setClicked(e.target.id)}
            />
            <ellipse
              id="someRedCircle"
              cx="129.08"
              cy="194.85"
              rx="21.339"
              ry="20.29"
              fill="#f00"
              onClick={(e) => setClicked(e.target.id)}
            />
          </g>
        </svg>
      </div>
      <p>{clicked}</p>
    </MainContainer>

    // <MainContainer>
    //   <Title backButton="true">MAPS</Title>
    //   <div
    //     style={{
    //       marginBottom: "20px",
    //       display: "flex",
    //       justifyContent: "space-between",
    //     }}
    //   >
    //     <input type="text" placeholder="search" size="40" />
    //     <div>
    //       <button
    //         onClick={handleZoomOut}
    //         style={{ fontSize: "1.3rem", width: "30px" }}
    //       >
    //         -
    //       </button>
    //       <button
    //         onClick={handleZoomIn}
    //         style={{ fontSize: "1.3rem", width: "30px" }}
    //       >
    //         +
    //       </button>
    //     </div>
    //   </div>
    //   <div style={imgScroll}>
    //     <div style={imgStyle}>
    //       <img
    //         alt="sponsors"
    //         src={map}
    //         onClick={() => setLabelState((prev) => !prev)}
    //       />
    //     </div>
    //   </div>
    //   <Drawer
    //     anchor={"bottom"}
    //     open={labelState}
    //     onClose={() => setLabelState(false)}
    //   >
    //     <img alt="label" src={label} />
    //   </Drawer>
    // </MainContainer>
  );
}
