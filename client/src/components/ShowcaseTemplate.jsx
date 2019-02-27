import React from 'react';
import ShowcaseBox from './ShowcaseBox';
import generateParallaxData from '../utils';

const parallaxData = generateParallaxData([
  [1, 2, 'scale', 'px'],
  [0, 90, 'rotate', 'deg'],
  [1, 0.05, 'opacity', ''],
  [0, 200, 'translateX', '%'],
  [0, 75, 'skewX', 'deg'],
  [1, 3, 'scaleX', 'px'],
  [1, 10, 'brightness', 'px'],
  [0, 90, 'hueRotate', ''],
  [0, 1, 'invert', '']
]);
parallaxData.unshift([
  {
    start: '0',
    end: '50vh',
    properties: [
      {
        startValue: '1',
        endValue: '0.01',
        property: 'opacity'
      }
    ]
  }
]);

export default function ShowcaseTemplate() {
  return (
    <div className="ShowcaseTemplate">
      <ShowcaseBox parallaxData={parallaxData[0]} property={'start'} />
      <ShowcaseBox
        parallaxData={parallaxData[1]}
        property={parallaxData[1][0].properties[0].property}
      />
      <ShowcaseBox
        parallaxData={parallaxData[2]}
        property={parallaxData[2][0].properties[0].property}
      />
      <ShowcaseBox
        parallaxData={parallaxData[3]}
        property={parallaxData[3][0].properties[0].property}
      />
      <ShowcaseBox
        parallaxData={parallaxData[4]}
        property={parallaxData[4][0].properties[0].property}
      />
      <ShowcaseBox
        parallaxData={parallaxData[5]}
        property={parallaxData[5][0].properties[0].property}
      />
      <ShowcaseBox
        parallaxData={parallaxData[6]}
        property={parallaxData[6][0].properties[0].property}
      />
      <ShowcaseBox
        parallaxData={parallaxData[7]}
        property={parallaxData[7][0].properties[0].property}
      />
      <ShowcaseBox
        parallaxData={parallaxData[8]}
        property={parallaxData[8][0].properties[0].property}
      />
      <ShowcaseBox
        parallaxData={parallaxData[9]}
        property={parallaxData[9][0].properties[0].property}
      />
    </div>
  );
}
