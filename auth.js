const passport = require('passport'); //tutorial: https://www.youtube.com/watch?v=Q0a0594tOrc
const { Customer } = require('./src/db');
const GoogleStrategy = require('passport-google-oauth2').Strategy;

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      callbackURL: process.env.BACKEND_URL + '/google/callback', //esta callback es la url a la que vas cuando el login es successful
      passReqToCallback: true,
    },
    async function (request, accessToken, refreshToken, profile, done) {
      try {
        const [user, created] = await Customer.findOrCreate({
          where: { email: profile.email },
          defaults: {
            name: profile.given_name,
            lastName: profile.family_name,
            personalId: profile.id,
            birthDate: '2000-02-01',
            address: 'n/a',
            city: 'n/a',
            country: 'n/a',
            zipCode: 'n/a',
            phoneNumber: 'n/a',
            password: 'google-auth',
          },
        });

        console.log('llegó');
        return done(null, user);
      } catch (err) {
        return done(err, null);
      }
    }
  )
);


passport.serializeUser(function (user, done) {
  done(null, user);
});

passport.deserializeUser(function (user, done) {
  done(null, user);
});
