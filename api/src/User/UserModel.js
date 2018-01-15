import mongoose, { Schema } from 'mongoose';
import bcrypt from 'bcrypt-nodejs';

class UserModel extends Schema {
  constructor() {
    const userSchema = super({
      email: {
        type: String,
        unique: true,
        lowercase: true,
      },
      password: String,
    });

    userSchema.pre('save', this.preSave);
    userSchema.methods.comparePassword = this.comparePassword;
  }

  // On Save hook, encrypt password
  // Before saving a model, run this function
  preSave(next) {
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

  comparePassword(candidatePassword, callback) {
    bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
      if (err) { return callback(err); }

      return callback(null, isMatch);
    });
  }
}

export default mongoose.model('UserModel', new UserModel());
