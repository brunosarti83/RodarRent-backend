const passport = require('passport');

const isLoggedIn = (req,res,next) => {
  req.user ? next() : res.sendStatus(401); //es un middleware, si tengo user pasa al siguiente, sino manda un 401 (unauthorized)
}

const loginSuccess = (req, res) => { 
  const userData = req.user
  res.redirect(301, process.env.CLIENT_URL + `/googleAuthAux?userData=${encodeURIComponent(JSON.stringify(userData))}`);
};


const loginFailure = (req, res) => {
  res.send('login failed')
}

const googleCallback =  passport.authenticate('google', {
  successRedirect: '/auth/success',
  failureRedirect: '/auth/failure',
})

const google = passport.authenticate("google",{scope:["email","profile"]})

const logout = (req,res) => {
    req.logout()
    res.redirect(process.env.CLIENT_URL)
  }

module.exports = {isLoggedIn,loginSuccess,loginFailure,googleCallback,google, logout}