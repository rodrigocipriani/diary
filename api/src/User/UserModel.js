const mongoose = require('mongoose');
const { Schema } = require('mongoose');
const bcrypt = require('bcrypt-nodejs');

const UserModel = new Schema({
  email: {
    type: String,
    unique: true,
    lowercase: true,
  },
  password: String,
});

// On Save hook, encrypt password
// Before saving a model, run this function
function preSave(next) {
  // get access to the user model
  const user = this;

  // generate a salt then run callback
  bcrypt.genSalt(10, (err, salt) => {
    if (err) { return next(err); }

    // hash (encrypt) our password using the salt
    bcrypt.hash(user.password, salt, null, (errHash, hash) => {
      if (errHash) { return next(errHash); }

      // overwrite plain texxt password with encrypted password
      user.password = hash;
      return next();
    });
    return false;
  });
}

function comparePassword(candidatePassword, callback) {
  bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
    if (err) { return callback(err); }

    return callback(null, isMatch);
  });
}

UserModel.pre('save', preSave);
UserModel.methods.comparePassword = comparePassword;

module.exports = mongoose.model('UserModel', UserModel);
