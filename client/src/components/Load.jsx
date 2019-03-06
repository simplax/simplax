import React, { useState, useEffect } from "react";
import api from "../api";

export default function Load({ onLoad, saved, onDelete, remove }) {
  const [savedProfile, setSavedProfile] = useState([]);

  const [title, setTitle] = useState("");

  useEffect(() => {
    api.getSavedProfile().then(data => {
      if (data.length !== 0) {
        setSavedProfile(data);
        setTitle(data[0]._id);
      } else {
        setSavedProfile([]);
        setTitle("");
      }
    });
  }, []);

  useEffect(() => {
    api.getSavedProfile().then(data => {
      setSavedProfile(data);
    });
  }, [saved]);

  useEffect(() => {
    api.getSavedProfile().then(data => {
      setSavedProfile(data);
    });
  }, [remove]);

  return (
    <div className="Load">
      <div className="d-flex justify-content-between align-items-center">
        <select
          className="custom-select bg-dark-light text-light"
          name=""
          id=""
          value={title}
          onChange={e => {
            setTitle(e.target.value);

            onLoad(e.target.value);
          }}>
          <option value="instruction">Load/Delete file</option>
          {savedProfile.map(profile => {
            return (
              // <optgroup label="Load file">
              <option key={profile.title} value={profile._id}>
                {profile.title}
              </option>
              // </optgroup>
            );
          })}
        </select>
        <div className="btn-icon text-secondary" onClick={() => onDelete(title)}>
          <i className="fas fa-trash-alt" />
        </div>
      </div>
    </div>
  );
}
