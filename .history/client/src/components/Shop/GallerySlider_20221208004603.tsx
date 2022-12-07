import React, { useState, useEffect } from 'react';
import {useSwipeable} from 'react-swipeable';
import { Image } from '../../common/types/types';
interface IGallery {
    images: Image[]
}

const GallerySlider = (props: IGallery) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [dotsVisible, setDotsVisible] = useState(true);

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

  const handleDotsVisibility = (show: boolean) => {
    setDotsVisible(show)
  };

  useEffect(()=>{
    setTimeout(()=>{
        handleDotsVisibility(false)
    },4500)
  },[])

  const renderDots = () => {
    return (
      <div style={{opacity:`${dotsVisible ? '1' : '0'}`,transition:'.5  s'}} className="slider-dots">
        {props.images.map((image: Image, index: number) => (
          <div
          onMouseEnter={() => setDotsVisible(true)}
            key={index}
            onClick={() => handleDotClick(index)}
            className='slider-dot'
            >
          <img 
            className={`${index === activeIndex ? 'active' : ''}`}
            onClick={() => handleDotClick(index)}
            src={image.imageUrl} alt="" />
            </div>
        ))}
      </div>
    );
  };

  
  const swipeHandlers = useSwipeable({
    onSwipedLeft: () => handlePreviousClick() ,
    onSwipedRight: () => console.log('user swiped') ,
    swipeDuration: 500,
    preventScrollOnSwipe: true,
    trackMouse: true,
  });
  return (
    <div
    {...swipeHandlers}    
    onMouseEnter={() => setDotsVisible(true)} 
    onMouseLeave={() => handleDotsVisibility(false)}
    className="slider">
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
      <button onMouseEnter={() => setDotsVisible(true)} style={{opacity:`${dotsVisible ? '1' : '0'}`,transition:'.5s'}} className="slider-button slider-button-previous" onClick={handlePreviousClick}>
        {'<'}
      </button>
      <button onMouseEnter={() => setDotsVisible(true)} style={{opacity:`${dotsVisible ? '1' : '0'}`,transition:'.5s'}} className="slider-button slider-button-next" onClick={handleNextClick}>
        {'>'}
      </button>
      {renderDots()}
    </div>
  );
};

export default GallerySlider;