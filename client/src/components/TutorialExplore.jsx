import React, { useState, useEffect } from 'react';
import Plx from 'react-plx';

export default function TutorialExplore() {
  const parallaxData = [
    {
      start: 'self',
      end: 'self',
      startOffset: '40vh',
      endOffset: '100vh',

      properties: [
        {
          startValue: 0,
          endValue: 1,
          property: 'opacity'
        }
      ]
    }
  ];

  const parallaxDataLeft = [
    {
      start: 'self',
      end: 'self',
      endOffset: '30vh',

      properties: [
        {
          startValue: 0,
          endValue: 1,
          property: 'opacity'
        },
        {
          startValue: 200,
          endValue: 0,
          property: 'translateX'
        }
      ]
    }
  ];

  return (
    <div className={'tutorial-explore-container'}>
      <img src="images/explore.png" alt="" />

      <div className="tutorial-p">
        <Plx parallaxData={parallaxDataLeft}>
          <p>This is the explore page.</p>
        </Plx>
        <Plx parallaxData={parallaxDataLeft}>
          <p>
            Here you will can preview all the 27 parallax effects that are
            available.
          </p>
        </Plx>
        <Plx parallaxData={parallaxDataLeft}>
          <p>Click on the heart icon if you find something you like.</p>
        </Plx>
        <Plx parallaxData={parallaxDataLeft}>
          {' '}
          <p>
            The category navbar on top helps you to get to chosen effect
            quickly.
          </p>
        </Plx>
        <Plx parallaxData={parallaxDataLeft}>
          <p>
            When you are done, simply click on the customize icon on the bottom
            right of the screen.
          </p>
        </Plx>
      </div>
    </div>
  );
}
