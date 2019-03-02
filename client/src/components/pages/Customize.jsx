import React, { useState, useEffect } from "react";
import AddEffect from "../AddEffect";
import CustomizeForm from "../CustomizeForm";
import CodeSnippetModal from "../CodeSnippetModal";
import CustomizeBox from "../CustomizeBox";
import api from "../../api";

export default function Customize({ likedEffects, onShowCaseClick }) {
  /*********************************
   * States
   *********************************/
  const [parallaxDataDefault, setParallaxDataDefault] = useState([]);
  const [parallaxData, setParallaxData] = useState(parallaxDataDefault);
  const [likedEffect, setLikedEffect] = useState(likedEffects);
  const [modifiedEffects, setModifiedEffects] = useState([]);

  /*********************************
   * Effect
   *********************************/
  useEffect(() => {
    if (api.getSessionStorage()) setLikedEffect(api.getSessionStorage());
    else setLikedEffect([]);
  }, []);

  useEffect(() => {
    if (likedEffect.length === 0) {
      return;
    }
    let likedEffectUrl = likedEffect.join("-");
    api.getManyParallaxData(likedEffectUrl).then(res => {
      setParallaxDataDefault(res);

      /*********************************
       * Converting parallax data to usable code for snippet and modal
       *********************************/

      let parallaxDataTmp = [];

      const {
        start,
        startOffsetIn,
        startOffsetOut,
        end,
        endOffsetIn,
        endOffsetOut,
        easing
      } = res[0];

      parallaxDataTmp = [
        {
          start,
          startOffset: startOffsetIn,
          end,
          endOffset: endOffsetIn,
          easing,
          properties: []
        },
        {
          start,
          startOffset: startOffsetOut,
          end,
          endOffset: endOffsetOut,
          easing,
          properties: []
        }
      ];

      res.forEach(data => {
        parallaxDataTmp[0].properties.push({
          startValue: data.startValue,
          endValue: data.endValue,
          property: data.property,
          unit: data.unit
        });
        parallaxDataTmp[1].properties.push({
          startValue: data.endValue,
          endValue: data.startValue,
          property: data.property,
          unit: data.unit
        });
      });

      setParallaxData(parallaxDataTmp);
    });
  }, [likedEffect]);

  /*********************************
   * Event Handler
   *********************************/
  function handleAddEffect(id) {
    const likedEffectTemp = [...likedEffect];
    likedEffectTemp.push(id);
    setLikedEffect(likedEffectTemp);
    api.setSessionStorage(likedEffectTemp);
  }

  function handleCloseEffect(id) {
    const likedEffectTemp = [...likedEffect];
    likedEffectTemp.splice(likedEffectTemp.indexOf(id), 1);
    setLikedEffect(likedEffectTemp);
    api.setSessionStorage(likedEffectTemp);
  }

  function handleResetEffect(property) {
    const modifiedEffectsTmp = [...modifiedEffects];
    const index = modifiedEffectsTmp.findIndex(obj => obj.property === property);
    modifiedEffectsTmp.splice(index, 1);
    setModifiedEffects(modifiedEffectsTmp);
  }

  function handleModifyEffect(property, values) {
    const modifiedEffectsTmp = [...modifiedEffects];
    const index = modifiedEffectsTmp.findIndex(obj => obj.property === property);
    if (index === -1) {
      modifiedEffectsTmp.push({
        property,
        values
      });
    } else {
      modifiedEffectsTmp[index].values = values;
    }
    setModifiedEffects(modifiedEffectsTmp);

    // update parallaxData

    const indexProperties = parallaxData[0].properties.findIndex(obj => obj.property === property);
    let parallaxDataTmp = [...parallaxData];
    parallaxDataTmp[0].properties[indexProperties].startValue = values[0];
    parallaxDataTmp[0].properties[indexProperties].endValue = values[1];
    parallaxDataTmp[1].properties[indexProperties].startValue = values[1];
    parallaxDataTmp[1].properties[indexProperties].endValue = values[0];
    setParallaxData(parallaxDataTmp);
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
      <div className="container-fluid">
        <div className="row ml-md-3 sticky-top-md">
          <div className="col-12 col-md-3 sidebar">
            <div className="">
              <AddEffect likedEffect={likedEffect} onAddEffect={handleAddEffect} />
              {likedEffect.length === 0
                ? null
                : parallaxDataDefault.map(data => (
                    <CustomizeForm
                      key={data._id}
                      id={data._id}
                      data={data}
                      onModifyEffect={handleModifyEffect}
                      onResetEffect={handleResetEffect}
                      onCloseEffect={handleCloseEffect}
                    />
                  ))}
            </div>
          </div>

          <div className="col" />
        </div>
        <CodeSnippetModal parallaxDataCode={parallaxData} />

        <div className="customize-container">
          <div className="scroll-down-container">
            <h2>Scroll Down</h2>
          </div>
          <CustomizeBox parallaxDataCode={parallaxData} />
          <div className="scroll-down-container" />
        </div>

        <button
          type="button"
          className="btn btn-customize"
          onClick={() => onShowCaseClick(likedEffect)}>
          Showcase
        </button>
      </div>
    </div>
  );
}
