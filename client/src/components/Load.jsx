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
      }
      else {
        setSavedProfile([]);
        setTitle('');

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
  }, [remove])



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
              onChange={e => {
                setTitle(e.target.value)

                onLoad(e.target.value)
              }}>
              <option value="instruction">Load your file</option>
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

            <button onClick={() => onDelete(title)} className="btn btn-info">D</button>
          </div>
        </div>
      </div>
    </div>
  );
}