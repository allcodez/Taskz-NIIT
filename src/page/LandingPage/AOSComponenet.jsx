import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import './aos.css';

function AOSComponent({
  text1,
  text2,
  image,
  altText,
  aosAnimationType1,
  aosAnimationType2,
  aosDuration1,
  aosDuration2,
}) {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      easing: 'ease-in-out',
      once: true,
    });
  }, []);

  const firstElement = (
    <div data-aos={aosAnimationType1} data-aos-duration={aosDuration1} className='one'>
      <div className="text-container">
        <h2>{text1}</h2>
        <p>{text2}</p>
      </div>
    </div>
  );

  const secondElement = (
    <div data-aos={aosAnimationType2} data-aos-duration={aosDuration2} className='two'>
      <img src={image} alt={altText} />
    </div>
  );

//   console.log('Order:', order); // Debugging line to check the value of order

  return (
    <div className="aos-component">
          {firstElement}
          {secondElement}
    </div>
  );
}

export default AOSComponent;
