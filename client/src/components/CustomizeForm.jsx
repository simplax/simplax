import React, { useState, useEffect } from "react";
import Slider, { createSliderWithTooltip } from "rc-slider";
import Tooltip from "rc-tooltip";
import "rc-slider/assets/index.css";

// const createSliderWithTooltip = Slider.createSliderWithTooltip;
const Range = createSliderWithTooltip(Slider.Range);

const Handle = Slider.Handle;

const handle = props => {
  const { value, dragging, index, ...restProps } = props;
  return (
    <Tooltip
      prefixCls="rc-slider-tooltip"
      overlay={value}
      visible={dragging}
      placement="top"
      key={index}>
      <Handle value={value} {...restProps} />
    </Tooltip>
  );
};

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
  const [crossed, setCrossed] = useState(undefined);
  const [decreasing, setDecreasing] = useState(false);
  const [valBefore, setValBefore] = useState([]);

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
                  onBeforeChange={e => {
                    setValBefore(e);
                    values[0] > values[1] ? setCrossed(true) : setCrossed(false);
                  }}
                  onChange={e => {
                    console.log("TCL: values", values);
                    console.log("TCL: e", e);

                    // if (direction detection is needed) {
                    //   setDecreasing(true);
                    // }

                    // console.log("TCL: decreasing", decreasing);
                    // if (decreasing) {
                    //   if (values[1] === valBefore[0]) {
                    //     setCrossed(true);
                    //     console.log("TCL: crossed", crossed);
                    //   }
                    //   crossed ? setValues([valBefore[0], e[0]]) : setValues([e[0], e[1]]);
                    // } else {
                    //   if (values[0] === valBefore[1]) {
                    //     setCrossed(true);
                    //     console.log("TCL: crossed", crossed);
                    //   }
                    //   crossed ? setValues([e[1], valBefore[1]]) : setValues([e[0], e[1]]);
                    // }

                    setValues([...e]);
                  }}
                  onAfterChange={e => {
                    values[0] > values[1] ? setCrossed(true) : setCrossed(false);
                    setDecreasing(false);
                  }}
                  tipFormatter={value => `${value} ${unit}`}
                  handle={handle}
                  handleStyle={[
                    {
                      borderRadius: 4,
                      height: 14,
                      width: 18,
                      marginTop: -5,
                      // marginLeft: 0,
                      backgroundColor: "blue"
                    },
                    {
                      borderRadius: 4,
                      height: 14,
                      width: 18,
                      marginTop: -5
                      // marginLeft: -16
                    }
                  ]}
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
          <div className="col-5 d-flex flex-column justify-content-center">
            <button
              className="btn btn-outline-info btn-block btn-sm"
              onClick={() => {
                onResetEffect(property);
                setValues([startValue, endValue]);
              }}>
              Reset
            </button>
            <button
              className="btn btn-info btn-block btn-sm"
              onClick={() => onCloseEffect(_id, property)}>
              Remove
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
