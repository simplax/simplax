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
    console.log("TCL: modifiedEffects[index]", modifiedEffects[index]);
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
      <div className="d-flex justify-content-between align-items-end">
        <div className="w-75">
          <label className="col-form-label-sm mb-1">{property}</label>
          {category === "colors" ? (
            <div className="input-group input-group-sm">
              <input
                className="form-control form-control-sm bg-dark text-light"
                type="color"
                value={values[0]}
                onChange={e => {
                  setValues([e.target.value, values[1]]);
                }}
              />
              <input
                className="form-control form-control-sm bg-dark text-light"
                type="color"
                value={values[1]}
                onChange={e => {
                  setValues([values[0], e.target.value]);
                }}
              />
            </div>
          ) : (
            <div className="input-group input-group-sm">
              <input
                step={step}
                min={minValue}
                max={maxValue}
                className="form-control form-control-sm bg-dark text-light"
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
                className="form-control form-control-sm bg-dark text-light"
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
        </div>
        <div className="d-flex">
          <div
            className="btn-icon text-primary p-1 ml-2 mr-2"
            onClick={() => {
              onResetEffect(property);
              setValues([startValue, endValue]);
            }}>
            <i className="fas fa-undo-alt" />
          </div>
          <div className="btn-icon text-secondary p-1" onClick={() => onCloseEffect(_id, property)}>
            <i className="fas fa-times-circle" />
          </div>
        </div>
      </div>
    </div>
  );
}
