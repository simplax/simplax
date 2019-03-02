import React from 'react';

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
          <ul className="navbar-nav">
            {properties &&
              properties.map(property => {
                return (
                  <li className="nav-item">
                    <a
                      href={`#${property}`}
                      className={
                        property === propertyActive
                          ? 'property-active nav-link'
                          : 'nav-link'
                      }
                    >
                      {property}
                    </a>
                  </li>
                );
              })}
            {/* <li className="nav-item">
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
            </li> */}
          </ul>
        </div>
      </nav>
    </div>
  );
};

export default PropertyNavbar;
