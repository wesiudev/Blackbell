import React, { useState } from 'react';
import { Image } from '../../common/types/types';
import './GallerySlider.scss';

const GallerySlider = (props) => {
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

  const handleDotClick = (index) => {
    setActiveIndex(index);
  };

  const renderDots = () => {
    return (
      <div className="slider-dots">
        {props.images.map((image, index) => (
          <div
            key={index}
            className={`slider-dot ${index === activeIndex ? 'active' : ''}`}
            onClick={() => handleDotClick(index)}
          />
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
          transform: getTranslateX(),
        }}
      >
        {props.images.map((image: Image, index: number) => (
          <li key={index} className="slider-item">
            <img src={image} alt={`slide ${index}`} />
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