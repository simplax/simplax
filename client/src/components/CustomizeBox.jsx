import React from "react";
import Plx from "react-plx";

export default function CustomizeBox({ parallaxDataSelection }) {
  const parallaxData = [];

  parallaxDataSelection.forEach(data => {
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
    } = data;

    parallaxData.push(
      {
        start,
        startOffset: startOffsetIn,
        end,
        endOffset: endOffsetIn,
        easing,
        properties: [
          {
            startValue,
            endValue,
            property,
            unit
          }
        ]
      },
      {
        start,
        startOffset: startOffsetOut,
        end,
        endOffset: endOffsetOut,
        easing,
        properties: [
          {
            startValue: endValue,
            endValue: startValue,
            property,
            unit
          }
        ]
      }
    );
  });
  console.log("TCL: CustomizeBox -> parallaxData", parallaxData);

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
        </div>
      </div>
    </div>
  );
}
