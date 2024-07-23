import React from 'react';
import '../../page/LandingPage/button.css';

const Button = ({ initialText, hoverText, className, onClick }) => {
  return (
    <button className={`fill-button ${className}`} onClick={onClick}>
      <span className="button-text" data-hover={hoverText}>
        {initialText}
      </span>
    </button>
  );
};

export default Button;
