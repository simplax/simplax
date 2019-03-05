import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import AddEffect from "../AddEffect";
import CustomizeForm from "../CustomizeForm";
import CodeSnippetModal from "../CodeSnippetModal";
import CustomizeBox from "../CustomizeBox";
import Save from "../Save";
import Load from "../Load";
import api from "../../api";

// QUESTION: is likedEffects props neccessary?

export default function Customize() {
  /*********************************
   * States
   *********************************/
  const [parallaxDataDefault, setParallaxDataDefault] = useState([]);
  const [parallaxData, setParallaxData] = useState(parallaxDataDefault);
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
    console.log("TCL: handleModifyEffect -> modifiedEffect", modifiedEffects);
  }
  function handleResetEffect(property) {
    const modifiedEffectsTmp = [...modifiedEffects];
    const index = modifiedEffectsTmp.findIndex(obj => obj.property === property);
    modifiedEffectsTmp.splice(index, 1);
    setModifiedEffects(modifiedEffectsTmp);
    api.setSessionStorage("modifiedEffect", modifiedEffectsTmp);
  }

  function handleLoad(id) {
    if (id !== 'instruction') {
      api.getSavedProfileDetail(id).then(data => {

        if (data.length !== 0) {
          let modifiedTmp = data.savedprofile.modifiedEffects;
          setModifiedEffects(modifiedTmp);
          api.setSessionStorage("modifiedEffect", modifiedTmp);
          let likedTmp = data.savedprofile.likedEffects;
          setLikedEffects(likedTmp);
          api.setSessionStorage("likedEffects", likedTmp);
          let dataTmp = data
          setLoadedFile(dataTmp)
          console.log(dataTmp)
        }
        else return
      });
    }
  }

  function handleSave(data) {
    api.getSavedProfile()
      .then(savedprofiles => {
        console.log(savedprofiles)
        let verifyTmp = savedprofiles.findIndex((savedprofile) => {
          return savedprofile.title === data.title
        })

        if (verifyTmp === -1) {
          api
            .postSavedProfile(data)

            .then(() => {
              console.log("saved!");
              api.getSavedProfile().then(profile => {
                setSavedProfile(profile);
              });
            })
            .catch(err => { });
        } else api.updateSavedProfile(data.title, data)
      })
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
      api.deleteSavedProfile(id)
        .then(() => {
          setLikedEffects([])
          setModifiedEffects([])
          api.setSessionStorage('modifiedEffects', [])
          api.setSessionStorage("likedEffects", [])
          setRemove([])
        })

    } else api.deleteSavedProfile(id)
      .then(() => {
        setLikedEffects([])
        setModifiedEffects([])
        api.setSessionStorage('modifiedEffects', [])
        api.setSessionStorage("likedEffects", [])
        setRemove([])
      })
  }

  /*********************************
   * Render
   *********************************/
  if (!parallaxData && likedEffects.length !== 0) {
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
          class="btn btn-primary btn-toggle-sidebar"
          type="button"
          data-toggle="collapse"
          data-target="#collapseSidebar"
          aria-expanded="false">
          Show Sidebar
        </button>
        <div className="row bg-primary">
          <div
            className="col-12 col-md-3 collapse bg-light rounded sidebar-container"
            id="collapseSidebar">
            <div>
              <Load onLoad={handleLoad} saved={savedProfile} onDelete={handleDelete} remove={remove} />
              <Save
                modifiedEffects={modifiedEffects}
                likedEffects={likedEffects}
                onSave={handleSave}
                loadedFile={loadedFile}
              />

              <AddEffect likedEffects={likedEffects} onAddEffect={handleAddEffect} />
              <div className="rounded shadow customize-sidebar">
                {likedEffects.length === 0
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
            <CodeSnippetModal parallaxDataCode={parallaxData} />
          </div>
          <div className="col">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Maiores id culpa magnam dolor
            sapiente in quae nemo atque ex perferendis, voluptas harum praesentium rerum accusantium
            velit quia consequatur amet ullam!
          </div>
        </div>

        <div className="customize-container">
          <div className="scroll-down-container">
            <h2>Scroll Down</h2>
          </div>
          <CustomizeBox parallaxDataCode={parallaxData} />
          <div className="scroll-down-container" />
        </div>

        <Link to="/explore" className="btn btn-customize">
          Explore
        </Link>
      </div>
    </div>
  );
}
