import React, { useState } from "react";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";

const createSliderWithTooltip = Slider.createSliderWithTooltip;
const Range = createSliderWithTooltip(Slider.Range);

export default function CustomizeForm({ start, end, property, unit, onClose, _id }) {
  const [values, setValues] = useState([start, end]);

  return (
    <div className="CustomizeForm">
      <div className="p-3 bg-light text-dark rounded d-flex justify-content-between">
        <div className="w-75">
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
        <button className="btn btn-outline-info">Mute</button>
        <button className="btn btn-info" onClick={() => onClose(_id)}>
          Remove
        </button>
      </div>
    </div>
  );
}
