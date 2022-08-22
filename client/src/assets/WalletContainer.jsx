import React from "react";

export default function MainContainer({ children }) {
  const style = {
    margin: "10px",
    height: "570px",
    // backgroundColor: "#1a1a1a",
  };
  return <main style={style}>{children}</main>;
}
