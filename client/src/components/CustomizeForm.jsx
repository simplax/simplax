import React, { useState } from "react";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";

const createSliderWithTooltip = Slider.createSliderWithTooltip;
const Range = createSliderWithTooltip(Slider.Range);

export default function CustomizeForm({ start, end, property, unit }) {
  const [values, setValues] = useState([start, end]);

  return (
    <div className="CustomizeForm">
      <div className="alert alert-light alert-dismissible fade show" role="alert">
        <label>{property}</label>

        <Range
          className="w-75"
          step={0.1}
          min={start}
          max={end}
          value={values}
          onChange={e => setValues([...e])}
          allowCross={false}
          tipFormatter={value => `${value} ${unit}`}
        />

        {/* mute and close buttons */}
        <button type="button" className="close mute pl-0" aria-label="Mute">
          <span aria-hidden="true">
            {/* <i className="fas fa-equals fa-rotate-90" /> */}
            <i className="far fa-pause-circle" />
          </span>
        </button>
        <button type="button" className="close pl-0" data-dismiss="alert" aria-label="Close">
          <span aria-hidden="true">
            {/* <i className="fas fa-times" /> */}
            <i className="far fa-times-circle" />
          </span>
        </button>
      </div>
    </div>
  );
}
