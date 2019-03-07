import React from 'react';
import LandingTitle from '../animations/LandingTitle';
import Plx from 'react-plx';

const Home = () => {
  let layers = []
  for (let i = 4; i >= 1; i--) {
    layers.push(<img
      key={i}
      id={`layer${i}`}
      className="landing-logo"
      src={`/images/logo-layer-${i}.svg`}
      alt="logo"
    />)
  }
  return (
    <div className="Home">
      <div className="landing">
        <div className="landing-logo-container">
          {layers}
        </div>
        <div className="landing-title-container">
          <LandingTitle />
          <div className="landing-quote-container">
            <p className="landing-quote">
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;

// An array of parallax effects to be applied
