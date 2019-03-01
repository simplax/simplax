import React, { useState, useEffect } from 'react';
import Showcase from './Showcase';
import Customize from './Customize';

const ShowcaseCustomize = () => {
  /*********************************
   * States
   *********************************/
  const [isShowcase, setIsShowcase] = useState(true);
  const [likes, setLikes] = useState([]);

  /*********************************
   * Event Handler
   *********************************/
  const handleCustomizeClick = () => {
    setIsShowcase(!isShowcase);
  };

  const handleLikeClick = id => {
    const likesTemp = [...likes];
    likesTemp.includes(id)
      ? likesTemp.splice(likesTemp.indexOf(id), 1)
      : likesTemp.push(id);
    setLikes(likesTemp);
  };

  const handleShowCaseClick = (updatedLikeStatus) => {
    setIsShowcase(!isShowcase)
    setLikes(updatedLikeStatus)
  }

  /*********************************
   * Render
   *********************************/
  if (isShowcase) {
    return (
      <div>
        <Showcase onLikeClick={handleLikeClick} likes={likes} onCustomizeClick={handleCustomizeClick} />

      </div>
    );
  } else {
    return (
      <div>
        <Customize likedEffects={likes} onShowCaseClick={handleShowCaseClick} />

      </div>
    );
  }
};

export default ShowcaseCustomize;
