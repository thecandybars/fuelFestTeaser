import React from "react";

export default function MainContainer({ children }) {
  const style = { margin: "10px" };
  return <main style={style}>{children}</main>;
}
