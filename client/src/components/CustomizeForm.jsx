import React, { useState, useEffect } from "react";

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
  // let step = maxValue / 100;
  let step = "any";
  if (unit === "deg") {
    step = 5;
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
      <label className="mb-0">{property}</label>
      <div className="d-flex justify-content-between align-items-center">
        {category === "colors" ? (
          <div className="input-group w-75">
            <input
              className="form-control bg-dark text-light"
              type="color"
              value={values[0]}
              onChange={e => {
                setValues([e.target.value, values[1]]);
              }}
            />
            <input
              className="form-control bg-dark text-light"
              type="color"
              value={values[1]}
              onChange={e => {
                setValues([values[0], e.target.value]);
              }}
            />
          </div>
        ) : (
          <div className="input-group w-75">
            <input
              step={step}
              min={minValue}
              max={maxValue}
              className="form-control bg-dark text-light"
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
              className="form-control bg-dark text-light"
              type="number"
              value={values[1]}
              onChange={e => {
                setValues([values[0], Number(e.target.value)]);
              }}
            />
            {unit ? (
              <div className="input-group-append">
                <span className="input-group-text bg-light">{unit}</span>
              </div>
            ) : null}
          </div>
        )}
        <div
          className="btn-icon text-primary"
          onClick={() => {
            onResetEffect(property);
            setValues([startValue, endValue]);
          }}>
          <i className="fas fa-undo-alt" />
        </div>
        <div className="btn-icon text-secondary" onClick={() => onCloseEffect(_id, property)}>
          <i className="fas fa-times-circle" />
        </div>
      </div>
    </div>
  );
}
