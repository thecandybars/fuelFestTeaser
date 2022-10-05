import React from "react";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";
import image001 from "../../img/mainFeatures/10.jpeg";
import image002 from "../../img/mainFeatures/11.jpeg";
import image003 from "../../img/mainFeatures/12.jpeg";

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
          additionalClass={{
            width: "100%",
            objectFit: "contain",
            objectPosition: "center",
          }}
        />
        {/* <img alt="" src={placeholder} /> */}
      </>
    );
  }
}
