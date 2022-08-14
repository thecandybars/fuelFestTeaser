import React from "react";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";
import style from "./css/MainFeatures.module.css";
import image01 from "../img/mainFeatures/01.jpg";
import image02 from "../img/mainFeatures/02.jpg";
import image03 from "../img/mainFeatures/03.jpg";
// import image04 from "../img/mainFeatures/04.jpg";
import image05 from "../img/mainFeatures/05.jpg";
// import defaultImage from "../img/mainFeatures/04.jpg";
// import "./styles.css";

export default class MainFeatures extends React.Component {
  render() {
    const images = [
      {
        original: image01,
        description: "Info 01",
      },
      {
        original: image02,
        description: "Info 02",
      },
      {
        original: image03,
        description: "Info 03",
      },
      // {
      //   original: image04,        description: "Info 04",

      // },
      {
        original: image05,
        description: "Info 05",
      },
    ];

    const someComponent = (props) => {
      // console.log(props.someProps.objectKey)
      return <div>{/* {props.someProps.objectKey} */}</div>;
    };

    return (
      <>
        <ImageGallery
          items={images}
          // defaultImage={defaultImage}
          showBullets={true}
          showIndex={false}
          showThumbnails={false}
          lazyLoad={true}
          showPlayButton={false}
          showFullscreenButton={false}
          renderCustomControls={someComponent}
          additionalClass={style.image}
        />
      </>
    );
  }
}
