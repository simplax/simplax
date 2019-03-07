import React from 'react';
import Plx from 'react-plx';

const Motivation = () => {
  // const parallaxDataPurple = [
  //   {
  //     start: 'self',
  //     startOffset: 0,
  //     end: 'self',
  //     endOffset: '100vh',
  //     properties: [
  //       {
  //         startValue: 0,
  //         endValue: 0,
  //         property: 'translateY'
  //       }
  //     ]
  //   }
  // ];

  const parallaxDataPurple = [
    {
      start: 'self',
      startOffset: 0,
      end: 'self',
      endOffset: '300vh',
      properties: [
        {
          startValue: 0,
          endValue: 850,
          property: 'translateY'
        }
      ]
    }
  ];

  const parallaxDataPink = [
    {
      start: 'self',
      startOffset: 0,
      end: 'self',
      endOffset: '300vh',
      properties: [
        {
          startValue: 0,
          endValue: 700,
          property: 'translateY'
        }
      ]
    }
  ];

  const parallaxDataOrange = [
    {
      start: 'self',
      startOffset: 0,
      end: 'self',
      endOffset: '300vh',
      properties: [
        {
          startValue: 0,
          endValue: 500,
          property: 'translateY'
        }
      ]
    }
  ];

  const parallaxDataYellow = [
    {
      start: 'self',
      startOffset: 0,
      end: 'self',
      endOffset: '300vh',
      properties: [
        {
          startValue: 0,
          endValue: 300,
          property: 'translateY'
        }
      ]
    }
  ];

  return (
    <div className="motivation-container">
      <h1>hello hello</h1>
      <Plx className="bg-img-container" parallaxData={parallaxDataPurple}>
        <img className="bg-img" src="/images/purple.svg" alt="purple" />
      </Plx>
      <Plx className="bg-img-container" parallaxData={parallaxDataPink}>
        <img className="bg-img" src="/images/pink.svg" alt="pink" />
      </Plx>
      <Plx className="bg-img-container" parallaxData={parallaxDataOrange}>
        <img className="bg-img" src="/images/orange.svg" alt="pink" />
      </Plx>
      <Plx className="bg-img-container" parallaxData={parallaxDataYellow}>
        <img className="bg-img" src="/images/yellow.svg" alt="pink" />
      </Plx>
    </div>
  );
};

export default Motivation;
