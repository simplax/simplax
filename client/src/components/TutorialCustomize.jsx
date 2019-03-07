import React from 'react';
import Plx from 'react-plx/lib/Plx';

export default function TutorialCustomize() {
  const parallaxDataRight = [
    {
      start: 'self',
      end: 'self',
      endOffset: '40vh',

      properties: [
        {
          startValue: 0,
          endValue: 1,
          property: 'opacity'
        },
        {
          startValue: -200,
          endValue: 0,
          property: 'translateX'
        }
      ]
    }
  ];
  return (
    <div>
      <div
        className={'tutorial-customize-container d-flex p-5 align-items-center'}
      >
        <div>
          <Plx parallaxData={parallaxDataRight}>
            <p>Welcome to the customize page.</p>
          </Plx>
          <Plx parallaxData={parallaxDataRight}>
            <p>This page will merge all the parallax effects you picked.</p>
          </Plx>
          <Plx parallaxData={parallaxDataRight}>
            {' '}
            <p>You will also be able to fine tune the parallax effects here.</p>
          </Plx>
          <Plx parallaxData={parallaxDataRight}>
            <p>Log in with Github to save your customized effects.</p>
          </Plx>
          <Plx parallaxData={parallaxDataRight}>
            <p>
              On the bottom left of the page, you will find a select field and
              an input field
            </p>
          </Plx>
          <Plx parallaxData={parallaxDataRight}>
            {' '}
            <p>
              The select field allows you to load and delete your customized
              effects.
            </p>
          </Plx>
          <Plx parallaxData={parallaxDataRight}>
            <p>
              The input field will be responsible to save your cuztomized
              profile or update it if the filename has already exist.
            </p>
          </Plx>
        </div>
        <img src="images/customize.png" alt="" />
      </div>
    </div>
  );
}
