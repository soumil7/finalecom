import React, { useState } from 'react';
import './MobileSidebar.css';

const MobileSidebar = ({ open, handleClose }) => {
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [priceRange, setPriceRange] = useState([0, 1000]);

  const handleCategoryChange = (category) => {
    setSelectedCategories((prev) => {
      if (prev.includes(category)) {
        return prev.filter((c) => c !== category); // Deselect category
      } else {
        return [...prev, category]; // Select category
      }
    });
  };

  const handlePriceChange = (event) => {
    const value = event.target.value;
    setPriceRange([0, value]); // Set the maximum price
  };

  const applyFilters = () => {
    console.log("Selected Categories: ", selectedCategories);
    console.log("Selected Price Range: ", priceRange);
    handleClose(); // Close sidebar after applying filters
  };

  return (
    <div className={`sideBar ${open ? 'flex' : 'hidden'}`}>
      <div className="sidebar-content">
        <button className="close-button" onClick={handleClose}>
          &times;
        </button>
        <h2 className="sidebar-title">Filters</h2>

        {/* Categories Filter */}
        <div className="filter">
          <h3>Categories</h3>
          {['Home Decorations', 'Pooja Products', 'Kitchen Appliances', 'Fashion Wears'].map((category) => (
            <label key={category}>
              <input
                type="checkbox"
                checked={selectedCategories.includes(category)}
                onChange={() => handleCategoryChange(category)}
              />
              {category}
            </label>
          ))}
        </div>

        {/* Price Range Filter */}
        <div className="filter">
          <h3>Price Range</h3>
          <input
            type="range"
            min="0"
            max="1000"
            value={priceRange[1]}
            className="price-slider"
            onChange={handlePriceChange}
          />
          <div className="range-values">
            <span>{priceRange[0]}</span>
            <span>{priceRange[1]}</span>
          </div>
        </div>

        <button className="apply-button" onClick={applyFilters}>Apply Filters</button>
      </div>
    </div>
  );
};

export default MobileSidebar;
