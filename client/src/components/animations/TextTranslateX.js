// text fade in from left to right, fade out from right to left

import React, { useState } from 'react';
import { useTrail, animated } from 'react-spring';

const TextTranslateX = ({ text, animationState }) => {
  const textArr = text.split('');

  const config = { mass: 1, tension: 2000, friction: 100 };
  const trail = useTrail(textArr.length, {
    config,
    opacity: animationState === 'enter' ? 1 : 0,
    x: animationState === 'enter' ? 0 : -20,
    from: { opacity: 0, x: -20 }
  });

  return (
    <div className="TextTranslateX">
      <div>
        {trail.map(({ x, opacity }, index) => (
          <animated.h4
            key={index}
            className="TextTranslateX__text"
            style={{
              // display: 'none',
              opacity,
              transform: x.interpolate(x => `translateX(${x}px)`)
            }}
          >
            {textArr[index]}
          </animated.h4>
        ))}
      </div>
    </div>
  );
};

export default TextTranslateX;
