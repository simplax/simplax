// Props: properties, array of property names

import React, { useState } from 'react';
import { useTransition, animated } from 'react-spring';

const PropertyNavbarAnimation = ({ properties }) => {
  const [propertyArr, setProperties] = useState([...properties]);
  const transitions = useTransition(propertyArr, property => null, {
    from: { transform: 'translate(0,-40px)' },
    enter: { transform: 'translate(0,0px)' },
    leave: { transform: 'translate(0,-40px)' }
  });

  return transitions.map(({ item, props, key }) => (
    <animated.div key={key} style={props}>
      {item}
    </animated.div>
  ));

  // const config = { mass: 1, tension: 2000, friction: 100 };
  // const trail = useTrail(properties.length, {
  //   config,
  //   opacity: 1,
  //   x: 0,
  //   y: 0,
  //   scale: 1,
  //   from: { opacity: 0, x: -20, y: -20, scale: 1.5 }
  // });

  // return (
  //   <ul className="navbar-nav">
  //     {trail.map(({ opacity, x, y, scale }, index) => (
  //       <animated.li
  //         key={index}
  //         className="TextTranslateX__text"
  //         style={{
  //           opacity,
  //           transform: x.interpolate(x => `translateX(${x}px)`)
  //         }}
  //       >
  //         <a>hello</a>
  //       </animated.li>
  //     ))}
  //   </ul>
  // );
};

export default TextTranslateX;
