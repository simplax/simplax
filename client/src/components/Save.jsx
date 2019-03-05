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
          <div className="col-7">
            <input
              className="form-control"
              type="text"
              onChange={e => handleChange(e)}
              value={newtitle}
            />
          </div>
          <div className="col-5 d-flex flex-column justify-content-center">
            <button className="btn btn-info" onClick={e => onSave(data)}>
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
