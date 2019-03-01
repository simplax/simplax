// category fade in from top to bottom
// Take two props:
// category: string, text that you want to animate
// fromTop: boolean, true if text enters from top to bottom
// ** note that this funtion doesn't have isEnter prop

import React, { useState } from 'react';
import { useTrail, animated } from 'react-spring';

const CategoryTranslateY = ({ text }) => {
  const textArr = text.split('');

  const config = { mass: 3, tension: 2000, friction: 100 };
  const trail = useTrail(textArr.length, {
    config,
    opacity: 1,
    y: 0,
    from: { opacity: 0, y: -50 }
  });

  return (
    <div className="TextTranslateY">
      <a className="nav-link" href="#">
        {trail.map(({ y, opacity }, index) => (
          <animated.span
            key={index}
            className="TextTranslateY__text"
            href="#"
            style={{
              opacity,
              transform: y.interpolate(y => `translateY(${y}px)`)
            }}
          >
            {textArr[index]}
          </animated.span>
        ))}
      </a>
    </div>
  );
};

export default CategoryTranslateY;
