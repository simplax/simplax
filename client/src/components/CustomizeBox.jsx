import React from "react";
import Plx from "react-plx";

export default function CustomizeBox({ parallaxDataSelection }) {
  let parallaxData = [];

  if (parallaxDataSelection) {
    const {
      _id,
      start,
      startOffsetIn,
      startOffsetOut,
      end,
      endOffsetIn,
      endOffsetOut,
      easing,
      startValue,
      endValue,
      category,
      property,
      unit
    } = parallaxDataSelection[0];

    parallaxData = [
      {
        start,
        startOffset: startOffsetIn,
        end,
        endOffset: endOffsetIn,
        easing,
        properties: []
      },
      {
        start,
        startOffset: startOffsetOut,
        end,
        endOffset: endOffsetOut,
        easing,
        properties: []
      }
    ];
  }

  if (parallaxDataSelection) {
    parallaxDataSelection.forEach(data => {
      const { startValue, endValue, property, unit } = data;

      parallaxData[0].properties.push({
        startValue,
        endValue,
        property,
        unit
      });
      parallaxData[1].properties.push({
        startValue: endValue,
        endValue: startValue,
        property,
        unit
      });
    });
  }

  /*********************************
   * render
   *********************************/
  return (
    <div className="scrolldown-container">
      <div className="showcase-box-container">
        <div>
          <Plx parallaxData={parallaxData}>
            <div className="showcase-box" />
          </Plx>
          <div className="scrolldown-container" />
        </div>
      </div>
    </div>
  );
}
