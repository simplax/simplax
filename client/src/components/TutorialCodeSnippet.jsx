import React from 'react';
import Plx from 'react-plx/lib/Plx';

export default function TutorialCodeSnippet() {
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
    <div>
      <div className={'tutorial-code-container d-flex p-5 align-items-center'}>
        <img src="images/code.png" alt="" />
        <div>
          <Plx parallaxData={parallaxDataLeft}>
            <p>You are almost there!</p>
          </Plx>
          <Plx parallaxData={parallaxDataLeft}>
            <p>
              Simply click on the icon on the bottom right of the customize page
              for the code snippet.
            </p>
          </Plx>
          <Plx parallaxData={parallaxDataLeft}>
            <p>
              In order to use this code snippet, you will have to install an
              additional npm package.
            </p>
          </Plx>
          <Plx parallaxData={parallaxDataLeft}>
            <p>The name of the package is react-plx.</p>
          </Plx>
          <Plx parallaxData={parallaxDataLeft}>
            <p>run npm i react-plx.</p>
          </Plx>
          <Plx parallaxData={parallaxDataLeft}>
            <p>
              Congratulation! You can now implement the parallax effects in your
              website.
            </p>
          </Plx>
        </div>
      </div>
    </div>
  );
}
