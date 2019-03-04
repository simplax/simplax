import React, { useState, useEffect } from 'react';
import Plx from 'react-plx';
import ScrollableAnchor from 'react-scrollable-anchor';

import LikeIcon from '../components/animations/LikeIcon';

const ShowcaseBox = ({
  data,
  onLikeClick,
  likedEffects,
  onPropertyPlxStart,
  onPropertyPlxEnd
}) => {
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
   * functions
   *********************************/
  const likeClassName = () => {
    return likedEffects.includes(_id)
      ? 'like fas fa-heart fa-2x'
      : 'unlike fas fa-heart fa-2x';
  };

  /*********************************
   * render
   *********************************/
  return (
    <ScrollableAnchor id={property}>
      <div className="showcase-box-container">
        <div className="box-container">
          <Plx
            parallaxData={parallaxData}
            onPlxStart={() => {
              onPropertyPlxStart(property, category);
            }}
            onPlxEnd={() => {
              onPropertyPlxEnd(property);
            }}
          >
            <div className="showcase-box" />
          </Plx>

          <i className={likeClassName()} onClick={() => onLikeClick(_id)} />
        </div>
      </div>
    </ScrollableAnchor>
  );
};

export default ShowcaseBox;
