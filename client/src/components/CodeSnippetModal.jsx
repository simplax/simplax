import React, { useRef } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { tomorrow } from "react-syntax-highlighter/dist/esm/styles/prism";

export default function CodeSnipppetModal({ parallaxDataCode, onCloseClick }) {
  const codeSnippetValue = useRef(null);

  if (parallaxDataCode.length !== 0) {
    const propertiesArrayEnter = parallaxDataCode[0].properties.map(property => {
      if (
        property.property === "color" ||
        property.property === "backgroundColor" ||
        property.property === "borderColor" ||
        property.property === "borderBottomColor" ||
        property.property === "borderTopColor" ||
        property.property === "borderLeftColor" ||
        property.property === "borderRightColor"
      ) {
        return `
          {
            startValue: "${property.startValue}",
            endValue: "${property.endValue}",
            property: "${property.property}",
            unit: "${property.unit}"
          }`;
      } else {
        return `{
            startValue: ${property.startValue},
            endValue: ${property.endValue},
            property: "${property.property}",
            unit: "${property.unit}"
          }`;
      }
    });

    const propertiesArrayLeave = parallaxDataCode[1].properties.map(property => {
      if (
        property.property === "color" ||
        property.property === "backgroundColor" ||
        property.property === "borderColor" ||
        property.property === "borderBottomColor" ||
        property.property === "borderTopColor" ||
        property.property === "borderLeftColor" ||
        property.property === "borderRightColor"
      ) {
        return `
          {
            startValue: "${property.startValue}",
            endValue: "${property.endValue}",
            property: "${property.property}",
            unit: "${property.unit}"
          }`;
      } else {
        return `{
            startValue: ${property.startValue},
            endValue: ${property.endValue},
            property: "${property.property}",
            unit: "${property.unit}"
          }`;
      }
    });
    var code = `
import React from "react";
import Plx from "react-plx";
import ReactDOM from "react-dom";

import "./styles.css";
  
function Example() {
  return (
    <div>
      <div style={{ marginTop: "45vh" }}>
        <h2>Scroll down</h2>
      </div>

      <div style={{ height: "100vh" }} />

      <Plx
        parallaxData={parallaxData}
        style={{
          height: "20vw",
          width: "20vw",
          margin: "auto",
          border: "2px solid black"
        }}
      >
        {/* Place your content here */}
      </Plx>

      <div style={{ height: "100vh" }} />
    </div>
  );
}

// An array of parallax effects to be applied
const parallaxData = [
  {
    start: "${parallaxDataCode[0].start}",
    startOffset: "${parallaxDataCode[0].startOffset}",
    end: "${parallaxDataCode[0].end}",
    endOffset: "${parallaxDataCode[0].endOffset}",
    easing: "${parallaxDataCode[0].easing}",
    properties: [
        ${propertiesArrayEnter}
      ]
  },
  {
    start: "${parallaxDataCode[1].start}",
    startOffset: "${parallaxDataCode[1].startOffset}",
    end: "${parallaxDataCode[1].end}",
    endOffset: "${parallaxDataCode[1].endOffset}",
    easing: "${parallaxDataCode[1].easing}",
    properties: [
        ${propertiesArrayLeave}
    ]
  }
];

function App() {
  return (
    <div className="App">
      <Example />
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
`;
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
          <h5 className="hide-on-mobile">Code snippet</h5>
          <a
            style={{ textDecoration: "none" }}
            href="https://codesandbox.io/embed/v64l2l12y7?fontsize=14">
            Try in Codesandbox
          </a>
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
            <SyntaxHighlighter language="javascript" style={tomorrow} useInlineStyles>
              {code}
            </SyntaxHighlighter>
          </pre>
          <textarea className="hidden" ref={codeSnippetValue} value={code} readOnly />
        </div>
      </div>
    </div>
  );
}
