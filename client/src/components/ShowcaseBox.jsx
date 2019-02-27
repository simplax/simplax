import React from 'react';
import Plx from 'react-plx';

const ShowcaseBox = props => {
  const {
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
  } = props.data;

  const parallaxData = [
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
  ];

  return (
    <div className="showcase__box-container">
      <Plx parallaxData={parallaxData}>
        <div className="showcase__box">hello box</div>
      </Plx>
    </div>
  );
};

export default ShowcaseBox;
