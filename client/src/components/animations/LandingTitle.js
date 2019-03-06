import React from 'react';
import { useSpring, animated } from 'react-spring';

const TextRotateY = ({ char, id }) => {
  const config = { mass: 5, tension: 300, friction: 20 };
  const props = useSpring({
    config,
    delay: 2000,
    opacity: 1,
    transform: 'rotateY(0deg)',
    from: { opacity: 0, transform: 'rotateY(180deg)' }
  });

  return (
    <animated.h1 id={id} className="landing-title" style={props}>
      {char}
    </animated.h1>
  );
};

const LandingTitle = () => {
  return (
    <div>
      <TextRotateY char="S" id="title-1" />
      <TextRotateY char="i" id="title-2" />
      <TextRotateY char="m" id="title-3" />
      <TextRotateY char="p" id="title-4" />
      <TextRotateY char="l" id="title-5" />
      <TextRotateY char="x" id="title-6" />
    </div>
  );
};

export default LandingTitle;
