import React, { useRef, useState, useEffect } from 'react';

export default function CodeSnipppetModal({ parallaxDataCode, onCloseClick }) {
  const codeSnippetValue = useRef(null);

  if (parallaxDataCode.length !== 0) {
    const propertiesArrayEnter = parallaxDataCode[0].properties.map(
      property => {
        return `
          {
            startValue: '${property.startValue}',
            endValue: '${property.endValue}',
            property: '${property.property}',
            unit: '${property.unit}'
          }`;
      }
    );

    const propertiesArrayLeave = parallaxDataCode[1].properties.map(
      property => {
        return `
          {
            startValue: '${property.startValue}',
            endValue: '${property.endValue}',
            property: '${property.property}',
            unit: '${property.unit}'
          }`;
      }
    );
    var code = `import React, { Component } from 'react';
  import Plx from 'react-plx';
    
  // An array of parallax effects to be applied - see below for detail
  parallaxData = [
        {
          start: '${parallaxDataCode[0].start}',
          startOffset: '${parallaxDataCode[0].startOffset}',
          end: '${parallaxDataCode[0].end}',
          endOffset: '${parallaxDataCode[0].endOffset}',
          easing: '${parallaxDataCode[0].easing}',
          properties: [
              ${propertiesArrayEnter}
            ]
        },
        {
          start: '${parallaxDataCode[1].start}',
          startOffset: '${parallaxDataCode[1].startOffset}',
          end: '${parallaxDataCode[1].end}',
          endOffset: '${parallaxDataCode[1].endOffset}',
          easing: '${parallaxDataCode[1].easing}',
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
    document.execCommand('copy');
    e.target.focus(); // not show text selection
  }

  return (
    <div className="CodeSnippetModal">
      <div className="code-snippet-container">
        <div className="code-snippet-title">
          <h5>Code snippet for your awesome React app!</h5>
          <div className="icons">
            <i className="fas fa-paste fa-2x" onClick={copyToClipboard} />
            <i className="far fa-times-circle fa-2x" onClick={onCloseClick} />
          </div>
        </div>
        <div className="code-snippet-seperator" />
        <div className="code-snippet-body">
          <pre className="pre-text">
            <span>{code}</span>
          </pre>
          <textarea
            className="hidden"
            ref={codeSnippetValue}
            value={code}
            readOnly
          />
        </div>
      </div>
    </div>
  );
}
