import React from "react";

export default function Button2(props) {
  const { options } = props;
  const { style } = props;
  const isDisabled = props.disabled ? props.disabled : false;
  return (
    <button
      type="button"
      onClick={props.onClick}
      disabled={isDisabled}
      {...options}
      style={{
        color: "white",
        padding: "5px 10px",
        backgroundColor: isDisabled ? "#444444" : "#DA1921",
        textDecoration: "none",
        borderRadius: "12px",
        boxShadow: "none",
        ...style,
      }}
    >
      {props.title}
    </button>
  );
}
