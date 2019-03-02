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
  const [parallaxData, setParallaxData] = useState([]);
  const [likedEffect, setLikedEffect] = useState(likedEffects);
  const [modifiedValues, setModifiedValues] = useState([]);

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
    api.setSessionStorage(likedEffectTemp);
  }

  function handleCloseEffect(id) {
    const likedEffectTemp = [...likedEffect];
    likedEffectTemp.splice(likedEffectTemp.indexOf(id), 1);
    setLikedEffect(likedEffectTemp);
    api.setSessionStorage(likedEffectTemp);
  }

  function handleModifiedValue(property, values) {
    const modifiedValuesTmp = [...modifiedValues];

    const index = modifiedValuesTmp.findIndex(obj => obj.property === property);

    if (index === -1) {
      modifiedValuesTmp.push({
        property,
        values
      });
    } else {
      modifiedValuesTmp[index].values = values;
    }

    setModifiedValues(modifiedValuesTmp);
  }

  /*********************************
   * Converting parallax data to usable code for snippet and modal
   *********************************/
  let parallaxDataCode = [];
  if (parallaxData.length !== 0) {
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
    } = parallaxData[0];

    parallaxDataCode = [
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
  }

  if (parallaxData) {
    parallaxData.forEach(data => {
      const { startValue, endValue, property, unit } = data;

      const indexModifiedValues = modifiedValues.findIndex(obj => obj.property === data.property);

      if (indexModifiedValues === -1) {
        parallaxDataCode[0].properties.push({
          startValue,
          endValue,
          property,
          unit
        });
        parallaxDataCode[1].properties.push({
          startValue: endValue,
          endValue: startValue,
          property,
          unit
        });
      } else {
        parallaxDataCode[0].properties.push({
          startValue: modifiedValues[indexModifiedValues].values[0],
          endValue: modifiedValues[indexModifiedValues].values[1],
          property,
          unit
        });
        parallaxDataCode[1].properties.push({
          startValue: modifiedValues[indexModifiedValues].values[1],
          endValue: modifiedValues[indexModifiedValues].values[0],
          property,
          unit
        });
      }
    });
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
                : parallaxData.map(data => (
                    <CustomizeForm
                      key={data._id}
                      id={data._id}
                      data={data}
                      onModifedValue={handleModifiedValue}
                      onCloseEffect={handleCloseEffect}
                    />
                  ))}
            </div>
          </div>

          <div className="col" />
        </div>
        <CodeSnippetModal parallaxDataCode={parallaxDataCode} />

        <div className="customize-container">
          <div className="scroll-down-container">
            <h2>Scroll Down</h2>
          </div>
          <CustomizeBox parallaxDataCode={parallaxDataCode} />
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
