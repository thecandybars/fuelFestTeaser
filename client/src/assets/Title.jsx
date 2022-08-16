import React from "react";

export default function Title(props) {
  const style = {
    fontFamily: "Oswald, sans-serif",
  };
  return <h1 style={style}>{props.title}</h1>;
}
