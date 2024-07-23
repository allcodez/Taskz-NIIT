import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import './aos.css';

function ReverseAos({
  text1,
  text2,
  image,
  altText
}) {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      easing: 'ease-in-out',
      once: true,
    });
  }, []);

  const firstElement = (
    <div className='two' >
      <div className="text-container">
        <h2>{text1}</h2>
        <p>{text2}</p>
      </div>
    </div>
  );

  const secondElement = (
    <div data-aos={'fade-up'} data-aos-duration={1000} className='three one'>
      <img src={image} alt={altText} />
    </div>
  );

//   console.log('Order:', order); // Debugging line to check the value of order

  return (
    <div className="reverse aos-component">
          {secondElement}
          {firstElement}
    </div>
  );
}

export default ReverseAos;












