import React, { useState } from "react";
import style from "./css/PhotoSlider.module.css";

export default function PhotoSlider(props) {
  const [index, setIndex] = useState(0);
  const apiURL = process.env.REACT_APP_API;
  return (
    <div className={style.slider_container}>
      <button
        onClick={(e) => {
          e.stopPropagation();
          setIndex((currentIndex) =>
            currentIndex > 0 ? currentIndex - 1 : props.images.length - 1
          );
        }}
      >
        &lt;
      </button>
      {props.images.length && (
        <img
          alt="car"
          src={`${apiURL}/${props.images[index]}`}
          onClick={(e) => e.stopPropagation()} // ignore click on image
        />
      )}
      <button
        onClick={(e) => {
          e.stopPropagation();

          setIndex((currentIndex) =>
            currentIndex < props.images.length - 1 ? currentIndex + 1 : 0
          );
        }}
      >
        &gt;
      </button>
    </div>
  );
}
