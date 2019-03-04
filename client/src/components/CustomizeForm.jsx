import React, { useState, useEffect } from "react";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";

const createSliderWithTooltip = Slider.createSliderWithTooltip;
const Range = createSliderWithTooltip(Slider.Range);

export default function CustomizeForm({
  data,
  modifiedEffects,
  onModifyEffect,
  onResetEffect,
  onCloseEffect
}) {
  /*********************************
   * Get data from props
   *********************************/
  let { _id, category, property, startValue, endValue, minValue, maxValue, unit } = data;

  if (modifiedEffects && modifiedEffects.find(obj => obj.property === property)) {
    const index = modifiedEffects.findIndex(obj => obj.property === property);
    var startValueModified = modifiedEffects[index].values[0];
    var endValueModified = modifiedEffects[index].values[1];
  }
  let step = maxValue / 20;
  if (unit === "deg") {
    step = 5;
  } else if (property === "scale") {
    step = 0.1;
  }

  /*********************************
   * States
   *********************************/
  const [values, setValues] = useState([
    startValueModified ? startValueModified : startValue,
    endValueModified ? endValueModified : endValue
  ]);

  useEffect(() => {
    onModifyEffect(property, values);
  }, [values]);

  /*********************************
   * Render
   *********************************/
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
                  }}
                />
                <input
                  className="form-control"
                  type="color"
                  value={values[1]}
                  onChange={e => {
                    setValues([values[0], e.target.value]);
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
            <button className="btn btn-info btn-block btn-sm" onClick={() => onCloseEffect(_id, property)}>
              Remove
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}