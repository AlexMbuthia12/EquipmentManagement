// hash.js
const bcrypt = require('bcrypt');

const plainPassword = 'admin1234';

bcrypt.hash(plainPassword, 10, (err, hash) => {
  if (err) {
    console.error('Error hashing password:', err);
    return;
  }

  console.log('Hashed password:\n', hash);
});
