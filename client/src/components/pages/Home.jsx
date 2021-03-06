import React from "react";
import LandingTitle from "../animations/LandingTitle";
import Motivation from "../Motivation";
import GoTo from "../GoTo";
import Plx from "react-plx";

const Home = () => {
  let layers = [];
  for (let i = 4; i >= 1; i--) {
    layers.push(
      <img
        key={i}
        id={`layer${i}`}
        className="landing-logo"
        src={`/images/logo-layer-${i}.svg`}
        alt="logo"
      />
    );
  }
  return (
    <div className="Home">
      {/* Landing */}
      <section className="landing">
        <div className="landing-logo-container">{layers}</div>
        <div className="landing-title-container">
          <LandingTitle />
          <div className="landing-quote-container">
            <p className="landing-quote">parallax effects prepared in a simple way.</p>
          </div>
        </div>
      </section>

      {/* Motivation */}
      {/* <section className="motivation">
        <Motivation />
      </section> */}

      {/* Go To */}
      <section className="go-to">
        <GoTo />
      </section>
    </div>
  );
};

export default Home;
