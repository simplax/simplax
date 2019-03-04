import React, { useState, useEffect } from "react";
import AddEffect from "../AddEffect";
import CustomizeForm from "../CustomizeForm";
import CodeSnippetModal from "../CodeSnippetModal";
import CustomizeBox from "../CustomizeBox";
import Save from '../Save';
import Load from '../Load';
import api from "../../api";

// QUESTION: is likedEffects props neccessary?

export default function Customize({ likedEffects, onShowCaseClick }) {
  /*********************************
   * States
   *********************************/
  const [parallaxDataDefault, setParallaxDataDefault] = useState([]);
  const [parallaxData, setParallaxData] = useState(parallaxDataDefault);
  const [likedEffect, setLikedEffect] = useState(likedEffects);
  const [modifiedEffects, setModifiedEffects] = useState([]);
  const [savedProfile, setSavedProfile] = useState([]);

  /*********************************
   * Effect
   *********************************/
  // Get data from sessionStorage
  useEffect(() => {
    if (api.getSessionStorage("likedEffect")) {
      setLikedEffect(api.getSessionStorage("likedEffect"));
    } else {
      setLikedEffect([]);
    }
  }, []);

  // Get data from sessionStorage
  useEffect(() => {
    if (api.getSessionStorage("modifiedEffect")) {
      setModifiedEffects(api.getSessionStorage("modifiedEffect"));
    } else {
      setModifiedEffects([]);
    }
  }, []);

  // get saved profile
  useEffect(() => {
    if (api.getSavedProfile()) {
      api.getSavedProfile()
        .then(profile => setSavedProfile(profile))
    }
    else setSavedProfile([])
  }, [])


  // Get data from db
  useEffect(() => {
    if (likedEffect.length === 0) {
      return;
    }

    let likedEffectUrl = likedEffect.join("-");
    api.getManyParallaxData(likedEffectUrl).then(res => {
      setParallaxDataDefault(res);

      /*********************************
       * Converting parallax data to usable code for snippet and box
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

    return () => setParallaxData([]);
  }, [likedEffect]);

  // update parallaxData
  useEffect(() => {
    if (likedEffect.length === 0) {
      return;
    }

    let likedEffectUrl = likedEffect.join("-");
    api.getManyParallaxData(likedEffectUrl).then(res => {
      /*********************************
       * Converting parallax data to usable code for snippet and box
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

      // update parallaxData

      modifiedEffects.forEach(modEffect => {
        const indexProperties = parallaxDataTmp[0].properties.findIndex(
          obj => obj.property === modEffect.property
        );
        if (indexProperties !== -1) {
          parallaxDataTmp[0].properties[indexProperties].startValue = modEffect.values[0];
          parallaxDataTmp[0].properties[indexProperties].endValue = modEffect.values[1];
          parallaxDataTmp[1].properties[indexProperties].startValue = modEffect.values[1];
          parallaxDataTmp[1].properties[indexProperties].endValue = modEffect.values[0];
        }
      });

      setParallaxData(parallaxDataTmp);
    });
  }, [modifiedEffects]);

  /*********************************
   * Event Handler
   *********************************/
  function handleAddEffect(id) {
    const likedEffectTemp = [...likedEffect];
    likedEffectTemp.push(id);
    setLikedEffect(likedEffectTemp);
    api.setSessionStorage("likedEffect", likedEffectTemp);
  }
  function handleCloseEffect(id, property) {
    const likedEffectTemp = [...likedEffect];
    likedEffectTemp.splice(likedEffectTemp.indexOf(id), 1);
    setLikedEffect(likedEffectTemp);
    api.setSessionStorage("likedEffect", likedEffectTemp);

    const modifiedEffectsTmp = [...modifiedEffects];
    const index = modifiedEffectsTmp.findIndex(obj => obj.property === property);
    modifiedEffectsTmp.splice(index, 1);
    setModifiedEffects(modifiedEffectsTmp);
    api.setSessionStorage("modifiedEffect", modifiedEffectsTmp);

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
    api.setSessionStorage("modifiedEffect", modifiedEffectsTmp);
    console.log('TCL: handleModifyEffect -> modifiedEffect', modifiedEffects)


  }
  function handleResetEffect(property) {
    const modifiedEffectsTmp = [...modifiedEffects];
    const index = modifiedEffectsTmp.findIndex(obj => obj.property === property);
    modifiedEffectsTmp.splice(index, 1);
    setModifiedEffects(modifiedEffectsTmp);
    api.setSessionStorage("modifiedEffect", modifiedEffectsTmp);

  }

  function handleLoad(title) {
    api.getSavedProfileDetail(title)
      .then(data => {

        let modifiedTmp = data.savedprofile.modifiedEffects
        setModifiedEffects(modifiedTmp)
        api.setSessionStorage("modifiedEffect", modifiedTmp)
        let likedTmp = data.savedprofile.likedEffects
        setLikedEffect(likedTmp)
        api.setSessionStorage('likedEffect', likedTmp)

      }

      )

  }

  function handleSave(data) {
    api.postSavedProfile(data)

      .then(() => {
        console.log('saved!')
        api.getSavedProfile()
          .then(profile => { setSavedProfile(profile) })
      })
      .catch(err => { })


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
                    modifiedEffects={modifiedEffects}
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
        <Save modifiedEffects={modifiedEffects} likedEffects={likedEffect} onSave={handleSave} />
        <Load onLoad={handleLoad} saved={savedProfile} />

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