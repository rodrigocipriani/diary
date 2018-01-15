import passport from 'passport';
import LocalStrategy from 'passport-local';
import { ExtractJwt, Strategy as JwtStrategy } from 'passport-jwt';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import UserModel from '../User/UserModel';
import config from '../config';

/**
 * GOOGLE STRATEGY
 */
const googleLogin = new GoogleStrategy(
  {
    clientID: config.googleClientID,
    clientSecret: config.googleClientSecret,
    callbackURL: '/api/auth/google/callback',
    proxy: true,
  },
  async (accessToken, refreshToken, profile, done) => {
    console.log('profile', profile);
    const existingUser = await UserModel.findOne({ googleId: profile.id });
    console.log('existingUser', existingUser);

    if (existingUser) {
      return done(null, existingUser);
    }

    const user = await new UserModel({ googleId: profile.id, email: profile.email }).save();
    return done(null, user);
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
  UserModel.findOne({ email }, (err, user) => {
    if (err) { return done(err); }
    if (!user) { return done(null, false); }

    // compare passwords - is `password` equal to user.password?
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
  UserModel.findById(payload.sub, (err, user) => {
    if (err) { return done(err, false); }

    if (user) {
      return done(null, user);
    }
    return done(null, false);
  });
}));

// Tell passport to use this passport
passport.use(jwtLogin);
passport.use(localLogin);
passport.use(googleLogin);
