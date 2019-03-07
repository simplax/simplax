import React, { useEffect } from 'react';
import ScrollableAnchor, { goToTop } from 'react-scrollable-anchor';
import TutorialExplore from '../TutorialExplore'
import TutorialCustomize from '../TutorialCustomize'
import TutorialCodeSnippet from '../TutorialCodeSnippet'
import Plx from 'react-plx';


export default function Tutorial() {
  useEffect(() => {
    goToTop();
  }, []);

  const parallaxDataExploreTitle = [
    {
      start: 'self',
      end: 'self',
      startOffset: '40vh',
      endOffset: '100vh',

      properties: [
        {
          startValue: 0,
          endValue: 1,
          property: 'opacity',
        },

        {
          startValue: 180,
          endValue: 0,
          property: 'rotate',
        },

        {
          startValue: 1,
          endValue: 1.5,
          property: 'scale',
        },
      ],
    },
  ];

  const parallaxDataCustomizeTitle = [
    {
      start: 'self',
      end: 'self',
      startOffset: '40vh',
      endOffset: '100vh',

      properties: [
        {
          startValue: 0,
          endValue: 1,
          property: 'opacity',
        },

        {
          startValue: 180,
          endValue: 0,
          property: 'rotate',
        },

        {
          startValue: 1,
          endValue: 1.5,
          property: 'scale',
        }
      ],
    },
  ];

  const parallaxDataCodeSnippetTitle = [
    {
      start: 'self',
      end: 'self',
      startOffset: '40vh',
      endOffset: '100vh',

      properties: [
        {
          startValue: 0,
          endValue: 1,
          property: 'opacity',
        },

        {
          startValue: 180,
          endValue: 0,
          property: 'rotate',
        },

        {
          startValue: 1,
          endValue: 1.5,
          property: 'scale',
        }
      ],
    },
  ];

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
                    Take a look at all the 27 amazing parallax effects available in the react-plx package!
                  </div>
                </div>
              </a>
            </div>
            <div className="col">
              <a href="#tutorial-customize">
                <div className="intro-container">
                  <h5>Customize</h5>
                  <div className="content">
                    Mix, merge and customize your favorite parallax effects!
                  </div>
                </div>
              </a>
            </div>
            <div className="col">
              <a href="#tutorial-codeSnippet">
                <div className="intro-container">
                  <h5>Code snippet</h5>
                  <div className="content">
                    Get the code snippet of your customized profile and implement it immediately onto your website and see the changes!
                  </div>
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* different tutorial page section. */}
      <ScrollableAnchor id={'explore'}>
        <Plx parallaxData={parallaxDataExploreTitle}>
          <div className='container-100vh d-flex justify-content-center align-items-center'>
            <h1>Explore</h1>
          </div>
        </Plx>
      </ScrollableAnchor>

      <TutorialExplore />

      <ScrollableAnchor id={'tutorial-customize'}>
        <Plx parallaxData={parallaxDataCustomizeTitle}>
          <div className='container-100vh d-flex justify-content-center align-items-center'>
            <h1>Customize</h1>
          </div>
        </Plx>
      </ScrollableAnchor>

      <TutorialCustomize />

      <ScrollableAnchor id={'tutorial-codeSnippet'}>
        <Plx parallaxData={parallaxDataCodeSnippetTitle}>
          <div className='container-100vh d-flex justify-content-center align-items-center'>
            <h1>Code Snippet</h1>
          </div>
        </Plx>
      </ScrollableAnchor>

      <TutorialCodeSnippet />


    </div>
  );
}
