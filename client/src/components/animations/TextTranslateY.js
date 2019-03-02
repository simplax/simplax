// category link fade in from top to bottom
// Take two props:
// category: string, category name that you want to animate
// linkTo: string, href
// ** note that this funtion doesn't have isEnter prop

import React, { useState } from 'react';
import { useTrail, animated } from 'react-spring';

const TextTranslateY = ({ category }) => {
  const textArr = category.split('');

  const config = { mass: 6, tension: 2000, friction: 150 };
  const trail = useTrail(textArr.length, {
    config,
    opacity: 1,
    y: 0,
    from: { opacity: 0, y: -50 }
  });

  return (
    <div className="TextTranslateY">
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
    </div>
  );
};

export default TextTranslateY;
