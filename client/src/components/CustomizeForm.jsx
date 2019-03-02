import React, { useState } from "react";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";

const createSliderWithTooltip = Slider.createSliderWithTooltip;
const Range = createSliderWithTooltip(Slider.Range);

export default function CustomizeForm({ data, onCloseEffect }) {
  const { _id, category, property, startValue, endValue, minValue, maxValue, unit } = data;

  const [values, setValues] = useState([startValue, endValue]);
  const [start, setStart] = useState(startValue);
  const [end, setEnd] = useState(endValue);

  return (
    <div className="CustomizeForm">
      <div className="p-2 mb-1 bg-light text-dark rounded">
        <div className="row">
          <div className="col-7 d-flex flex-column justify-content-center">
            <label>{property}</label>
            {category === "Colors" ? (
              <div className="input-group">
                <input
                  className="form-control"
                  type="color"
                  value={start}
                  onChange={e => setStart(e.target.value)}
                />
                <input
                  className="form-control"
                  type="color"
                  value={end}
                  onChange={e => setEnd(e.target.value)}
                />
              </div>
            ) : (
              <Range
                step={maxValue / 10}
                min={minValue}
                max={maxValue}
                value={values}
                onChange={e => setValues([...e])}
                // allowCross={false}
                tipFormatter={value => `${value} ${unit}`}
              />
            )}
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
