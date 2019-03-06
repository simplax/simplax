import React, { useState, useEffect } from "react";
import api from "../api";

export default function Save({ modifiedEffects, likedEffects, onSave, loadedFile }) {
  const [newtitle, setNewTitle] = useState(
    loadedFile && loadedFile.savedprofile.title ? loadedFile.savedprofile.title : "Save file"
  );

  useEffect(() => {
    if (loadedFile && loadedFile.savedprofile.title) setNewTitle(loadedFile.savedprofile.title);
    else setNewTitle("Save file");
  }, [loadedFile]);

  function handleChange(e) {
    setNewTitle(e.target.value);
  }

  let data = {
    _owner: api.getLocalStorageUser(),
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
        <div className="btn-icon text-primary" onClick={() => onSave(data)}>
          <i className="fas fa-save" />
        </div>
      </div>
    </div>
  );
}
