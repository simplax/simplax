import React, { useState, useEffect } from "react";
import api from "../api";

export default function Save({ modifiedEffects, likedEffects, onSave, loadedFile }) {
  const [newtitle, setNewTitle] = useState(
    loadedFile && loadedFile.savedprofile.title ? loadedFile.savedprofile.title : "name me!"
  );

  useEffect(() => {
    if (loadedFile && loadedFile.savedprofile.title) setNewTitle(loadedFile.savedprofile.title);
    else setNewTitle("name me!");
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
      <div className="p-2 mb-1 rounded">
        <div className="row">
          <div className="col-7 pt-1">
            <input
              className="form-control bg-dark text-light"
              type="text"
              onChange={e => handleChange(e)}
              value={newtitle}
            />
          </div>
          <div className="col-5 d-flex flex-column justify-content-center">
            <button className="btn-lg border-0 bg-dark text-secondary fas fa-save" onClick={e => onSave(data)}>

            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
