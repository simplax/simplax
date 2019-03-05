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
//    - change icon color on hover
//    - group effects

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
  // const [loadTitle, setLoadTitle] = useState(null)

  /*********************************
   * Effect
   *********************************/
  // Get data from sessionStorage
  useEffect(() => {
    if (api.getSessionStorage("likedEffects")) {
      setLikedEffects(api.getSessionStorage("likedEffects"));
    } else {
      setLikedEffects([]);
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

  useEffect(() => {
    window.addEventListener("scroll", function scrollHandler() {
      const windowTop = document.documentElement.scrollTop;
      const windowBottom = document.documentElement.scrollTop + window.innerHeight;
      const documentBottom = document.body.clientHeight;
      const buffer = window.innerHeight * 0.22 * 1.5;

      // const documentTop = 872;

      console.log(`top: ${windowTop}`);
      console.log(`bottom: ${document.documentElement.scrollTop}` + `${window.innerHeight}`);
      console.log(`document bottom: ${document.body.clientHeight}`);

      if (documentBottom >= windowBottom) {
        window.scrollTo(0, windowBottom + buffer);
      } else if (windowTop >= window.innerHeight + buffer) {
        console.log(true);
        window.scrollTo(0, 0);
      }

      return () => {
        window.removeEventListener("scroll", scrollHandler);
      };
    });
  }, []);

  // get saved profile
  useEffect(() => {
    if (api.getSavedProfile()) {
      api.getSavedProfile().then(profile => setSavedProfile(profile));
    } else setSavedProfile([]);
  }, []);

  // Get data from db
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

  /*********************************
   * Event Handler
   *********************************/
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

  // function handleLoadChange(title) {
  //   setLoadTitle(title)
  // }

  function handleDelete(id) {
    //   if (loadedFile && id !== loadedFile.savedprofile._id) {
    //     api.deleteSavedProfile(loadTitle)
    //       .then(() => { console.log('first case') })

    //   } else
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
        <button
          className="btn btn-primary btn-toggle-sidebar"
          type="button"
          data-toggle="collapse"
          data-target="#collapseSidebar"
          aria-expanded="false">
          Show Sidebar
        </button>
        <div className="row pl-4">
          <div className="col-12 col-md-3 collapse rounded sidebar-container" id="collapseSidebar">
            <div>
              <AddEffect likedEffects={likedEffects} onAddEffect={handleAddEffect} />
              <div className="customize-sidebar">
                <h5>Customize effect</h5>
                {parallaxDataTransformDefault.length === 0 ? null : (
                  <div className="mb-4">
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
                  <div className="mb-4">
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
            <CodeSnippetModal parallaxDataCode={parallaxData} />
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
                className="github-login-link btn btn-success"
                href={api.service.defaults.baseURL + "/github-login"}>
                <i className="fab fa-2x fa-github" /> Save
              </a>
            )}
          </div>
        </div>
        <div className="customize-container">
          <CustomizeBox parallaxDataCode={parallaxData} />
          <div className="scroll-down-container" />
        </div>
        <Link to="/explore" className="btn btn-customize">
          Explore
        </Link>
        Collapse
      </div>
    </div>
  );
}
