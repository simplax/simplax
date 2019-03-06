import React, { useState, useEffect } from "react";
import api from "../api";

export default function AddEffect({ likedEffects, onAddEffect }) {
  /*********************************
   * States
   *********************************/
  const [effect, setEffect] = useState("");
  const [parallaxDataTransform, setParallaxDataTransform] = useState(null);
  const [parallaxDataCssFilter, setParallaxDataCssFilter] = useState(null);
  const [parallaxDataColor, setParallaxDataColor] = useState(null);

  /*********************************
   * Effect
   *********************************/
  useEffect(() => {
    api.getAllParallaxData().then(allPlxData => {
      setParallaxDataTransform(
        allPlxData.filter(data => !likedEffects.includes(data._id) && data.category === "transform")
      );
      setParallaxDataCssFilter(
        allPlxData.filter(
          data => !likedEffects.includes(data._id) && data.category === "css-filter"
        )
      );
      setParallaxDataColor(
        allPlxData.filter(data => !likedEffects.includes(data._id) && data.category === "colors")
      );

      if (
        allPlxData.filter(data => !likedEffects.includes(data._id) && data.category === "transform")
          .length !== 0
      ) {
        setEffect(
          allPlxData.filter(
            data => !likedEffects.includes(data._id) && data.category === "transform"
          )[0]._id
        );
      } else if (
        allPlxData.filter(
          data => !likedEffects.includes(data._id) && data.category === "css-filter"
        ).length !== 0
      ) {
        setEffect(
          allPlxData.filter(
            data => !likedEffects.includes(data._id) && data.category === "css-filter"
          )[0]._id
        );
      } else if (
        allPlxData.filter(data => !likedEffects.includes(data._id) && data.category === "colors")
          .length !== 0
      ) {
        setEffect(
          allPlxData.filter(
            data => !likedEffects.includes(data._id) && data.category === "colors"
          )[0]._id
        );
      } else {
        setEffect("");
      }
    });
  }, [likedEffects]);

  /*********************************
   * Event Handler
   *********************************/

  /*********************************
   * Render
   *********************************/
  if (!parallaxDataTransform || !parallaxDataCssFilter || !parallaxDataColor) {
    return (
      <div className="">
        <h5>Loading...</h5>
      </div>
    );
  }
  return (
    <div className="AddEffect">
      <div className="d-flex justify-content-between align-items-center">
        <select
          className="custom-select bg-dark text-light"
          value={effect}
          onChange={e => setEffect(e.target.value)}>
          {parallaxDataTransform.length !== 0 ? (
            <optgroup label="Transform">
              {parallaxDataTransform.map(effect => (
                <option key={effect._id} value={effect._id}>
                  {effect.property}
                </option>
              ))}
            </optgroup>
          ) : null}
          {parallaxDataCssFilter.length !== 0 ? (
            <optgroup label="CSS-Filter">
              {parallaxDataCssFilter.map(effect => (
                <option key={effect._id} value={effect._id}>
                  {effect.property}
                </option>
              ))}
            </optgroup>
          ) : null}
          {parallaxDataColor.length !== 0 ? (
            <optgroup label="Colors">
              {parallaxDataColor.map(effect => (
                <option key={effect._id} value={effect._id}>
                  {effect.property}
                </option>
              ))}
            </optgroup>
          ) : null}
        </select>
        <button
          disabled={effect ? false : true}
          className="btn-lg border-0 bg-dark text-primary fas fa-plus-circle"
          onClick={() => onAddEffect(effect)}
        />
      </div>
    </div>
  );
}
