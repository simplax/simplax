import React, { useRef } from "react";

export default function CodeSnipppetModal() {
  const codeSnippetValue = useRef(null);

  const code = `import React, { Component } from 'react';
import Plx from 'react-plx';
  
// An array of parallax effects to be applied - see below for detail
const parallaxData = [
  {
    start: 0,
    end: 500,
    properties: [
      {
        startValue: 1,
        endValue: 2,
        property: 'scale',
      },
    ],
  },
];
 
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
        data-target="#codeSnippetModal">
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
                <span aria-hidden="true">
                  <i className="far fa-times-circle" />
                </span>
              </button>
            </div>
            <div className="modal-body">
              <pre>{code}</pre>
              <textarea rows="0" ref={codeSnippetValue} defaultValue={code} />
            </div>

            <div className="modal-footer">
              <button type="button" className="btn btn-outline-info" data-dismiss="modal">
                Close
              </button>
              {/* Logical shortcut for only displaying the 
                   button if the copy command exists */
              document.queryCommandSupported("copy") && (
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
