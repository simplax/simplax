// category link fade in from top to bottom
// Take two props:
// category: string, category name that you want to animate
// linkTo: string, href
// ** note that this funtion doesn't have isEnter prop

import React, { useState } from 'react';
import { useTrail, animated } from 'react-spring';

const CategoryTranslateY = ({ category, linkTo }) => {
  const categoryArr = category.split('');

  const config = { mass: 6, tension: 2000, friction: 150 };
  const trail = useTrail(categoryArr.length, {
    config,
    opacity: 1,
    y: 0,
    from: { opacity: 0, y: -50 }
  });

  return (
    <div className="categoryTranslateY">
      <a className="nav-link" href={linkTo}>
        {trail.map(({ y, opacity }, index) => (
          <animated.span
            key={index}
            className="categoryTranslateY__category"
            href="#"
            style={{
              opacity,
              transform: y.interpolate(y => `translateY(${y}px)`)
            }}
          >
            {categoryArr[index]}
          </animated.span>
        ))}
      </a>
    </div>
  );
};

export default CategoryTranslateY;
