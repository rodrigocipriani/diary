const passport = require('passport');
const LocalStrategy = require('passport-local');
const JwtStrategy = require('passport-jwt').Strategy;
const { ExtractJwt } = require('passport-jwt');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const { UserModel } = require('../models');
const config = require('../config');


passport.serializeUser((user, done) => {
  console.log('@@@ user', user);
  done(null, user.id);
  // done(null, 123);
});

passport.deserializeUser((id, done) => {
  console.log('@@@2 id', id);
  UserModel.findById(id).then((user) => {
    console.log('@@@3 user', user);
    done(null, user);
  });
  // done(null, {apiKey: '123'});
});

/**
 * GOOGLE STRATEGY
 *
 * To test in docker (192.168.99.100) use http://192.168.99.100.xip.io
 * To test in docker (192.168.99.100) use http://192.168.99.100.nip.io
 */
const googleLogin = new GoogleStrategy(
  {
    clientID: config.googleClientID,
    clientSecret: config.googleClientSecret,
    callbackURL: '/api/auth/google/callback',
    proxy: true,
  },
  async (accessToken, refreshToken, profile, done) => {
    try {
      const existingUser = await UserModel.findOne({ where: { googleId: profile.id } });

      if (existingUser) {
        return done(null, existingUser);
      }
      console.log('profile.id', profile.id);
      console.log('profile.email', profile.email);
      console.log('profile', profile);

      const googleId = profile.id;
      let email = null;
      const { emails } = profile;
      if (emails.length > 0) {
        email = emails[0].value;
      }
      console.log('googleId, email', googleId, email);
      const user = await UserModel.build({ googleId, email }).save();
      console.log('user', user);

      return done(null, user);
    } catch (err) {
      return done(err, false);
    }
  },
);

/**
 * LOCAL STRATEGY
 */
// Create local strategy
const localOptions = {
  usernameField: 'email',
};
const localLogin = new LocalStrategy(localOptions, (email, password, done) => {
  // Verify this email and password, call done with the user
  // if it is the corret email and password
  // otherwise, call done with false
  UserModel.findOne({ where: { email } }).then((user) => {
    // if (err) { return done(err); }
    if (!user) { return done(null, false); }

    // compare passwords - is `password` equal to user.password?
    if (!password || password === 'undefined') {
      return done('Password not accepted');
    }
    user.comparePassword(password, (errComparePassword, isMatch) => {
      if (errComparePassword) { return done(errComparePassword); }
      if (!isMatch) { return done(null, false); }

      return done(null, user);
    });
    return false;
  });
});

/**
 * JWT Strategy
 */
// Setup options for SWT Strategy
const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromHeader('authorization'),
  secretOrKey: config.secret,
};

// Create JWT strategy
const jwtLogin = new JwtStrategy(jwtOptions, ((payload, done) => {
  // See if the user ID in the payload exists in our database
  // If it does, call 'done' with that other
  // otherwise, call done without a user object
  console.log('payload', payload);
  UserModel.findById(payload.sub).then((user) => {
    // if (err) { return done(err, false); }

    if (user) {
      return done(null, user);
    }
    return done(null, false);
  });
}));

module.exports = {
  init() {
    // Tell passport to use this passport
    passport.use(jwtLogin);
    passport.use(localLogin);
    passport.use(googleLogin);
  },
};
