import React, { useState, useEffect } from 'react';
import AddEffect from '../AddEffect';
import CustomizeForm from '../CustomizeForm';
import CodeSnippetModal from '../CodeSnippetModal';
import CustomizeBox from '../CustomizeBox';
import api from '../../api';

export default function Customize({ likedEffects }) {
  /*********************************
   * States
   *********************************/
  const [parallaxData, setParallaxData] = useState(null);
  // TODO: clear location.state after data was read
  // location.state is not defined when accessing via navbar
  const [likes, setLikes] = useState(likedEffects);
  console.log('TCL: Customize -> likes', likes);

  /*********************************
   * Effect
   *********************************/
  useEffect(() => {
    if (likes.length === 0) {
      return;
    }
    let likesUrl = likes.join('-');
    api.getManyParallaxData(likesUrl).then(res => {
      setParallaxData(res);
    });
  }, [likes]);

  /*********************************
   * Event Handler
   *********************************/
  function handleAddEffect(id) {
    const likesTemp = [...likes];
    likesTemp.push(id);
    setLikes(likesTemp);
  }
  function handleCloseEffect(id) {
    const likesTemp = [...likes];
    likesTemp.splice(likesTemp.indexOf(id), 1);
    setLikes(likesTemp);
  }

  /*********************************
   * Render
   *********************************/
  if (!parallaxData && likes.length !== 0) {
    return (
      <div className="Customize scroll-down-container">
        <h2>Loading...</h2>
      </div>
    );
  }
  return (
    <div className="Customize">
      <div className="fixed-top mt-5 ml-5">
        <AddEffect likes={likes} onAddEffect={handleAddEffect} />
        {likes.length === 0
          ? null
          : parallaxData.map(data => (
              <CustomizeForm
                key={data._id}
                id={data._id}
                property={data.property}
                unit={data.unit}
                start={data.startValue}
                end={data.endValue}
                onCloseEffect={handleCloseEffect}
              />
            ))}
      </div>
      <CodeSnippetModal />
      <div className="scroll-down-container">
        <h2>Scroll Down</h2>
      </div>
      {/* <CustomizeBox parallaxDataSelection={parallaxData} /> */}
    </div>
  );
}
