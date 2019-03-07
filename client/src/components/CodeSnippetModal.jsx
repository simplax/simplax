import React, { useRef, useState, useEffect } from "react";
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { tomorrow } from 'react-syntax-highlighter/dist/esm/styles/prism';

export default function CodeSnipppetModal({ parallaxDataCode, onCloseClick }) {
  const codeSnippetValue = useRef(null);

  if (parallaxDataCode.length !== 0) {
    const propertiesArrayEnter = parallaxDataCode[0].properties.map(property => {
      return `
          {
            startValue: '${property.startValue}',
            endValue: '${property.endValue}',
            property: '${property.property}',
            unit: '${property.unit}'
          }`;
    });

    const propertiesArrayLeave = parallaxDataCode[1].properties.map(property => {
      return `
          {
            startValue: '${property.startValue}',
            endValue: '${property.endValue}',
            property: '${property.property}',
            unit: '${property.unit}'
          }`;
    });
    var code = `import React, { Component } from 'react';
import Plx from 'react-plx';
  
class Example extends Component {
  render() {
    return (
    <div>
      <div style={{ height: '100vh' }} />

      <Plx parallaxData={parallaxData} style={{ height: '20vw', width: "20vw", margin: "auto" }}>
        Place your content here.
      </Plx>

      <div style={{ height: '100vh' }} />
    </div>
    );
  }
}

// An array of parallax effects to be applied
const parallaxData = [
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
]`;
  }

  function copyToClipboard(e) {
    codeSnippetValue.current.select();
    document.execCommand("copy");
    e.target.focus(); // not show text selection
  }

  return (
    <div className="CodeSnippetModal">
      <div className="code-snippet-container">
        <div className="code-snippet-title d-fley justify-content-between">
          <h5>Code snippet for your awesome React app!</h5>
          <div className="d-flex">
            <div className="btn-icon text-primary" onClick={copyToClipboard}>
              <i className="fas fa-paste" />
            </div>
            <div className="btn-icon text-secondary" onClick={onCloseClick}>
              <i className="fas fa-times-circle" />
            </div>
          </div>
        </div>
        <div className="code-snippet-seperator" />
        <div className="code-snippet-body overflow-auto rounded">
          <pre className="pre-text">

            <SyntaxHighlighter language='javascript' style={tomorrow} useInlineStyles>{code}</SyntaxHighlighter>
          </pre>
          <textarea className="hidden" ref={codeSnippetValue} value={code} readOnly />
        </div>
      </div>
    </div>
  );
}
