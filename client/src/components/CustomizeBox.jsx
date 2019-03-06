import React from "react";
import Plx from "react-plx";

export default function CustomizeBox({ parallaxDataCode }) {
  /*********************************
   * render
   *********************************/
  return (
    <div className="showcase-box-container">
      <div className="box-container">
        <Plx
          className='showcase-box--color'
          parallaxData={parallaxDataCode}
          onPlxStart={() => { }}
          animateWhenNotInViewport={true}


        >
          <div className="showcase-box-inner"><h4 className="showcase-box-text">Simplax</h4></div>

        </Plx>

      </div>
    </div>
  );
}
