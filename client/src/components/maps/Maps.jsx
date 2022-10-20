import { Dialog, Drawer } from "@mui/material";
import React, { useEffect, useState } from "react";
import MainContainer from "../_shared/MainContainer";
import Title from "../../components/_shared/Title";
import map from "../../img/maps/map1.jpeg";
import label from "../../img/maps/map2.png";
import originalMap from "./originalMap";
import { Location } from "../../iconComponents";
import SvgMapaFf from "./MapaFF";
import {
  TransformComponent,
  TransformWrapper,
} from "@pronestor/react-zoom-pan-pinch";
import { getMapLocation } from "../../services/mapLocation";
import DialogLocationData from "./DialogLocationData";
import style from "./Maps.module.css";

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
  const [clicked, setClicked] = useState("");
  const [zoomIn, setZoomIn] = useState("");
  const [yPos, setYpos] = useState(0);
  const [xPos, setXpos] = useState(0);

  // CLICK ON LOCATION
  const [locationData, setLocationData] = useState({});
  const handleOnClick = async (e) => {
    const response = await getMapLocation(e.target.id);
    setLocationData(response.data);
  };
  // DIALOG
  const [dialogOpen, setDialogOpen] = useState(false);
  const handleDialogClose = () => setDialogOpen(false);
  useEffect(() => {
    Object.keys(locationData).length > 0 && setDialogOpen(true);
  }, [locationData]);
  // TRANSFORM
  const [userTransform, setUserTransform] = useState({ x: 0, y: 0, scale: 0 });
  // ZOOM

  return (
    <>
      <Drawer
        anchor="bottom"
        onClose={handleDialogClose}
        open={dialogOpen}
        variant="persistent"
        className={style.drawer}
      >
        {Object.keys(locationData).length > 0 && (
          <DialogLocationData data={locationData} close={handleDialogClose} />
        )}
      </Drawer>
      <MainContainer>
        <Title backButton="true">MAPS</Title>

        <div
          style={{
            overflowX: "hidden",
            overflowY: "hidden",
            height: "90%",
            // border: "2px solid red",
          }}
        >
          <TransformWrapper
            wheel={{ step: 0.04 }}
            initialScale={2.8}
            centerOnInit={true}
            centerZoomedOut={true}
            maxScale={20}
          >
            {({ setTransform, resetTransform, ...rest }) => (
              <>
                {/* <button
                  onClick={() =>
                    setTransform(
                      userTransform.x,
                      userTransform.y,
                      userTransform.scale,
                      1500
                    )
                  }
                >
                  setTransform
                </button>
                <button onClick={() => resetTransform()}>Reset</button>
                <input
                  value={userTransform.x}
                  onChange={(e) => setUserTransform({ x: e.target.value })}
                />
                <input
                  value={userTransform.y}
                  onChange={(e) => setUserTransform({ y: e.target.value })}
                />
                <input
                  value={userTransform.scale}
                  onChange={(e) => setUserTransform({ scale: e.target.value })}
                /> */}
                <TransformComponent
                  style={{ display: "flex", alignItems: "flex-start" }}
                >
                  <SvgMapaFf
                    width="400px"
                    height="75vh"
                    handleOnClick={handleOnClick}
                  />
                </TransformComponent>
              </>
            )}
          </TransformWrapper>
        </div>
      </MainContainer>
    </>

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
