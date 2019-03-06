import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import AddEffect from "../AddEffect";
import CustomizeForm from "../CustomizeForm";
import CodeSnippetModal from "../CodeSnippetModal";
import CustomizeBox from "../CustomizeBox";
import Save from "../Save";
import Load from "../Load";
import api from "../../api";

// TO DO
//    - box: margin/responsive text size
//    - z-index customize mobile
//    - buttons
//    - load/save
//    - modal
//    - input field arrows/append (responsive?)
//    - change icon color on hover

export default function Customize() {
  /*********************************
   * States
   *********************************/
  const [parallaxDataTransformDefault, setParallaxDataTransformDefault] = useState([]);
  const [parallaxDataCssFilterDefault, setParallaxDataCssFilterDefault] = useState([]);
  const [parallaxDataColorsDefault, setParallaxDataColorsDefault] = useState([]);
  const [parallaxData, setParallaxData] = useState([]);
  const [likedEffects, setLikedEffects] = useState([]);
  const [modifiedEffects, setModifiedEffects] = useState([]);
  const [savedProfile, setSavedProfile] = useState([]);
  const [loadedFile, setLoadedFile] = useState(null);
  const [remove, setRemove] = useState([]);
  const [showCodeSnippet, setShowCodeSnippet] = useState(false);
  const [showSidebar, setShowSidebar] = useState(false);
  const [width, setWidth] = useState(window.innerWidth);

  const breakPointSidebar = 768;

  /*********************************
   * Effect
   *********************************/
  // get data from sessionStorage
  useEffect(() => {
    if (api.getSessionStorage("likedEffects")) {
      setLikedEffects(api.getSessionStorage("likedEffects"));
    } else {
      setLikedEffects([]);
    }
  }, []);

  // get data from sessionStorage
  useEffect(() => {
    if (api.getSessionStorage("modifiedEffect")) {
      setModifiedEffects(api.getSessionStorage("modifiedEffect"));
    } else {
      setModifiedEffects([]);
    }
  }, []);

  // window scroll
  useEffect(() => {
    function scrollHandler() {
      const windowTop = document.documentElement.scrollTop;
      const windowBottom = document.documentElement.scrollTop + window.innerHeight;
      const documentBottom = document.body.clientHeight;
      const buffer = window.innerHeight * 0.22 * 1.5;

      if (documentBottom >= windowBottom) {
        window.scrollTo(0, windowBottom + buffer);
      } else if (windowTop >= window.innerHeight + buffer) {
        window.scrollTo(0, 0 + buffer * 0.6);
      }
    }

    if (width >= breakPointSidebar || !showSidebar) {
      window.addEventListener("scroll", scrollHandler);
    }

    return () => {
      console.log("window.removeEventListener");
      window.removeEventListener("scroll", scrollHandler);
    };
  }, [showSidebar, width]);

  // get saved profile
  useEffect(() => {
    if (api.getSavedProfile()) {
      api.getSavedProfile().then(profile => setSavedProfile(profile));
    } else setSavedProfile([]);
  }, []);

  // get data from db
  useEffect(() => {
    if (likedEffects.length === 0) {
      return;
    }

    let likedEffectUrl = likedEffects.join("-");
    api.getManyParallaxData(likedEffectUrl).then(res => {
      setParallaxDataTransformDefault(res.filter(data => data.category === "transform"));
      setParallaxDataCssFilterDefault(res.filter(data => data.category === "css-filter"));
      setParallaxDataColorsDefault(res.filter(data => data.category === "colors"));

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

    return () => {
      setParallaxData([]);
      setParallaxDataTransformDefault([]);
      setParallaxDataCssFilterDefault([]);
      setParallaxDataColorsDefault([]);
    };
  }, [likedEffects]);

  // update parallaxData
  useEffect(() => {
    if (likedEffects.length === 0) {
      return;
    }

    let likedEffectUrl = likedEffects.join("-");
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

  // get window size
  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  });

  /*********************************
   * Event Handler
   *********************************/
  function handleResize() {
    setWidth(window.innerWidth);
  }

  function handleAddEffect(id) {
    const likedEffectTemp = [...likedEffects];
    likedEffectTemp.push(id);
    setLikedEffects(likedEffectTemp);
    api.setSessionStorage("likedEffects", likedEffectTemp);
  }

  function handleCloseEffect(id, property) {
    const likedEffectTemp = [...likedEffects];
    likedEffectTemp.splice(likedEffectTemp.indexOf(id), 1);
    setLikedEffects(likedEffectTemp);
    api.setSessionStorage("likedEffects", likedEffectTemp);

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
  }

  function handleResetEffect(property) {
    const modifiedEffectsTmp = [...modifiedEffects];
    const index = modifiedEffectsTmp.findIndex(obj => obj.property === property);
    modifiedEffectsTmp.splice(index, 1);
    setModifiedEffects(modifiedEffectsTmp);
    api.setSessionStorage("modifiedEffect", modifiedEffectsTmp);
  }

  function handleLoad(id) {
    if (id !== "instruction") {
      api.getSavedProfileDetail(id).then(data => {
        if (data.length !== 0) {
          let modifiedTmp = data.savedprofile.modifiedEffects;
          setModifiedEffects(modifiedTmp);
          api.setSessionStorage("modifiedEffect", modifiedTmp);
          let likedTmp = data.savedprofile.likedEffects;
          setLikedEffects(likedTmp);
          api.setSessionStorage("likedEffects", likedTmp);
          let dataTmp = data;
          setLoadedFile(dataTmp);
          console.log(dataTmp);
        } else return;
      });
    }
  }

  function handleSave(data) {
    api.getSavedProfile().then(savedprofiles => {
      console.log(savedprofiles);
      let verifyTmp = savedprofiles.findIndex(savedprofile => {
        return savedprofile.title === data.title;
      });

      if (verifyTmp === -1) {
        api
          .postSavedProfile(data)

          .then(() => {
            console.log("saved!");
            api.getSavedProfile().then(profile => {
              setSavedProfile(profile);
            });
          })
          .catch(err => {});
      } else api.updateSavedProfile(data.title, data);
    });
  }

  function handleDelete(id) {
    if (loadedFile && id === loadedFile.savedprofile._id) {
      api.deleteSavedProfile(id).then(() => {
        setLikedEffects([]);
        setModifiedEffects([]);
        api.setSessionStorage("modifiedEffects", []);
        api.setSessionStorage("likedEffects", []);
        setRemove([]);
      });
    } else
      api.deleteSavedProfile(id).then(() => {
        setLikedEffects([]);
        setModifiedEffects([]);
        api.setSessionStorage("modifiedEffects", []);
        api.setSessionStorage("likedEffects", []);
        setRemove([]);
      });
  }

  function handleCodeSnippetClick() {
    setShowCodeSnippet(!showCodeSnippet);
  }

  /*********************************
   * Render
   *********************************/
  if (
    !parallaxData ||
    !parallaxDataTransformDefault ||
    !parallaxDataCssFilterDefault ||
    !parallaxDataColorsDefault
  ) {
    return (
      <div className="Customize scroll-down-container">
        <h2>Loading...</h2>
      </div>
    );
  }
  return (
    <div className="Customize">
      <div className="container-fluid">
        <div onClick={() => setShowSidebar(!showSidebar)} className="toggle-btn p-2 text-secondary">
          <i className="fas fa-wrench" />
          {/* <span>Sidebar</span> */}
        </div>
        <div className="row">
          {/* S I D E B A R */}
          {width >= breakPointSidebar || showSidebar ? (
            <div className="col-12 col-md-3 sidebar-container">
              <div>
                <div className="pl-2 pr-2 pb-4">
                  <h5>Add effect</h5>
                  <AddEffect likedEffects={likedEffects} onAddEffect={handleAddEffect} />
                </div>
                <div className="pl-2 pr-2 pb-4 effect-container">
                  <h5>Customize effect</h5>
                  {parallaxDataTransformDefault.length === 0 ? null : (
                    <div className="pb-4">
                      {parallaxDataTransformDefault.map(data => (
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
                  )}
                  {parallaxDataCssFilterDefault.length === 0 ? null : (
                    <div className="pb-4">
                      {parallaxDataCssFilterDefault.map(data => (
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
                  )}
                  {parallaxDataColorsDefault.length === 0 ? null : (
                    <div className="">
                      {parallaxDataColorsDefault.map(data => (
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
                  )}
                </div>
              </div>

              <div className="p-2 pb-4">
                {api.checkUser() && (
                  <Load
                    onLoad={handleLoad}
                    saved={savedProfile}
                    onDelete={handleDelete}
                    remove={remove}
                  />
                )}
                {api.checkUser() ? (
                  <Save
                    modifiedEffects={modifiedEffects}
                    likedEffects={likedEffects}
                    onSave={handleSave}
                    loadedFile={loadedFile}
                  />
                ) : (
                  <a
                    className="save-btn link btn-lg p-0 bg-dark text-white"
                    href={api.service.defaults.baseURL + "/github-login"}>
                    <i className="fab fa-github" />
                    <span>Save</span>
                  </a>
                )}
              </div>
            </div>
          ) : null}
          {/*  */}
        </div>

        {(width >= breakPointSidebar || !showSidebar) && !showCodeSnippet ? (
          <div className="customize-container">
            <CustomizeBox parallaxDataCode={parallaxData} />
            <div className="scroll-down-container" />
          </div>
        ) : null}
        <div className="code-btn text-secondary">
          <i className="fas fa-code" onClick={handleCodeSnippetClick} />
        </div>
        {showCodeSnippet && (
          <CodeSnippetModal parallaxDataCode={parallaxData} onCloseClick={handleCodeSnippetClick} />
        )}
      </div>
    </div>
  );
}

// true && ... => ...
// false && ... => false

// false || ... => ...
// true || ... => true
