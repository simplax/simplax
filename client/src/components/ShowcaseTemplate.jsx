import React from 'react';
import ShowcaseBox from './ShowcaseBox';
import generateParallaxData from '../utils';
// import registerServiceWorker from './registerServiceWorker';

// function generateParallaxData(effectsArray) {
//   // [startValue, endValue, property, unit] = effectsArray
//   function generateStartValues(i, offset) {
//     let startIn = (5 / 8) * 100 + i * offset;
//     let startOut = (8 / 8) * 100 + i * offset;
//     return [`${startIn}vh`, `${startOut}vh`];
//   }
//   let parallaxData = [];
//   for (let i = 0; i < effectsArray.length; i++) {
//     parallaxData.push([
//       {
//         start: generateStartValues(i, 100)[0],
//         duration: "37.5vh",
//         easing: "easeInOutSine",
//         properties: [
//           {
//             startValue: effectsArray[i][0],
//             endValue: effectsArray[i][1],
//             property: effectsArray[i][2],
//             unit: effectsArray[i][3]
//           }
//         ]
//       },
//       {
//         start: generateStartValues(i, 100)[1],
//         duration: "37.5vh",
//         easing: "easeInOutSine",
//         properties: [
//           {
//             startValue: effectsArray[i][1],
//             endValue: effectsArray[i][0],
//             property: effectsArray[i][2],
//             unit: effectsArray[i][3]
//           }
//         ]
//       }
//     ]);
//   }
//   return parallaxData;
// }

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
    <div className="ShowcaseTemplate bg-dark">
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
