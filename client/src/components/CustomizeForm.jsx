import React, { useState } from "react";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";

const createSliderWithTooltip = Slider.createSliderWithTooltip;
const Range = createSliderWithTooltip(Slider.Range);

export default function CustomizeForm({ start, end, property, unit, onCloseEffect, _id }) {
  const [values, setValues] = useState([start, end]);

  return (
    <div className="CustomizeForm">
      <div className="p-2 mb-1 bg-light text-dark rounded">
        <div className="row">
          <div className="col-7 d-flex flex-column justify-content-center">
            <label>{property}</label>
            <Range
              step={0.1}
              min={start}
              max={end}
              value={values}
              onChange={e => setValues([...e])}
              allowCross={false}
              tipFormatter={value => `${value} ${unit}`}
            />
          </div>
          <div className="col-5">
            <button className="btn btn-outline-info btn-block btn-sm">Mute</button>
            <button className="btn btn-info btn-block btn-sm" onClick={() => onCloseEffect(_id)}>
              Remove
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
