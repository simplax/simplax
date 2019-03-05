import React from 'react';

const ScrollDownOrUp = ({ isScrollDown }) => {
  return (
    <div className={isScrollDown ? 'ScrollDown' : 'ScrollUp'}>
      <div className="chevron" />
      <div className="chevron" />
      <div className="chevron" />
    </div>
  );
};

export default ScrollDownOrUp;
