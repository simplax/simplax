import React, { useState, useEffect } from "react";

export default function Home() {
  const [showSidebar, setShowSidebar] = useState(false);
  const [width, setWidth] = useState(window.innerWidth);
  console.log("TCL: Home -> width", width);

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  });

  function handleResize() {
    setWidth(window.innerWidth);
  }

  return (
    <div className="Home">
      <div className="container-fluid customize-container">
        <button className="btn btn-secondary toggle" onClick={() => setShowSidebar(!showSidebar)}>
          Toggle
        </button>
        <div className="row">
          {width >= 768 || showSidebar ? (
            <div className="col-12 col-md-3 bg-primary sidebar">
              <div className="" />
            </div>
          ) : null}
          <div className="col-12 box-container d-flex justify-content-center align-items-center">
            <div className="box bg-light" />
          </div>
        </div>
      </div>
    </div>
  );
}
