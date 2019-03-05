import React from 'react';
import Plx from 'react-plx';
import ScrollableAnchor from 'react-scrollable-anchor';
import LikeIconsss from '../components/animations/LikeIconsss';

const ShowcaseBox = ({
  data,
  onLikeClick,
  likedEffects,
  onPropertyPlxStart,
  onPropertyPlxEnd,
  isColor
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
    if (likedEffects.includes(_id)) {
      return isColor && property !== 'backgroundColor'
        ? 'like far fa-heart fa-3x'
        : 'like fas fa-heart fa-3x';
    } else {
      return isColor && property !== 'backgroundColor'
        ? 'unlike far fa-heart fa-3x'
        : 'unlike fas fa-heart fa-3x';
    }
  };

  const likeAnimation = () => {
    return likedEffects.includes(_id);
  };

  /*********************************
   * render
   *********************************/
  return (
    <ScrollableAnchor id={property}>
      <div className="showcase-box-container">
        <div className="box-container">
          <Plx
            className={isColor ? 'showcase-box--color' : 'showcase-box'}
            parallaxData={parallaxData}
            onPlxStart={() => {
              onPropertyPlxStart(property, category);
            }}
            onPlxEnd={() => {
              onPropertyPlxEnd(property);
            }}
          >
            <div className="showcase-box-inner">
              <h4 className="showcase-box-text">Simplax</h4>
              <i className={likeClassName()} onClick={() => onLikeClick(_id)} />
            </div>
          </Plx>
        </div>

        {likeAnimation() && <LikeIconsss />}
      </div>
    </ScrollableAnchor>
  );
};

export default ShowcaseBox;
