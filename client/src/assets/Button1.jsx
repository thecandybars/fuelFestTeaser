import React from "react";

export default function Button1(props) {
  const { style } = props;
  return (
    <a
      href={props.href}
      style={{
        color: "white",
        padding: "5px 10px",
        backgroundColor: "#DA1921",
        textDecoration: "none",
        borderRadius: "12px",
        ...style,
      }}
    >
      {props.title}
    </a>
  );
}
