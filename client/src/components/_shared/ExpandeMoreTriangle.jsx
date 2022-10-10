import React from "react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

export default function ExpandeMoreTriangle(props) {
  return (
    <div style={{ fontSize: "1rem", marginLeft: "20px" }}>
      <ExpandMoreIcon
        style={{
          transform: !props.open ? "rotate(0deg)" : "rotate(180deg)",
        }}
      />
    </div>
  );
}
