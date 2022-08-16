import React from "react";

export default function MainContainer({ children }) {
  const style = {
    margin: "10px",
    height: "500px",
  };
  return <main style={style}>{children}</main>;
}
