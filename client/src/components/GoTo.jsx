import React from 'react';
import { Link } from 'react-router-dom';
import Plx from 'react-plx';

const GoTo = () => {
  const parallaxDataTitle = [
    {
      start: 'self',
      end: 'self',
      endOffset: '20vh',
      properties: [
        {
          startValue: 2,
          endValue: 1,
          property: 'scale'
        },
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
      startOffset: '-50vh',
      end: 'self',
      endOffset: '50vh',
      properties: [
        {
          startValue: -120,
          endValue: 0,
          property: 'translateX'
        },
        {
          startValue: 0,
          endValue: 1,
          property: 'opacity'
        }
      ]
    }
  ];

  const parallaxDataUp = [
    {
      start: 'self',
      startOffset: '-50vh',
      end: 'self',
      endOffset: '20vh',
      properties: [
        {
          startValue: -150,
          endValue: 0,
          property: 'translateY'
        },
        {
          startValue: 0,
          endValue: 1,
          property: 'opacity'
        }
      ]
    }
  ];

  const parallaxDataRight = [
    {
      start: 'self',
      startOffset: '-50vh',
      end: 'self',
      endOffset: '50vh',
      properties: [
        {
          startValue: 120,
          endValue: 0,
          property: 'translateX'
        },
        {
          startValue: 0,
          endValue: 1,
          property: 'opacity'
        }
      ]
    }
  ];
  return (
    <div className="GoTo">
      <Plx parallaxData={parallaxDataTitle}>
        <h3 className="go-to-title">What can you do at our website?</h3>
      </Plx>

      <div className="col-flex">
        <div className="row-flex">
          <div className="go-to-explore">
            <Plx parallaxData={parallaxDataLeft}>
              <i className="fab fa-wpexplorer fa-3x" />
            </Plx>
            <Plx parallaxData={parallaxDataUp}>
              <p className="go-to-paragraph">
                Discover some amazing parallax effects.
              </p>
            </Plx>
            <Plx parallaxData={parallaxDataRight}>
              <Link className="go-to-link" to="/explore">
                Explore Now
              </Link>
              <i className="fas fa-arrow-left" />
            </Plx>
          </div>
        </div>
        <div className="row-flex">
          <div className="go-to-customize">
            <Plx parallaxData={parallaxDataLeft}>
              <i className="fas fa-tools fa-3x" />
            </Plx>
            <Plx parallaxData={parallaxDataUp}>
              <p className="go-to-paragraph">
                Lorem ipsum dolor sit, amet consectetur adipisicing elit.
              </p>
            </Plx>
            <Plx parallaxData={parallaxDataRight}>
              <Link className="go-to-link" to="/customize">
                Customize
              </Link>
              <i className="fas fa-arrow-left" />
            </Plx>
          </div>
        </div>
        <div className="row-flex">
          <div className="go-to-tutorial">
            <Plx parallaxData={parallaxDataLeft}>
              <i className="far fa-question-circle fa-3x" />
            </Plx>
            <Plx parallaxData={parallaxDataUp}>
              <p className="go-to-paragraph">
                Lorem ipsum dolor sit, amet consectetur adipisicing elit.
              </p>
            </Plx>
            <Plx parallaxData={parallaxDataRight}>
              <Link className="go-to-link" to="/tutorial">
                Tutorial
              </Link>
              <i className="fas fa-arrow-left" />
            </Plx>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GoTo;
