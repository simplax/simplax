const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const parallaxDataSchema = new Schema(
  {
    category: {
      type: String,
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
    unit: {
      type: String,
      default: '',
      required: true
    },
    start: {
      type: String,
      default: 'self',
      required: true
    },
    startOffset: {
      type: String,
      required: true
    },
    end: {
      type: String,
      default: 'self',
      required: true
    },
    endOffset: {
      type: String,
      required: true
    },
    easing: {
      type: String,
      default: 'easeInSine',
      required: true
    }
  },
  {
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at'
    }
  }
);

const ParallaxData = mongoose.model('ParallaxData', parallaxDataSchema);
module.exports = ParallaxData;
