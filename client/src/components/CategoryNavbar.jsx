import React, { useState } from 'react';
import Plx from 'react-plx';
import CategoryTranslateY from './animations/CategoryTranslateY';

const CategoryNavbar = () => {
  return (
    <div className="CategoryNavbar">
      <nav className="navbar navbar-dark navbar-expand-lg">
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav">
            <li className="nav-item">
              <CategoryTranslateY category="TRANSFORM" linkTo="#transform" />
            </li>
            <li className="nav-item">
              <CategoryTranslateY category="COLORS" linkTo="#colors" />
            </li>
            <li className="nav-item">
              <CategoryTranslateY category="CSS-FILTER" linkTo="#css-filter" />
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
};

export default CategoryNavbar;
