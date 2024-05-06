import React, { useState } from 'react';
import './category.css';
import '../sideBar/sideBar.css';

const Category = ({ category }) => {
  const [isDropDownOpen, setIsDropDownOpen] = useState(true);

  const toggleSidebar = () => {
    setIsDropDownOpen(!isDropDownOpen);
  };

  return (
    <div className="category">
      <p className="category-name" onClick={toggleSidebar}>
        <i className={`bx ${isDropDownOpen ? 'bx-chevron-right' : 'bx-chevron-down'} toggle`}></i>
        {category.name}
      </p>
      {!isDropDownOpen && (
        <ul className="category-list">
          {category.items.map((item, index) => (
            <li key={index} className="category-item">
              <a href="#">
                <span className="text nav-text">#{item}</span>
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Category;
