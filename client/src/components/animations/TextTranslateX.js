// text fade in from left to right, fade out from right to left
// Takes two props:
// text: string, text that you want to animate
// isEnter: boolean, determine text enter or exit

import React from 'react';
import { useTrail, animated } from 'react-spring';

const TextTranslateX = ({ text, isEnter }) => {
  const textArr = text.split('');

  const config = { mass: 1, tension: 2000, friction: 100 };
  const trail = useTrail(textArr.length, {
    config,
    opacity: isEnter ? 1 : 0,
    x: isEnter ? 0 : -20,
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
