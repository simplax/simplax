import React from 'react';
import LandingTitle from '../animations/LandingTitle';
import Plx from 'react-plx';

const Home = () => {
  const parallaxData = [
    {
      start: 'self',
      startOffset: '0',
      end: 'self',
      endOffset: '50vh',
      easing: 'easeInSine',
      properties: [

        {
          startValue: '0.5',
          endValue: '1',
          property: 'scaleY',
          unit: ''
        },
        {
          startValue: '1',
          endValue: '1.5',
          property: 'scaleX',
          unit: ''
        },
        {
          startValue: '#6b34c9',
          endValue: '#fead7b',
          property: 'backgroundColor',
          unit: ''
        }
      ]
    },
    {
      start: 'self',
      startOffset: '60vh',
      end: 'self',
      endOffset: '100vh',
      easing: 'easeInSine',
      properties: [

        {
          startValue: '1',
          endValue: '0.5',
          property: 'scaleY',
          unit: ''
        },
        {
          startValue: '1.5',
          endValue: '1',
          property: 'scaleX',
          unit: ''
        },
        {
          startValue: '#fead7b',
          endValue: '#6b34c9',
          property: 'backgroundColor',
          unit: ''
        }
      ]
    }
  ]

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
