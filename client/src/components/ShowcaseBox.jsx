import React, { useState } from 'react';
import Plx from 'react-plx';

const ShowcaseBox = props => {
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

  /*********************************
   * functions
   *********************************/
  const likeClassName = () => {
    return props.likes.includes(_id)
      ? 'like fas fa-heart fa-2x'
      : 'unlike fas fa-heart fa-2x';
  };

  /*********************************
   * render
   *********************************/
  return (
    <div className="showcase__scroll-container">
      <div className="showcase__box-container">
        <h5>{property}</h5>
        <div>
          <Plx parallaxData={parallaxData}>
            <div className="showcase__box" />
          </Plx>
        </div>
        <i className={likeClassName()} onClick={() => props.onLikeClick(_id)} />
      </div>
    </div>
  );
};

export default ShowcaseBox;
