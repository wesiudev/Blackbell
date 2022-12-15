import React, { useState, useEffect } from "react";
import { useSwipeable } from "react-swipeable";
import { Image } from "../../common/types/types";

interface IGallery {
  images: Image[];
  activeIndex: number;
  setActiveIndex: Function;
}

const GallerySlider = (props: IGallery) => {
  const { images, activeIndex, setActiveIndex } = props;

  return (
    <>
      <div className="gallery">
        {images.map((image: Image, idx: number) => (
          <div
            key={idx}
            className="item"
            style={{
              visibility: `${activeIndex === idx ? "visible" : "hidden"}`,
              display: `${activeIndex === idx ? "block" : "none"}`,
            }}
          >
            <img src={image.imageUrl} alt="" />
          </div>
        ))}
      </div>
    </>
  );
};

export default GallerySlider;
