import React, { useState } from 'react';
import Plx from 'react-plx';

const ShowcaseBox = ({ data, onLikeClick, likes, onPlxStart, onPlxEnd }) => {
  /*******************************************
   * Get data from props and set parallaxData
   *******************************************/
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

  /*********************************
   * State
   *********************************/
  const [textEnter, setTextEnter] = useState(false);

  /*********************************
   * functions
   *********************************/
  const likeClassName = () => {
    return likes.includes(_id)
      ? 'like fas fa-heart fa-2x'
      : 'unlike fas fa-heart fa-2x';
  };

  /*********************************
   * render
   *********************************/
  return (
    <div className="showcase__scroll-container">
      <div className="showcase__box-container">
        <div>
          <Plx
            parallaxData={parallaxData}
            onPlxStart={() => {
              onPlxStart(property);
            }}
            onPlxEnd={() => {
              onPlxEnd(property);
            }}
          >
            <div className="showcase__box" />
          </Plx>
        </div>
      </div>
      <i className={likeClassName()} onClick={() => onLikeClick(_id)} />
    </div>
  );
};

export default ShowcaseBox;
