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
          className="custom-select bg-dark text-light"
          name=""
          id=""
          value={title}
          onChange={e => {
            setTitle(e.target.value);

            onLoad(e.target.value);
          }}>
          <option value="instruction">Load/delete file</option>
          {savedProfile.map(profile => {
            return (
              <option key={profile.title} value={profile._id}>
                {profile.title}
              </option>
            );
          })}
        </select>
        <button
          onClick={() => onDelete(title)}
          className="btn-lg border-0 bg-dark text-secondary fas fa-trash-alt"
        />
      </div>
    </div>
  );
}
