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
          data-target="#navbarSupportedContent2"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
          <span className="navbar-toggler-label">Property</span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent2">
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
