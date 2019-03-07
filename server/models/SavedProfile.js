const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const savedProfileSchema = new Schema({
  _owner: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },

  title:
  {
    type: String,
    required: true,
    unique: true
  },

  modifiedEffects: {
    // type: [{
    //   property: String,
    //   value: [Schema.Types.Mixed]
    // }],
    type: Array,
    required: true
  },

  likedEffects: {
    type: [String], // NOTES: could be changed to Schema.Types.ObjectId
    required: true
  }
})

const SavedProfile = mongoose.model('SavedProfile', savedProfileSchema);

module.exports = SavedProfile