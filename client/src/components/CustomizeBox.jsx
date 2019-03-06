import React, { useState, useEffect } from 'react';
import Plx from 'react-plx';

export default function CustomizeBox({ parallaxDataCode }) {
  const [widthSidebar, setWidthSidebar] = useState(0);
  const breakPointSidebar = 768;

  useEffect(() => {
    setTimeout(() => {
      if (window.innerWidth >= breakPointSidebar) {

        const { width } = document
          .getElementById('sidebar')
          .getBoundingClientRect();
        setWidthSidebar(width);
        console.log('correct')
      } else {
        setWidthSidebar(0);
        console.log('incorrect')
      }
    }, 100)


  });

  /*********************************
   * render
   *********************************/
  return (
    <div
      className="showcase-box-container"
      style={{ marginLeft: `${widthSidebar}px` }}
    >
      <div className="box-container">
        <Plx
          className="showcase-box--color"
          parallaxData={parallaxDataCode}
          onPlxStart={() => { }}
          animateWhenNotInViewport={true}
        >
          <div className="showcase-box-inner">
            <h4 className="showcase-box-text">Simplx</h4>
          </div>
        </Plx>
      </div>
    </div>
  );
}
