const bcrypt = require('bcrypt');
const bcryptSalt = 10;

const users = [
  {
    username: 'alice',
    password: bcrypt.hashSync('alice', bcrypt.genSaltSync(bcryptSalt))
  },
  {
    username: 'bob',
    password: bcrypt.hashSync('bob', bcrypt.genSaltSync(bcryptSalt))
  }
];

module.exports = users;
