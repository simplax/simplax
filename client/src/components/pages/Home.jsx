import React from 'react';
import LandingTitle from '../animations/LandingTitle';
import Plx from 'react-plx';

const Home = () => {
  return (
    <div className="Home">
      <div className="landing">
        <div className="landing-logo-container">
          <img
            id="layer4"
            className="landing-logo"
            src="/images/logo-layer-4.svg"
            alt="logo"
          />
          <img
            id="layer3"
            className="landing-logo"
            src="/images/logo-layer-3.svg"
            alt="logo"
          />
          <img
            id="layer2"
            className="landing-logo"
            src="/images/logo-layer-2.svg"
            alt="logo"
          />
          <img
            id="layer1"
            className="landing-logo"
            src="/images/logo-layer-1.svg"
            alt="logo"
          />
        </div>
        <div className="landing-title-container">
          <LandingTitle />
        </div>
      </div>
    </div>
  );
};

export default Home;

// An array of parallax effects to be applied
