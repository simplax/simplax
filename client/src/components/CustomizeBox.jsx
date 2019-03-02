import React from "react";
import Plx from "react-plx";

export default function CustomizeBox({ parallaxDataCode }) {
  console.log("TCL: CustomizeBox -> parallaxDataCode", parallaxDataCode);

  /*********************************
   * render
   *********************************/
  return (
    <div className="scrolldown-container">
      <div className="showcase-box-container">
        <div>
          <Plx parallaxData={parallaxDataCode}>
            <div className="showcase-box" />
          </Plx>
          <div className="scrolldown-container" />
        </div>
      </div>
    </div>
  );
}
