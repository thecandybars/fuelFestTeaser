import React from "react";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";
import style from "./css/MainFeatures.module.css";
import image001 from "../img/mainFeatures/10.jpeg";
import image002 from "../img/mainFeatures/11.jpeg";
import image003 from "../img/mainFeatures/12.jpeg";
// import image001 from "../img/mainFeatures/001.jpg";
// import image002 from "../img/mainFeatures/002.jpg";
// import image003 from "../img/mainFeatures/003.jpg";
// import image004 from "../img/mainFeatures/004.jpg";
// import image005 from "../img/mainFeatures/005.jpg";
// import image006 from "../img/mainFeatures/006.jpg";
// import placeholder from "../img/mainSlideshowPlaceholder.jpeg";
// import defaultImage from "../img/mainFeatures/04.jpg";
// import "./styles.css";

export default class MainFeatures extends React.Component {
  render() {
    const images = [
      {
        original: image001,
      },
      {
        original: image002,
      },
      {
        original: image003,
      },
      // {
      //   original: image004,
      // },
      // {
      //   original: image005,
      // },
      // {
      //   original: image006,
      // },
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
          autoPlay={true}
          showFullscreenButton={false}
          slideInterval={8000}
          renderCustomControls={someComponent}
          additionalClass={style.image}
        />
        {/* <img alt="" src={placeholder} /> */}
      </>
    );
  }
}
