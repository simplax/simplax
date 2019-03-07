// Props: properties, array of property names

import React from "react";
import { useTrail, animated } from "react-spring";

const PropertyNavbarAnimation = ({ properties, propertyActive, onLinkClick }) => {
  const config = { mass: 1, tension: 3000, friction: 100 };
  const trail = useTrail(properties.length, {
    config,
    from: { opacity: 0, xy: [0, 50] },
    opacity: 1,
    xy: [0, 0]
  });

  return (
    <ul className="navbar-nav">
      {trail.map(({ opacity, xy }, index) => (
        <li className="nav-item">
          <animated.a
            onClick={onLinkClick}
            href={`#${properties[index]}`}
            key={index}
            className={
              properties[index] === propertyActive ? "property-active nav-link" : "nav-link"
            }
            style={{
              transform: xy.interpolate((x, y) => `translate(${x}px, ${y}px)`),
              opacity
            }}>
            {properties[index]}
          </animated.a>
        </li>
      ))}
    </ul>
  );
};

export default PropertyNavbarAnimation;
