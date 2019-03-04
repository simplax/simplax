import React, { useState, useEffect } from "react";
import api from "../api";

export default function Save({ modifiedEffects, likedEffects, onSave }) {
  const [title, setTitle] = useState("");

  function handleChange(e) {
    setTitle(e.target.value);
  }

  let data = {
    _owner: api.getLocalStorageUser(),
    title: title,
    modifiedEffects: modifiedEffects,
    likedEffects: likedEffects
  };

  return (
    <div className="Save">
      <div className="p-2 mb-1 bg-light text-dark rounded">
        <div className="row">
          <div className="col-7">
            <input
              className="form-control"
              type="text"
              onChange={e => handleChange(e)}
              placeholder={"name me!"}
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
