import { Avatar, AvatarGroup } from "@mui/material";
import React from "react";
import { theme } from "../../common/theme";
import {
  UpEngine,
  UpBody,
  UpSuspension,
  UpNitro,
  UpBrakes,
  UpTires,
  UpLights,
  UpStereo,
  UpOthers,
} from "../../iconComponents";

export const upgrades = [
  {
    field: "engine",
    icon: <UpEngine />,
  },
  {
    field: "body",
    icon: <UpBody />,
  },
  {
    field: "suspension",
    icon: <UpSuspension />,
  },
  {
    field: "nitro",
    icon: <UpNitro />,
  },
  {
    field: "brakes",
    icon: <UpBrakes />,
  },
  {
    field: "tires",
    icon: <UpTires />,
  },
  {
    field: "lights",
    icon: <UpLights />,
  },
  {
    field: "stereo",
    icon: <UpStereo />,
  },
  {
    field: "others",
    icon: <UpOthers />,
  },
];

export default function UpgradeIconsRow(props) {
  const renderCarUpgradeList = upgrades.map(
    (upgrade) =>
      props.carDetails[upgrade.field] !== "" && (
        <Avatar
        //   sx={{
        //     bgcolor: theme.black,
        //     fill: theme.white,
        //     width: "30px",
        //     height: "30px",
        //     fontSize: "1.5rem",
        //   }}
        >
          {upgrade.icon}
        </Avatar>
      )
  );
  //   const renderCarUpgradeList = upgrades.map(
  //     (upgrade) =>
  //       props.carDetails[upgrade.field] !== "" && (
  //         <div
  //           style={{
  //             fontSize: "1.8rem",
  //             marginRight: "10px",
  //             fill: theme.white,
  //             ...props.style,
  //           }}
  //           key={upgrade.field}
  //         >
  //           {upgrade.icon}
  //         </div>
  //       )
  //   );
  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <h5 style={{ marginBottom: "5px" }}>Upgrades: </h5>
      <AvatarGroup
        sx={{
          "& .MuiAvatar-root": {
            bgcolor: theme.black,
            fill: theme.white,
            width: "30px",
            height: "30px",
            fontSize: "1.5rem",
          },
          "& .MuiAvatar-root :nth-last-child(0)": {
            fontSize: "1.1rem",
          },
        }}
        max={6}
        spacing="-2"
      >
        {renderCarUpgradeList}
      </AvatarGroup>
    </div>

    // <div
    //   style={{
    //     display: "flex",
    //     justifyContent: "flex-start",
    //     alignItems: "center",
    //     flexWrap: "wrap",
    //   }}
    // >
    //   {/* <h5>Upgrades: </h5> */}
    //   {renderCarUpgradeList}
    // </div>
  );
}
