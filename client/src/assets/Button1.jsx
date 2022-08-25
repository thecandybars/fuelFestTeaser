import React from "react";

export default function Button1(props) {
  return (
    <div
      onClick={() => props.onClick}
      style={{
        fontFamily: "Oswald",
        width: "fit-content",
        margin: "0 auto",
        color: "#d9d9d9",
        padding: "3px 25px",
        backgroundColor: "#DA1921",
        textDecoration: "none",
        borderRadius: "15px",
        ...props.style,
      }}
    >
      {props.title}
    </div>
  );
}
