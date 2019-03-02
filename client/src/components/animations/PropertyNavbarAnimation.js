// Props: properties, array of property names

import React, { useState } from 'react';
import { useTrail, animated } from 'react-spring';

const PropertyNavbarAnimation = ({ properties }) => {
  const config = { mass: 1, tension: 2000, friction: 100 };
  const trail = useTrail(properties.length, {
    config,
    opacity: 1,
    x: 0,
    y: 0,
    scale: 1,
    from: { opacity: 0, x: -20, y: -20, scale: 1.5 }
  });

};

export default PropertyNavbarAnimation;
