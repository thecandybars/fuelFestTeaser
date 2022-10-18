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

UpgradeIconsRow.defaultProps = {
  max: 4,
};

export default function UpgradeIconsRow(props) {
  // AVATAR LIST
  let renderCarUpgradeList = upgrades
    .map(
      (upgrade) =>
        props.carDetails[upgrade.field] !== "" && (
          <Avatar
            sx={{
              bgcolor: theme.black,
              fill: theme.white,
              width: "33px",
              height: "33px",
              fontSize: "3rem",
              border: "2px solid " + theme.white,
              marginRight: "2px",
              padding: "5px",
              ...props.style,
            }}
            key={upgrade.field}
          >
            {upgrade.icon}
          </Avatar>
        )
    )
    .filter((avatar) => !!avatar); //filter out empty (=false) elements in array

  // OVERFLOW AVATAR
  const overflow = renderCarUpgradeList.length - props.max;
  renderCarUpgradeList = renderCarUpgradeList.slice(0, props.max);
  if (overflow > 0)
    renderCarUpgradeList.push(
      <Avatar
        sx={{
          bgcolor: "transparent",
          color: theme.white,
          fontSize: "1.2rem",
          border: "0px",
          ...props.overflowStyle,
        }}
        key={"overflow"}
      >
        {"+" + overflow}
      </Avatar>
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
    <div style={{ display: "flex", alignItems: "center" }}>
      {renderCarUpgradeList}
    </div>
  );
}
