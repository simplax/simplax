import React, { useState, useEffect } from "react";
import CustomizeForm from "../CustomizeForm";
import CodeSnippetModal from "../CodeSnippetModal";
import api from "../../api";

export default function Customize({ location }) {
  /*********************************
   * States
   *********************************/
  const [parallaxData, setParallaxData] = useState(null);
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
      console.log("API");
      setParallaxData(res);
    });
  }, [likes]);

  /*********************************
   * Event Handler
   *********************************/
  function handleClose(id) {
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
  return (
    <div className="Customize">
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
              onClose={handleClose}
            />
          ))}
      <CodeSnippetModal />
    </div>
  );
}
