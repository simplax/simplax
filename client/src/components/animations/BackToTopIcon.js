import React from 'react';
import { goToTop } from 'react-scrollable-anchor';

const BackToTopIcon = () => {
  return (
    <i onClick={goToTop} className="back-to-top-container">
      <i id="back-to-top-1" className=" fas fa-chevron-up" />
      <i id="back-to-top-2" className=" fas fa-chevron-up" />
    </i>
  );
};

export default BackToTopIcon;
