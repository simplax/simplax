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
  const handlePageClick = () => {
    setIsShowcase(!isShowcase);
  };

  const handleLikeClick = id => {
    const likesTemp = [...likes];
    likesTemp.includes(id)
      ? likesTemp.splice(likesTemp.indexOf(id), 1)
      : likesTemp.push(id);
    setLikes(likesTemp);
  };

  /*********************************
   * Render
   *********************************/
  if (isShowcase) {
    return (
      <div>
        <Showcase onLikeClick={handleLikeClick} likes={likes} />
        <button
          type="button"
          onClick={handlePageClick}
          className="btn btn-customize"
        >
          Customize
        </button>
      </div>
    );
  } else {
    return (
      <div>
        <Customize likedEffects={likes} />
        <button
          type="button"
          onClick={handlePageClick}
          className="btn btn-customize"
        >
          Showcase
        </button>
      </div>
    );
  }
};

export default ShowcaseCustomize;
