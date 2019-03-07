import React, { useEffect } from 'react';
import ScrollableAnchor, { goToTop } from 'react-scrollable-anchor';
import TutorialExplore from '../TutorialExplore'
import TutorialCustomize from '../TutorialCustomize'
import TutorialCodeSnippet from '../TutorialCodeSnippet'
import Plx from 'react-plx';


export default function Tutorial() {
  useEffect(() => {
    goToTop()
  }, [])

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

        {
          startValue: '#fbeed7',
          endValue: '#ffcb59',
          property: 'color',
        }
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
        },

        {
          startValue: '#ffcb59',
          endValue: '#d76d77',
          property: 'color',
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
        },

        {
          startValue: '#d76d77',
          endValue: '#703873',
          property: 'color',
        }
      ],
    },
  ];

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
  )
}