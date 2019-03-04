// Outline Like Icon

import React from 'react';
import { useSpring, animated, config } from 'react-spring';

const LikeIcon = fillColor => {
  const animationProps = useSpring({
    config: config.molasses,
    x: 100,
    from: { x: 0 }
  });

  return (
    <animated.svg
      className="btn-like"
      viewBox="-10 -10 45 45"
      fill={fillColor}
      stroke="white"
      strokeWidth="2px"
      strokeLinecap="round"
      strokeLinejoin="round"
      // strokeDasharray={100}
      strokeDashoffset={animationProps.x}
    >
      <path
        d="M23.6,0c-3.4,0-6.3,2.7-7.6,5.6C14.7,2.7,11.8,0,8.4,0C3.8,0,0,3.8,0,8.4c0,9.4,9.5,11.9,16,21.2
	c6.1-9.3,16-12.1,16-21.2C32,3.8,28.2,0,23.6,0z"
      />
    </animated.svg>
  );
};

export default LikeIcon;
