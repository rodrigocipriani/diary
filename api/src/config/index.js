const config = {
  apiPort: process.env.PORT || 5000,
  secret: process.env.SECRET,
  googleClientID: process.env.GOOGLE_CLIENT_ID,
  googleClientSecret: process.env.GOOGLE_CLIENT_SECRET,
  mongoURI: process.env.MONGO_URI,
  postgresDatabase: process.env.POSTGRES_DATABASE,
  postresUsername: process.env.POSTGRES_USERNAME,
  postgresPassword: process.env.POSTGRES_PASSWORD,
  cookieKey: process.env.COOKIE_KEY,
};

if (process.env.NODE_ENV === 'production') {
  module.exports = config;
} else {
  // we are in development - return the dev keys!!!
  const devConfig = require('./desenv.config'); // eslint-disable-line global-require

  module.exports = Object.assign(config, devConfig);
}
