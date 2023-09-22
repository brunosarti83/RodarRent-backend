const passport = require('passport'); //tutorial: https://www.youtube.com/watch?v=Q0a0594tOrc
const { Customer } = require('./src/db');
const GoogleStrategy = require('passport-google-oauth2').Strategy;
const axios = require('axios')

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
        const foundCustomer = await Customer.findOne({
          where: { email: profile.email },
          }
        );
        if(foundCustomer) {
          if(!foundCustomer.isActive) {
            const updated = await Customer.update({isActive:true}, {
              where: { personalId: foundCustomer.personalId },
              return: true,
              raw: true,
            });
          }
        }
        
        const [user, created] = await Customer.findOrCreate({
          where: { email: profile.email },
          defaults: {
            name: profile.given_name,
            lastName: profile.family_name,
            personalId: profile.id,
            birthDate: 'n/a',
            address: 'n/a',
            city: 'n/a',
            country: 'n/a',
            zipCode: 'n/a',
            phoneNumber: 'n/a',
            password: 'google-auth',
          },
        });
        
        if(created) {
          const body = {
            userName: profile.given_name, 
            toEmailAddress: profile.email, 
            replyToEmailAddress: 'rodarrent@outlook.com',
            subject: `Welcome ${profile.given_name}`, 
            template: 'register',
          };
          await axios.post(`${process.env.BACKEND_URL}/sendemail`,body)
        }
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
