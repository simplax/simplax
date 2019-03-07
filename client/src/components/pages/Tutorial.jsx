import React, { useEffect } from "react";
import ScrollableAnchor, { goToTop } from "react-scrollable-anchor";
import TutorialExplore from "../TutorialExplore";
import TutorialCustomize from "../TutorialCustomize";
import TutorialCodeSnippet from "../TutorialCodeSnippet";

export default function Tutorial() {
  useEffect(() => {
    goToTop();
  }, []);

  return (
    <div className="Tutorial">
      {/* anchor tag for page section */}
      <div className="tutorial-intro-container d-flex flex-column justify-content-between">
        <div className="">
          <h4 id="first">Hi welcome to Simplx! </h4>
          <h4 id="second"> Are you excited to dive into animations? </h4>
          <h4 id="third">Here is a quick tutorial to get you started!</h4>
        </div>
        <div className="container">
          <div className="row">
            <div className="col">
              <a href="#explore">
                <div className="intro-container">
                  <h5>Explore</h5>
                  <div className="content">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquam, magnam! A,
                    error sit, consequatur culpa autem rerum, hic accusamus exercitationem quisquam
                    corporis pariatur minima magnam possimus labore sapiente! Cum, odio.
                  </div>
                </div>
              </a>
            </div>
            <div className="col">
              <a href="#tutorial-customize">
                <div className="intro-container">
                  <h5>Customize</h5>
                  <div className="content">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquam, magnam! A,
                    error sit, consequatur culpa autem rerum, hic accusamus exercitationem quisquam
                    corporis pariatur minima magnam possimus labore sapiente! Cum, odio.
                  </div>
                </div>
              </a>
            </div>
            <div className="col">
              <a href="#tutorial-codeSnippet">
                <div className="intro-container">
                  <h5>Code snippet</h5>
                  <div className="content">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquam, magnam! A,
                    error sit, consequatur culpa autem rerum, hic accusamus exercitationem quisquam
                    corporis pariatur minima magnam possimus labore sapiente! Cum, odio.
                  </div>
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* different tutorial page section. */}
      <ScrollableAnchor id={"explore"}>
        <div>
          <TutorialExplore />
        </div>
      </ScrollableAnchor>

      <ScrollableAnchor id={"tutorial-customize"}>
        <div>
          <TutorialCustomize />
        </div>
      </ScrollableAnchor>

      <ScrollableAnchor id={"tutorial-codeSnippet"}>
        <div>
          <TutorialCodeSnippet />
        </div>
      </ScrollableAnchor>
    </div>
  );
}
