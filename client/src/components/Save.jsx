import React, { useState, useEffect } from "react";
import api from "../api";

export default function Save({ modifiedEffects, likedEffects, onSave, loadedFile }) {
  const [newtitle, setNewTitle] = useState(
    loadedFile && loadedFile.savedprofile.title ? loadedFile.savedprofile.title : "Save file"
  );
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (loadedFile && loadedFile.savedprofile.title) setNewTitle(loadedFile.savedprofile.title);
    else setNewTitle("Save file");
  }, [loadedFile]);

  function handleChange(e) {
    setNewTitle(e.target.value);
  }

  let data = {
    title: newtitle,
    modifiedEffects: modifiedEffects,
    likedEffects: likedEffects
  };

  return (
    <div className="Save">
      <div className="d-flex justify-content-between align-items-center">
        <input
          className="form-control bg-dark-light text-light"
          type="text"
          onChange={e => handleChange(e)}
          value={newtitle}
        />
        {isSaving ? (
          <div className="btn-icon">
            <div className="spinner-border spinner-border-sm text-primary" role="status">
              <span className="sr-only">Loading...</span>
            </div>
          </div>
        ) : (
          <div
            className="btn-icon text-primary"
            onClick={() => {
              onSave(data);
              setIsSaving(true);
              setTimeout(() => setIsSaving(false), 1000);
            }}>
            <i className="fas fa-save" />
          </div>
        )}
      </div>
    </div>
  );
}
