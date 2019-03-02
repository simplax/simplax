import React, { useState } from "react";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";

const createSliderWithTooltip = Slider.createSliderWithTooltip;
const Range = createSliderWithTooltip(Slider.Range);

export default function CustomizeForm({ data, onModifyEffect, onResetEffect, onCloseEffect }) {
  const { _id, category, property, startValue, endValue, minValue, maxValue, unit } = data;

  let step = maxValue / 10;
  if (unit === "deg") {
    step = 5;
  } else if (property === "scale") {
    step = 0.1;
  }
  const [values, setValues] = useState([startValue, endValue]);

  return (
    <div className="CustomizeForm">
      <div className="p-2 mb-1 bg-light text-dark rounded">
        <div className="row">
          <div className="col-7 d-flex flex-column justify-content-center">
            <label>{property}</label>
            {category === "colors" ? (
              <div className="input-group">
                <input
                  className="form-control"
                  type="color"
                  value={values[0]}
                  onChange={e => {
                    setValues([e.target.value, values[1]]);
                    onModifyEffect(property, values);
                  }}
                />
                <input
                  className="form-control"
                  type="color"
                  value={values[1]}
                  onChange={e => {
                    setValues([values[0], e.target.value]);
                    onModifyEffect(property, values);
                  }}
                />
              </div>
            ) : (
              <div>
                <Range
                  step={step}
                  min={minValue}
                  max={maxValue}
                  value={values}
                  onChange={e => {
                    setValues([...e]);
                    onModifyEffect(property, values);
                  }}
                  // allowCross={false}
                  tipFormatter={value => `${value} ${unit}`}
                />
                <div className="input-group">
                  <input
                    step={step}
                    min={minValue}
                    max={maxValue}
                    className="form-control"
                    type="number"
                    value={values[0]}
                    onChange={e => {
                      setValues([Number(e.target.value), values[1]]);
                      onModifyEffect(property, values);
                    }}
                  />
                  <input
                    step={step}
                    min={minValue}
                    max={maxValue}
                    className="form-control"
                    type="number"
                    value={values[1]}
                    onChange={e => {
                      setValues([values[0], Number(e.target.value)]);
                      onModifyEffect(property, values);
                    }}
                  />
                </div>
              </div>
            )}
          </div>
          <div className="col-5">
            <button
              className="btn btn-outline-info btn-block btn-sm"
              onClick={() => {
                onResetEffect(property);
                setValues([startValue, endValue]);
              }}>
              Reset
            </button>
            <button className="btn btn-info btn-block btn-sm" onClick={() => onCloseEffect(_id)}>
              Remove
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
