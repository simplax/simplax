import React, { useState, useEffect } from 'react';

export default function TutorialCodeSnippet() {
  return (
    <div>
      <div className={'tutorial-code-container d-flex'}>
        <img src="images/code.png" alt="" />
        <div>
          <p>You are almost there!</p>
          <p>Simply click on the icon on the bottom right of the customize page for the code snippet.</p>
          <p>In order to use this code snippet, you will have to install an additional npm package.</p>
          <p>The name of the package is react-plx.</p>
          <p>run npm i react-plx.</p>
          <p>Congratulation! You can now implement the parallax effects in your website.</p>
        </div>


      </div>
    </div>
  )
}