const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const parallaxDataSchema = new Schema(
  {
    category: {
      type: String,
      enum: ["transform", "colors", "css-filter"],
      required: true
    },
    property: {
      type: String,
      required: true
    },
    startValue: {
      type: Schema.Types.Mixed,
      required: true
    },
    endValue: {
      type: Schema.Types.Mixed,
      required: true
    },
    minValue: {
      type: Schema.Types.Mixed
    },
    maxValue: {
      type: Schema.Types.Mixed
    },
    unit: {
      type: String,
      default: ""
    },
    start: {
      type: String,
      default: "self",
      required: true
    },
    startOffsetIn: {
      type: String,
      required: true
    },
    startOffsetOut: {
      type: String,
      required: true
    },
    end: {
      type: String,
      default: "self",
      required: true
    },
    endOffsetIn: {
      type: String,
      required: true
    },
    endOffsetOut: {
      type: String,
      required: true
    },
    easing: {
      type: String,
      default: "easeInSine"
    }
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at"
    }
  }
);

const ParallaxData = mongoose.model("ParallaxData", parallaxDataSchema);
module.exports = ParallaxData;
