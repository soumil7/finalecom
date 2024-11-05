import React, { useState } from 'react';
import './FilterButton.css'; // Ensure you have the updated CSS file
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilter } from '@fortawesome/free-solid-svg-icons';

const FilterButton = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleToggleSidebar = () => {
    setSidebarOpen(!sidebarOpen); // Toggle the sidebar open/close state
  };

  const handleCloseSidebar = () => {
    setSidebarOpen(false); // Close the sidebar
  };

  return (
    <div className='filter-b'>
      {/* Filter Button with Icon */}
      <button className="filter-button" onClick={handleToggleSidebar}>
        <FontAwesomeIcon icon={faFilter} /> Filters
      </button>

      {/* Sidebar */}
      <div className={`filter-sidebar ${sidebarOpen ? 'open' : ''}`}>
        <div className="sidebar-content">
          <button className="close-button" onClick={handleCloseSidebar}>
            &times;
          </button>
          <h2 className="sidebar-title">Filters</h2>

          {/* Categories Filter */}
          <div className="filter">
            <h3>Categories</h3>
            {['Home Decorations', 'Pooja Products', 'Kitchen Appliances', 'Fashion Wears'].map((category) => (
              <label key={category}>
                {category}
                <input type="checkbox" className='check-box'/>
              </label>
            ))}
          </div>

          {/* Price Range Filter */}
          <div className="filter">
            <h3>Price Range</h3>
            <input type="range" min="0" max="1000" className="price-slider" />
          </div>

          <button className="apply-button" onClick={handleCloseSidebar}>Apply Filters</button>
        </div>
      </div>
    </div>
  );
};

export default FilterButton;
