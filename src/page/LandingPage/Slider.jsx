import React, { useState, useEffect } from 'react';
import './slider.css';

import image1 from '../../asstes/images/Micheal.jpg';
import image2 from '../../asstes/images/Ify.jpg';
import image3 from '../../asstes/images/Roni.jpg';
import image4 from '../../asstes/images/Amara.jpg';
import image5 from '../../asstes/images/Teni.jpg';
import image6 from '../../asstes/images/Micheal.jpg';

const images = [
  { src: image1, caption: 'Backend Developer' },
  { src: image2, caption: 'Mobile Developer' },
  { src: image3, caption: 'React Developer' },
  { src: image4, caption: 'React Developer' },
  { src: image5, caption: 'Mobile Developer' },
  { src: image6, caption: 'Network Engineer' }
];

const Slider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const totalImages = images.length;
  const imagesPerPage = 3;

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === totalImages - imagesPerPage ? 0 : prevIndex + 1
      );
    }, 3000); // Change image every 3 seconds

    return () => clearInterval(interval);
  }, [totalImages]);

  const goToPrevious = () => {
    setCurrentIndex(currentIndex === 0 ? totalImages - imagesPerPage : currentIndex - 1);
  };

  const goToNext = () => {
    setCurrentIndex(currentIndex === totalImages - imagesPerPage ? 0 : currentIndex + 1);
  };

  const currentImages = [
    ...images.slice(currentIndex, currentIndex + imagesPerPage),
    ...(currentIndex + imagesPerPage > totalImages ? images.slice(0, (currentIndex + imagesPerPage) % totalImages) : [])
  ];

  return (
    <div className="slider">
      <button className="next" onClick={goToNext}>
        &#10094;
      </button>
      <div className="image-container">
        {currentImages.map((image, index) => (
          <div key={index} className="slide">
            <img src={image.src} alt={`slide ${index}`} />
            <div className="caption">{image.caption}</div>
          </div>
        ))}
      </div>
      <button className="prev" onClick={goToPrevious}>
        &#10095;
      </button>
    </div>
  );
};

export default Slider;
