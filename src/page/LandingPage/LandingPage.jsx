import React, { useState, useEffect } from 'react';
import Spline from '@splinetool/react-spline';
import './landingPage.css';
import { FaBars, FaTimes } from 'react-icons/fa';
import AOSComponent from './AOSComponenet';
import ReverseAos from './ReverseAos';
import tasks from '../../asstes/images/tasks.jpg'
import weather from '../../asstes/images/Screenshot (22).png'
import calendar from '../../asstes/images/calendar.jpg'
import confetti from '../../asstes/images/confetti.jpg';
import ai from '../../asstes/images/ai.jpg'
import Slider from './Slider';
import Footer from './Footer';

export default function LandingPage() {
  const [isMobile, setIsMobile] = useState(false);
  const [activeLink, setActiveLink] = useState('#home');

  const handleToggle = () => {
    setIsMobile(!isMobile);
  };

  const handleScroll = (event) => {
    const target = event.target;
    const sections = ['home', 'features', 'about', 'contact'];
    const scrollPosition = target.scrollingElement.scrollTop;

    sections.forEach(section => {
      const element = document.getElementById(section);
      if (element && element.offsetTop <= scrollPosition && element.offsetTop + element.offsetHeight > scrollPosition) {
        setActiveLink(`#${section}`);
      }
    });
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const scrollToSection = (section) => {
    const element = document.getElementById(section);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div>
      <nav className="navbar">
        <div className="logo">
          <h1>STAR TASKS</h1>
        </div>
        <div className={isMobile ? 'nav-links-mobile' : 'nav-links-container'}>
          <ul className="nav-links" onClick={(event) => { event.stopPropagation(); setIsMobile(false); }}>
            <li><a href="#home" className={activeLink === '#home' ? 'active' : ''} onClick={() => scrollToSection('home')}>Home</a></li>
            <li><a href="#services" className={activeLink === '#services' ? 'active' : ''} onClick={() => scrollToSection('features')}>Features</a></li>
            <li><a href="#about" className={activeLink === '#about' ? 'active' : ''} onClick={() => scrollToSection('about')}>About</a></li>
            <li><a href="#contact" className={activeLink === '#contact' ? 'active' : ''} onClick={() => scrollToSection('contact')}>Contact</a></li>
          </ul>
          <div className="nav-buttons">
            <button className="nav-button login">Login</button>
            <button className="nav-button signup">Sign Up</button>
          </div>
        </div>
        <button className="mobile-menu-icon" onClick={handleToggle}>
          {isMobile ? <FaTimes /> : <FaBars />}
        </button>
      </nav>
      <div id="home" className="section">
        <div className="ad-container">
          <div className="advert">
            <h1>Control your time better</h1>
            <p>With our brand new task manager, gain control over your every minute. Plan your day and make each minute count</p>
            <p>We help you plan your day, and manage your time effectively. With star tasks you get a super power; time control.</p>
            <p>Stay organized and boost your productivity with our simple, no-fuss task manager. Easily track your to-do lists and deadlines. Prioritize tasks and never miss a beat. Get things done effortlessly, every day!</p>
            <button className='ad-button'>Sign up now!</button>
          </div>
          <div className="spline">
          <Spline className="actualSpline" scene="https://prod.spline.design/OyWDdiEZ26PUkid1/scene.splinecode" />
          </div>
          <Spline className="mobileSpline" scene="https://prod.spline.design/FJRMT1Aiylro4fDL/scene.splinecode" />
        </div>
      </div>
      <div id="features" className="section">
      <div className="title">
        <h3>FEATURES</h3>
        <div className="divider"></div>
      </div>
        <AOSComponent
          text1="Guided daily planning"
          text2="Be intentional about how you spend your time. Plan your day using a step-by-step routine."
          image={tasks}
          altText="Tasks"
          aosAnimationType1="slide-left"
          aosAnimationType2="slide-right"
          aosDuration1={1000}
          aosDuration2={1000}
        />
                <ReverseAos
          text1="Outdoor plans??"
          text2="We've got your back. With our weather feature optimize your outdoor plans and maximize your time."
          image={weather}
          altText="Tasks"
          aosAnimationType1="fade-in"
          aosAnimationType2="slide-right"
          aosDuration1={1000}
          aosDuration2={1000}
        />
                <AOSComponent
          text1="Celebrate your wins with us"
          text2="A win a day is exactly what the doctor recommends. Celebrate your wins with us everyday, every tasks completed is a reason to celebrate. You're one step closer to your goal."
          image={confetti}
          altText="Tasks"
          aosAnimationType1="fade-right"
          aosAnimationType2="fade-out"
          aosDuration1={1000}
          aosDuration2={1000}
        />
                        <ReverseAos
          text1="Need some help with planning??"
          text2="We've got your back. Our AI Star is always available to help you plan your tasks, and help you keep track of them."
          image={ai}
          altText="Tasks"
          aosAnimationType1="flip-left"
          aosAnimationType2="zoom-in"
          aosDuration1={1000}
          aosDuration2={1000}
        />
        <AOSComponent
          text1="Time boxing"
          text2="Schedule your tasks to your calendar. Complete your plan for the day."
          image={calendar}
          altText="Tasks"
          aosAnimationType1="flip-up"
          aosAnimationType2="fade-out-right"
          aosDuration1={1000}
          aosDuration2={1000}
        />
</div>
      <div id="about" className="section about">
      <div className="title">
        <h3>MEET THE TEAM</h3>
        <div className="divider"></div>
      </div>
        <Slider />
      </div>
      <div className="urging">
        <h2>What are you waiting for? Sign up today!!</h2>
        <button className='ad-button'>Sign up now!</button>
      </div>
      <div id="contact" className="section">
      <div className="title">
        <h3>GET IN TOUCH</h3>
        <div className="divider"></div>
      </div>
      < Footer />
      </div>
    </div>
  );
}