import React, { useState, useEffect } from "react";
import api from "../api";

export default function AddEffect({ likedEffect, onAddEffect }) {
  /*********************************
   * States
   *********************************/
  const [effect, setEffect] = useState(null);
  const [parallaxData, setParallaxData] = useState(null);

  /*********************************
   * Effect
   *********************************/
  useEffect(() => {
    api.getAllParallaxData().then(allPlxData => {
      setParallaxData(allPlxData.filter(data => !likedEffect.includes(data._id)));
      setEffect(allPlxData.filter(data => !likedEffect.includes(data._id))[0]._id);
    });
  }, [likedEffect]);

  /*********************************
   * Event Handler
   *********************************/

  /*********************************
   * Render
   *********************************/
  if (!parallaxData) {
    return (
      <div className="Customize">
        <p>Loading...</p>
      </div>
    );
  }
  return (
    <div className="AddEffect">
      <div className="p-2 mb-1 bg-light text-dark rounded">
        <div className="row">
          <div className="col-7">
            <select
              className="custom-select"
              value={effect}
              onChange={e => setEffect(e.target.value)}>
              {parallaxData.map(data => (
                <option key={data._id} value={data._id}>
                  {data.property}
                </option>
              ))}
            </select>
          </div>
          <div className="col-5 d-flex flex-column justify-content-center">
            <button
              disabled={parallaxData.length === 0 ? true : false}
              className="btn btn-info btn-block btn-sm"
              onClick={() => onAddEffect(effect)}>
              Add
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
