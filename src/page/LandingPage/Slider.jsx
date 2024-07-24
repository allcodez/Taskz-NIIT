import React from 'react';
import './slider.css';

import image1 from '../../asstes/images/Micheal.jpg';
import image2 from '../../asstes/images/Ify.jpg';
import image3 from '../../asstes/images/Roni.jpg';
import image4 from '../../asstes/images/Amara.jpg';
import image5 from '../../asstes/images/Teni.jpg';
import image6 from '../../asstes/images/alex.png';

const images = [
  { src: image1, name: 'Micheal', caption: 'Backend Developer', description: 'As a Backend Developer, I am passionate about creating robust and scalable server-side applications.' },
  { src: image2, name: 'Ify', caption: 'Mobile Developer', description: 'As a Mobile Developer, I strive to build seamless and user-friendly mobile applications.' },
  { src: image3, name: 'Fahd', caption: 'React Developer', description: 'As a React Developer, I am dedicated to delivering clean and efficient UIs using the latest technologies.' },
  { src: image4, name: 'Amara', caption: 'React Developer', description: 'As a React Developer, I focus on crafting responsive and dynamic user interfaces.' },
  { src: image5, name: 'Teni', caption: 'Mobile Developer', description: 'As a Mobile Developer, my passion lies in creating intuitive and engaging mobile experiences.' },
  { src: image6, name: 'Alex', caption: 'Network Engineer', description: 'As a Network Engineer, I ensure our network infrastructure is reliable, secure, and efficient.' }
];

const Slider = () => {
  return (
    <div className="slider">

      <div className="demo">
        {images.map((image, index) => (
          <div key={index} className="demo__div people">
            <div className="people__div people__div--img">
              <img src={image.src} alt={image.name} className="people__img" />
            </div>
            <div className="people__div people__div--info">
              <h2 className="people__name">{image.name}</h2>
              <p className="people__desc">{image.description}</p>
            </div>
            <div className="people__div people__div--name">
              <h2 className="people-name">{image.caption}</h2>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Slider;
