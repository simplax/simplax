import React, { useState } from 'react';
import Plx from 'react-plx';
import TextTranslateY from './animations/TextTranslateY';

const CategoryNavbar = ({ categoryActive }) => {
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
              <a
                href="#transform"
                className={
                  categoryActive === 'transform'
                    ? 'nav-link category-active'
                    : 'nav-link'
                }
              >
                <TextTranslateY category="TRANSFORM" />
              </a>
            </li>
            <li className="nav-item">
              <a
                href="#colors"
                className={
                  categoryActive === 'colors'
                    ? 'nav-link category-active'
                    : 'nav-link'
                }
              >
                <TextTranslateY category="COLORS" />
              </a>
            </li>
            <li className="nav-item">
              <a
                href="#css-filter"
                className={
                  categoryActive === 'css-filter'
                    ? 'nav-link category-active'
                    : 'nav-link'
                }
              >
                <TextTranslateY category="CSS-FILTER" />
              </a>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
};

export default CategoryNavbar;
