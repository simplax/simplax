import React, { useState } from 'react';
import Plx from 'react-plx';
import TextTranslateY from './animations/TextTranslateY';

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
              <TextTranslateY text="Transform" />
            </li>
            <li className="nav-item">
              <TextTranslateY text="Colors" />
            </li>
            <li className="nav-item">
              <TextTranslateY text="CSS Filter" />
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
};

export default CategoryNavbar;
