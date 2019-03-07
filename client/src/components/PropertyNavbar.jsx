import React, { useState } from "react";
import PropertyNavbarAnimation from "./animations/PropertyNavbarAnimation";

const PropertyNavbar = ({ properties, propertyActive }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  function handleLinkClick() {
    setIsExpanded(false);
  }
  return (
    <div className="PropertyNavbar">
      <nav className="navbar navbar-dark navbar-expand-lg">
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className={isExpanded ? "navbar-toggler" : "navbar-toggler collapsed"}
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent2"
          aria-controls="navbarSupportedContent"
          aria-expanded={isExpanded}
          aria-label="Toggle navigation">
          <span className="navbar-toggler-icon" />
          <span className="navbar-toggler-label">Property</span>
        </button>

        <div
          className={isExpanded ? "collapse navbar-collapse show" : "collapse navbar-collapse"}
          id="navbarSupportedContent2">
          {properties && (
            <PropertyNavbarAnimation
              properties={properties}
              propertyActive={propertyActive}
              onLinkClick={handleLinkClick}
            />
          )}
        </div>
      </nav>
    </div>
  );
};

export default PropertyNavbar;
