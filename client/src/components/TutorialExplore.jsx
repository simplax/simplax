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
          property: 'opacity',
        },

        {
          startValue: 1,
          endValue: 0,
          property: 'blur',
        }
      ],
    },
  ];

  return (
    <div className={'tutorial-explore-container'}>



      <Plx parallaxData={parallaxData}>
        <img src="images/explore.png" alt="" />
      </Plx>


      <div>
        <p>This is the explore page.</p>
        <p>Here you will can preview all the 27 parallax effects that are available.</p>
        <p>Click on the heart icon if you find something you like.</p>
        <p>The category navbar on top helps you to get to chosen effect quickly.</p>
        <p>When you are done, simply click on the customize icon on the bottom right of the screen.</p>
      </div>
    </div>
  )
}