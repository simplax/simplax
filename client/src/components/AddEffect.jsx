import React, { useState, useEffect } from "react";
import api from "../api";

export default function AddEffect({ likes, onAddEffect }) {
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
      setParallaxData(allPlxData.filter(data => !likes.includes(data._id)));
      setEffect(allPlxData.filter(data => !likes.includes(data._id))[0]);
    });
  }, [likes]);

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
      <div className="p-3 bg-light text-dark rounded">
        <div className="row">
          <div className="col-8">
            {/* TO DO: not working if not first option selected */}
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
          <div className="col-2" />
          <div className="col-2">
            <button
              // TO DO: disable button, if all effects are used
              // disabled={parallaxData.length === 0 ? true : false}
              className="btn btn-info btn-block"
              onClick={() => onAddEffect(effect._id)}>
              Add
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
