const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../.env') });

const mongoose = require('mongoose');
const User = require('../models/User');
const userData = require('./userData');
const ParallaxData = require('../models/ParallaxData');
const parallaxData = require('./parallaxData');

require('../configs/database');

Promise.all([User.deleteMany({}), ParallaxData.deleteMany({})])
  .then(() => {
    return Promise.all([
      User.create(userData),
      ParallaxData.create(parallaxData)
    ]);
  })
  .then(([usersCreated, parallaxDataCreated]) => {
    console.log(`${usersCreated.length} users created`);
    console.log(`${parallaxDataCreated.length} parallaxData created`);
  })
  .then(() => {
    mongoose.disconnect();
  })
  .catch(err => {
    mongoose.disconnect();
    throw err;
  });

// User.deleteMany({})
//   .then(() => {
//     return User.create(userData)
//   })
//   .then(usersCreated => {
//     console.log(`${usersCreated.length} users created with the following id:`);
//     console.log(usersCreated.map(u => u._id));
//   })
//   .then(() => {
//     mongoose.disconnect()
//   })
//   .catch(err => {
//     mongoose.disconnect()
//     throw err
//   })
