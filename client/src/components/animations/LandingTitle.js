import React from 'react';
import { useSpring, animated } from 'react-spring';

const TextRotateY = ({ char }) => {
  const config = { mass: 5, tension: 300, friction: 20 };
  const props = useSpring({
    config,
    opacity: 1,
    transform: 'rotateY(0deg)',
    from: { opacity: 0, transform: 'rotateY(180deg)' }
  });

  return <animated.h1 className="landing-title" style={props}>{char}</animated.h1>;
};

const LandingTitle = () => {
  return (
    <div>
      <TextRotateY char="S" />
      <TextRotateY char="i" />
      <TextRotateY char="m" />
      <TextRotateY char="p" />
      <TextRotateY char="l" />
      <TextRotateY char="x" />
    </div>
  );
};

export default LandingTitle;
