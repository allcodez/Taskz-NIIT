import React, { useState, useContext, useEffect } from 'react';
import './category.css';
import '../sideBar/sideBar.css';
import { CategoryContext } from '../../../hooks/CategoryContext';

const Category = ({ category }) => {
  const [isDropDownOpen, setIsDropDownOpen] = useState(true);
  const { setSelectedCategory, selectedCategory } = useContext(CategoryContext);
  const [activeCategory, setActiveCategory] = useState(null);

  const handleCategorySelect = () => {
    if (category.name === 'All') {
      setSelectedCategory('All');
    } else {
      setSelectedCategory(category.name);
    }
  };

  useEffect(() => {
    // Reset activeCategory when a new category is selected
    if (selectedCategory === 'All') {
      setActiveCategory(null);
    } else if (selectedCategory === category.name) {
      setActiveCategory(category.name);
    } else {
      setActiveCategory(null);
    }
  }, [selectedCategory, category.name]);

  const toggleSidebar = () => {
    setIsDropDownOpen(!isDropDownOpen);
  };

  return (
    <div className="category">
      <li className="category-name">
        <div
          className={`category-content ${activeCategory === category.name ? 'active' : ''}`}
          onClick={handleCategorySelect}
        >
          <i className={`bx ${isDropDownOpen ? 'bx-chevron-right' : 'bx-chevron-down'} toggle`}></i>
          <p>{category.name}</p>
        </div>
      </li>
    </div>
  );
};

export default Category;