import React, { useState } from "react";
import PropertyNavbar from "./PropertyNavbar";
import TextTranslateY from "./animations/TextTranslateY";

const CategoryNavbar = ({ categoryActive, properties, propertyActive }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="sticky-navbar">
      <div className="CategoryNavbar">
        <nav className="navbar navbar-dark navbar-expand-lg">
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className={isExpanded ? "navbar-toggler" : "navbar-toggler collapsed"}
            type="button"
            data-toggle="collapse"
            data-target="#navbarSupportedContent1"
            aria-controls="navbarSupportedContent"
            aria-expanded={isExpanded}
            aria-label="Toggle navigation">
            <span className="navbar-toggler-icon" />
            <span className="navbar-toggler-label">Category</span>
          </button>

          <div
            className={isExpanded ? "collapse navbar-collapse show" : "collapse navbar-collapse"}
            id="navbarSupportedContent1">
            <ul className="navbar-nav">
              {/* Transform */}
              <li className="nav-item">
                <a
                  onClick={() => setIsExpanded(false)}
                  href="#transform"
                  className={
                    categoryActive === "transform" ? "nav-link category-active" : "nav-link"
                  }>
                  <TextTranslateY category="TRANSFORM" />
                </a>
              </li>

              {/* CSS-Filter */}
              <li className="nav-item">
                <a
                  onClick={() => setIsExpanded(false)}
                  href="#css-filter"
                  className={
                    categoryActive === "css-filter" ? "nav-link category-active" : "nav-link"
                  }>
                  <TextTranslateY category="CSS-FILTER" />
                </a>
              </li>

              {/* Colors */}
              <li className="nav-item">
                <a
                  onClick={() => setIsExpanded(false)}
                  href="#colors"
                  className={categoryActive === "colors" ? "nav-link category-active" : "nav-link"}>
                  <TextTranslateY category="COLORS" />
                </a>
              </li>
            </ul>
          </div>
        </nav>
      </div>
      <PropertyNavbar properties={properties} propertyActive={propertyActive} />
    </div>
  );
};

export default CategoryNavbar;
