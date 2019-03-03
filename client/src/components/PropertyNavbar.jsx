import React from 'react';
import PropertyNavbarAnimation from './animations/PropertyNavbarAnimation';

const PropertyNavbar = ({ properties, propertyActive }) => {
  return (
    <div className="PropertyNavbar">
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
          {properties && (
            <PropertyNavbarAnimation
              properties={properties}
              propertyActive={propertyActive}
            />
          )}
        </div>
      </nav>
    </div>
  );
};

export default PropertyNavbar;
