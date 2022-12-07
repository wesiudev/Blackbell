import React, { useState } from 'react';
import { Image } from '../../common/types/types';
interface IGallery {
    images: Image[]
}

const GallerySlider = (props: IGallery) => {
  const [activeIndex, setActiveIndex] = useState(0);

  const handlePreviousClick = () => {
    const newIndex = activeIndex - 1;
    setActiveIndex(newIndex < 0 ? 0 : newIndex);
  };

  const handleNextClick = () => {
    const newIndex = activeIndex + 1;
    setActiveIndex(newIndex >= props.images.length ? props.images.length - 1 : newIndex);
  };

  const getTranslateX = () => {
        return `translateX(${-activeIndex * 100}%)`;
  };

  const handleDotClick = (index: number) => {
    setActiveIndex(index);
  };

  const renderDots = () => {
    return (
      <div className="slider-dots">
        {props.images.map((image: Image, index: number) => (
          <>
          <div
            key={index}
            className={`slider-dot ${index === activeIndex ? 'active' : ''}`}
            onClick={() => handleDotClick(index)}
          />
          <img             onClick={() => handleDotClick(index)}
 src={image.imageUrl} alt="" />
          </>
        ))}
      </div>
    );
  };

  return (
    <div className="slider">
      <ul
        className="slider-container"
        style={{
          transition: 'transform 0.5s ease-in-out',
          transform: `${activeIndex === 0 ? 'translateX(-40px)' : getTranslateX()}`,
        }}
      >
        {props.images.map((image: Image, index: number) => (
          <li key={index} className="slider-item">
            <img src={image.imageUrl} alt={`slide ${index}`} />
          </li>
        ))}
      </ul>
      <button className="slider-button slider-button-previous" onClick={handlePreviousClick}>
        {'<'}
      </button>
      <button className="slider-button slider-button-next" onClick={handleNextClick}>
        {'>'}
      </button>
      {renderDots()}
    </div>
  );
};

export default GallerySlider;