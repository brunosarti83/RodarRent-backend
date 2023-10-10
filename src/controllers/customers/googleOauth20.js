const passport = require('passport');

const isLoggedIn = (req,res,next) => {
  console.log('is logged in')
  req.user ? next() : res.sendStatus(401); //es un middleware, si tengo user pasa al siguiente, sino manda un 401 (unauthorized)
}

const loginSuccess = (req, res) => {
  console.log('...loginSuccess') 
  const userData = req.user
  res.redirect(307, process.env.CLIENT_URL + `/googleAuthAux?userData=${encodeURIComponent(JSON.stringify({...userData, date: new Date()}))}`);
};


const loginFailure = (req, res) => {
  res.send('login failed')
}

const googleCallback =  passport.authenticate('google', {
  successRedirect: '/auth/success',
  failureRedirect: '/auth/failure',
})

const google = passport.authenticate("google",{scope:["email","profile"]})

const logout = (req, res, next) => {
  res.clearCookie('connect.sid')
  req.logOut((err) => {
    if (err) {
      return next(err); // Handle any errors here
    }
    req.session.destroy((err) => {
      if (err) {
        return next(err); // Handle any errors here
      }
      res.redirect(`${process.env.CLIENT_URL}`);
    });
  });
}

module.exports = {isLoggedIn,loginSuccess,loginFailure,googleCallback,google, logout}