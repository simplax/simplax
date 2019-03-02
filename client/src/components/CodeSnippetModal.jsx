import React, { useRef } from "react";

export default function CodeSnipppetModal({ parallaxDataCode }) {
  const codeSnippetValue = useRef(null);

  const code = JSON.stringify(parallaxDataCode);

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
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <pre>{code}</pre>
              <textarea className="hidden" rows="0" ref={codeSnippetValue} defaultValue={code} />
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
