import React, { useState, useEffect } from 'react';
import Plx from 'react-plx';


export default function TutorialExplore() {
  return (
    <div className={'tutorial-explore-container d-flex flex-column align-items-center'}>
      <img src="images/explore.png" alt="" />
      <div>
        <p>This is the explore page.</p>
        <p>Here you will can preview all the 27 parallax effects that are available.</p>
        <p>Click on the heart icon if you find something you like.</p>
        <p>The category navbar on top helps you to get to chosen effect quickly.</p>
        <p>When you are done, simply click on the customize icon on the bottom right of the screen.</p>
      </div>
    </div>
  )
}