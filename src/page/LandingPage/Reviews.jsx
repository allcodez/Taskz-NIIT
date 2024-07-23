import React, { useState, useEffect } from 'react';
import { TiChevronLeftOutline, TiChevronRightOutline } from 'react-icons/ti';
import '../LandingPage/reviews.css';
import ReviewExp from "../../asstes/images/reviewExp.webp"

const MAX_VISIBILITY = 3;
const AUTO_SLIDE_INTERVAL = 5000; // 5 seconds

const Card = ({ review, name, coloredText, reviewResumes, position, imageSrc }) => (
  <div className='card'>
    <h2>{review}<span>{coloredText}</span>{reviewResumes}</h2>
    <img src={imageSrc} alt={name} />
    <p>{name}</p>
    <p>{position}</p>
  </div>
);

const Carousel = ({ children }) => {
  const [active, setActive] = useState(2);
  const count = React.Children.count(children);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setActive(prevActive => 
        prevActive < count - 1 ? prevActive + 1 : 0
      );
    }, AUTO_SLIDE_INTERVAL);

    return () => clearInterval(interval);
  }, [count]);

  const handlePrevClick = () => {
    setActive(i => i - 1 >= 0 ? i - 1 : count - 1);
  };

  const handleNextClick = () => {
    setActive(i => i + 1 < count ? i + 1 : 0);
  };
  
  return (
    <div className='carousel'>
      <button className='nav left' onClick={handlePrevClick}><TiChevronLeftOutline/></button>
      {React.Children.map(children, (child, i) => (
        <div className='card-container' style={{
            '--active': i === active ? 1 : 0,
            '--offset': (active - i) / 3,
            '--direction': Math.sign(active - i),
            '--abs-offset': Math.abs(active - i) / 3,
            'pointerEvents': active === i ? 'auto' : 'none',
            'opacity': Math.abs(active - i) >= MAX_VISIBILITY ? '0' : '1',
            'display': Math.abs(active - i) > MAX_VISIBILITY ? 'none' : 'block',
          }}>
          {child}
        </div>
      ))}
      <button className='nav right' onClick={handleNextClick}><TiChevronRightOutline/></button>
    </div>
  );
};

const cardData = [
  {
    review: "Star-Tasks helps me make ",
    coloredText: "better decisions and stay focused ",
    reviewResumes: "on my priorities rather than just reacting to my schedule.",
    imageSrc: ReviewExp,
    name: "Chinyere Surname",
    position: "Counselor at NIIT"
  },
  {
    review: "The tool that has had the ",
    coloredText: "greatest impact on my life and my productivity is unquestionably ",
    reviewResumes: "Star Tasks.",
    imageSrc: ReviewExp,
    name: "Alero Surname",
    position: "Manager at NIIT"
  },
  {
    review: "I use Star Tasks to help me ",
    coloredText: "keep track of everything ",
    reviewResumes: "and make sure the most important things get  done.",
    imageSrc: ReviewExp,
    name: "Chinanu Nwachukwu",
    position: "Project Manger "
  },
  {
    review: "Star Tasks ",
    coloredText: "revolutionized my workflow, ",
    reviewResumes: "its intuitive interface and smart prioritization features helped me boost my productivity by 50%!",
    imageSrc: ReviewExp,
    name: "Amara Nwachukwu",
    position: "Student at NIIT"
  },
  {
    review: "I've tried dozens of task managers, but ",
    coloredText: "Star Tasks stands out ",
    reviewResumes: "with its seamless integration across devices and brilliant collaborative tools",
    imageSrc: ReviewExp,
    name: "Timothy Surname",
    position: "Youth Corper"
  },
  {
    review: "Star Tasks' ",
    coloredText: "neat project layout and automated reminders ",
    reviewResumes: "have made juggling multiple deadlines a breeze, it's a game-changer for busy professionals.",
    imageSrc: ReviewExp,
    name: "Favour Momodu",
    position: "Intern at NIIT"
  }
];

const Reviews = () => (
  <div className='app'>
    <Carousel>
      {cardData.map((card, index) => (
        <Card key={index} review={card.review} name={card.name} imageSrc={card.imageSrc} coloredText={card.coloredText} position={card.position} reviewResumes={card.reviewResumes}/>
      ))}
    </Carousel>
  </div>
);

export default Reviews;