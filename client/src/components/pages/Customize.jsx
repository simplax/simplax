import React, { useState, useEffect } from 'react';
import AddEffect from '../AddEffect';
import CustomizeForm from '../CustomizeForm';
import CodeSnippetModal from '../CodeSnippetModal';
import CustomizeBox from '../CustomizeBox';
import api from '../../api';

export default function Customize({ likedEffects, onShowCaseClick }) {
  /*********************************
   * States
   *********************************/
  const [parallaxData, setParallaxData] = useState(null);
  // TODO: clear location.state after data was read
  // location.state is not defined when accessing via navbar
  const [likedEffect, setLikedEffect] = useState(likedEffects);


  /*********************************
   * Effect
   *********************************/
  useEffect(() => {
    setLikedEffect(api.getSessionStorage())
  }, [])

  useEffect(() => {

    if (likedEffect.length === 0) {
      return;
    }
    let likedEffectUrl = likedEffect.join('-');
    api.getManyParallaxData(likedEffectUrl).then(res => {
      setParallaxData(res);
    });
  }, [likedEffect]);

  /*********************************
   * Event Handler
   *********************************/
  function handleAddEffect(id) {
    const likedEffectTemp = [...likedEffect];
    likedEffectTemp.push(id);
    setLikedEffect(likedEffectTemp);
    api.setSessionStorage(likedEffectTemp)
  }
  function handleCloseEffect(id) {
    const likedEffectTemp = [...likedEffect];
    likedEffectTemp.splice(likedEffectTemp.indexOf(id), 1);
    setLikedEffect(likedEffectTemp);
    api.setSessionStorage(likedEffectTemp)
  }

  /*********************************
   * Render
   *********************************/
  if (!parallaxData && likedEffect.length !== 0) {
    return (
      <div className="Customize scroll-down-container">
        <h2>Loading...</h2>
      </div>
    );
  }
  return (
    <div className="Customize">
      <div className="fixed-top mt-5 ml-5">
        <AddEffect likedEffect={likedEffect} onAddEffect={handleAddEffect} />
        {likedEffect.length === 0
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
      {console.log(parallaxData)}
      <CustomizeBox parallaxDataSelection={parallaxData} />
      <button
        type="button"

        className="btn btn-customize"
        onClick={() => onShowCaseClick(likedEffect)}
      >
        Showcase
        </button>
    </div>
  );
}
