import React, { useState, useEffect } from "react";
import AddEffect from "../AddEffect";
import CustomizeForm from "../CustomizeForm";
import CodeSnippetModal from "../CodeSnippetModal";
import CustomizeBox from "../CustomizeBox";
import api from "../../api";

export default function Customize({ location }) {
  /*********************************
   * States
   *********************************/
  const [parallaxData, setParallaxData] = useState(null);
  // TO DO: clear location.state after data was read
  // location.state is not defined when accessing via navbar
  const [likes, setLikes] = useState(location.state ? location.state.likes : []);
  console.log("TCL: Customize -> likes", likes);

  /*********************************
   * Effect
   *********************************/
  useEffect(() => {
    if (likes.length === 0) {
      return;
    }
    let likesUrl = likes.join("-");
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
      <div className="Customize">
        <h2>Loading...</h2>
      </div>
    );
  }
  // TO DO: fix AddEffect, CustomizeForm and CodeSnippetModal
  return (
    <div className="Customize Showcase">
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
      <CodeSnippetModal className="code-snippet-modal" />
      <div className="showcase__top-container showcase__top-container--scroll">
        <h2>Scroll Down</h2>
      </div>
      {/* <CustomizeBox parallaxDataSelection={parallaxData} /> */}
    </div>
  );
}