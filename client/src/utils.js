export default function generateParallaxData(effectsArray) {
  // [startValue, endValue, property, unit] = effectsArray
  function generateStartValues(i, offset) {
    let startIn = (5 / 8) * 100 + i * offset;
    let startOut = (8 / 8) * 100 + i * offset;
    return [`${startIn}vh`, `${startOut}vh`];
  }
  
  let parallaxData = [];
  for (let i = 0; i < effectsArray.length; i++) {
    parallaxData.push([
      {
        start: generateStartValues(i, 100)[0],
        duration: "37.5vh",
        easing: "easeInOutSine",
        properties: [
          {
            startValue: effectsArray[i][0],
            endValue: effectsArray[i][1],
            property: effectsArray[i][2],
            unit: effectsArray[i][3]
          }
        ]
      },
      {
        start: generateStartValues(i, 100)[1],
        duration: "37.5vh",
        easing: "easeInOutSine",
        properties: [
          {
            startValue: effectsArray[i][1],
            endValue: effectsArray[i][0],
            property: effectsArray[i][2],
            unit: effectsArray[i][3]
          }
        ]
      }
    ]);
  }
  return parallaxData;
}
