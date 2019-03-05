import React from "react";
import Plx from "react-plx";

export default function CustomizeBox({ parallaxDataCode }) {

  function isColor() {
    return true
  }
  /*********************************
   * render
   *********************************/




  return (
    <div className="showcase-box-container">
      <div className="box-container">
        <Plx
          className={isColor ? 'showcase-box--color' : 'showcase-box'}
          parallaxData={parallaxDataCode}
          onPlxStart={() => { }}
          animateWhenNotInViewport={true}


        >
          <div className="showcase-box-inner"><h4 className="showcase-box-text">Simplax</h4></div>
          {console.log(parallaxDataCode)}
        </Plx>

      </div>
    </div>
  );
}
