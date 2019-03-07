import React, { useEffect } from 'react';
import ScrollableAnchor, { goToTop } from 'react-scrollable-anchor';
import TutorialExplore from '../TutorialExplore'
import TutorialCustomize from '../TutorialCustomize'
import TutorialCodeSnippet from '../TutorialCodeSnippet'


export default function Tutorial() {
  useEffect(() => {
    goToTop()
  }, [])

  return (
    <div>
      {/* anchor tag for page section */}
      <div className={'tutorial-intro-container d-flex justify-content-center align-items-center flex-column'}>
        <div>
          <h4> <span>Hi welcome to Simplx! </span> <span> Are you excited to dive into animations? </span> <span>Here is a quick tutorial to get you started!</span>  </h4>

        </div>
        <div className={'pt-4 d-flex'}>
          <a href="#explore">
            <div className={'tutorial-intro-explore'}>
              <h5>Explore</h5>
            </div>
          </a>

          <a href="#tutorial-customize">
            <div className={'tutorial-intro-customize'}>
              <h5>Customize</h5>
            </div>
          </a>

          <a href="#tutorial-codeSnippet">
            <div className={'tutorial-intro-code'}>
              <h5>Code snippet</h5>
            </div>
          </a>

        </div>
      </div>



      {/* different tutorial page section. */}
      <ScrollableAnchor id={'explore'}>
        <div>
          <TutorialExplore />
        </div>
      </ScrollableAnchor>

      <ScrollableAnchor id={'tutorial-customize'}>
        <div>
          <TutorialCustomize />
        </div>
      </ScrollableAnchor>

      <ScrollableAnchor id={'tutorial-codeSnippet'}>
        <div>
          <TutorialCodeSnippet />
        </div>
      </ScrollableAnchor>

    </div>
  )
}