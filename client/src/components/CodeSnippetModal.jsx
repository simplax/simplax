import React, { useRef, useState, useEffect } from "react";

export default function CodeSnipppetModal({ parallaxDataCode }) {
  console.log("TCL: CodeSnipppetModal -> parallaxDataCode", parallaxDataCode);
  const codeSnippetValue = useRef(null);
  console.log(parallaxDataCode)

  const [textState, setTextState] = useState('Loading...')


  if (parallaxDataCode.length !== 0) {
    const propertiesArrayEnter = parallaxDataCode[0].properties.map(property => {
      return `
          {
            startValue: ${property.startValue},
            endValue: ${property.endValue},
            property: ${property.property},
            unit: ${property.unit}
          }`;
    });

    const propertiesArrayLeave = parallaxDataCode[1].properties.map(property => {
      return `
          {
            startValue: ${property.startValue},
            endValue: ${property.endValue},
            property: ${property.property},
            unit: ${property.unit}
          }`;
    });
    var code = `import React, { Component } from 'react';
  import Plx from 'react-plx';
    
  // An array of parallax effects to be applied - see below for detail
  parallaxData = [
        {
          start: ${parallaxDataCode[0].start},
          startOffset: ${parallaxDataCode[0].startOffset},
          end: ${parallaxDataCode[0].end},
          endOffset: ${parallaxDataCode[0].endOffset},
          easing: ${parallaxDataCode[0].easing},
          properties: [
              ${propertiesArrayEnter}
            ]
        },
        {
          start: ${parallaxDataCode[1].start},
          startOffset: ${parallaxDataCode[1].startOffset},
          end: ${parallaxDataCode[1].end},
          endOffset: ${parallaxDataCode[1].endOffset},
          easing: ${parallaxDataCode[1].easing},
          properties: [
              ${propertiesArrayLeave}
          ]
        }
      ]
  
  class Example extends Component {
    render() {
      return (
        <Plx
        parallaxData={ parallaxData }
        >
          /* Your content */
          </Plx>
      );
    }
  }`;
  }



  function copyToClipboard(e) {
    codeSnippetValue.current.select();
    document.execCommand("copy");
    e.target.focus(); // not show text selection
  }

  return (
    <div className="CodeSnipppetModal">
      <button
        type="button"
        className="btn btn-info"
        data-toggle="modal"
        data-target="#codeSnippetModal"
        onClick={() => setTextState(code)}
      >
        Show code snippet
      </button>

      <div
        className="modal fade text-dark"
        id="codeSnippetModal"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="codeSnippet"
        aria-hidden="true">
        <div
          className="modal-dialog modal-xl modal-dialog-scrollable modal-dialog-centered"
          role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Code snippet for your awesome React app!</h5>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <pre>{textState}</pre>

              <textarea className="hidden" rows="0" ref={codeSnippetValue} value={textState} />
            </div>

            <div className="modal-footer">
              <button type="button" className="btn btn-outline-info" data-dismiss="modal">
                Close
              </button>
              {document.queryCommandSupported("copy") && (
                <div>
                  <button className="btn btn-info" onClick={copyToClipboard}>
                    Copy to Clipboard
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
