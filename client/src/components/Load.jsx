import React, { useState, useEffect } from "react";
import api from "../api";

export default function Load({ onLoad, saved }) {
  const [savedProfile, setSavedProfile] = useState([]);

  const [title, setTitle] = useState("");

  useEffect(() => {
    api.getSavedProfile().then(data => {
      setSavedProfile(data);
      setTitle(data[0]._id);
    });
  }, []);

  useEffect(() => {
    api.getSavedProfile().then(data => {
      setSavedProfile(data);
    });
  }, [saved]);

  return (
    <div className="Load">
      <div className="p-2 mb-1 bg-light text-dark rounded">
        <div className="row">
          <div className="col-7">
            <select
              className="custom-select"
              name=""
              id=""
              value={title}
              onChange={e => setTitle(e.target.value)}>
              {savedProfile.map(profile => {
                return (
                  <option key={profile.title} value={profile._id}>
                    {profile.title}
                  </option>
                );
              })}
            </select>
          </div>
          <div className="col-5 d-flex flex-column justify-content-center">
            <button
              disabled={savedProfile.length === 0 ? true : false}
              className="btn btn-info"
              onClick={() => {
                onLoad(title);
              }}>
              Load
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
