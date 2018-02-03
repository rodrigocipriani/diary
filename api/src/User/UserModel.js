const bcrypt = require('bcrypt-nodejs');

module.exports = (sequelize, DataTypes) => {
  const UserModel = sequelize.define('UserModel', {
    id: {
      type: DataTypes.INTEGER,
      underscored: true,
      autoIncrement: true,
      primaryKey: true,
    },
    email: {
      type: DataTypes.TEXT,
      allowNull: true,
      underscored: true,
    },
    password: {
      type: DataTypes.TEXT,
      allowNull: true,
      underscored: true,
    },
    googleId: {
      type: DataTypes.TEXT,
      allowNull: true,
      underscored: true,
    },
    createAt: {
      type: DataTypes.DATE,
      underscored: true,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  }, {
    tableName: 'user',
  });

  const beforeSave = async (user) => {
    // generate a salt then run callback
    await bcrypt.genSalt(10, (err, salt) => {
      if (err) {
        return sequelize.Promise.reject(err);
      }

      if (!user.password || user.password === 'undefined') {
        return true;
      }
      // hash (encrypt) our password using the salt
      return bcrypt.hash(user.password, salt, null, (errHash, hash) => {
        if (errHash) { return sequelize.Promise.reject(errHash); }

        // overwrite plain texxt password with encrypted password
        user.password = hash; // eslint-disable-line no-param-reassign
        return true;
      });
    });
  };

  function comparePassword(candidatePassword, callback) {
    bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
      if (err) { return callback(err); }

      return callback(null, isMatch);
    });
  }

  UserModel.prototype.comparePassword = comparePassword;
  // UserModel.beforeCreate(beforeSave);
  UserModel.beforeSave(beforeSave);

  return UserModel;
};
