import React, { useState, useEffect } from 'react';

export default function TutorialCustomize() {
  return (
    <div>
      <div className={'tutorial-customize-container d-flex'}>
        <img src="images/customize.png" alt="" />
        <div>
          <p>Welcome to the customize page.</p>
          <p>This page will merge all the parallax effects you picked.</p>
          <p>You will also be able to fine tune the parallax effects here.</p>
          <p>Log in with Github to save your customized effects.</p>
          <p>On the bottom left of the page, you will find a select field and an input field</p>
          <p>The select field allows you to load and delete your customized effects.</p>
          <p>The input field will be responsible to save your cuztomized profile or update it if the filename has already exist.</p>
        </div>
      </div>



    </div>
  )
}