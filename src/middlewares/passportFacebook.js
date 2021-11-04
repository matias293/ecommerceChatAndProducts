import passport from 'passport';
import passportFacebook from 'passport-facebook';

import Config from '../config/index'


const FaceBookStrategy = passportFacebook.Strategy;

const strategyOptions= {
  clientID: Config.FACEBOOK_APP_ID,
  clientSecret:Config.FACEBOOK_APP_SECRET ,
  callbackURL: 'http://localhost:8080/auth/facebook/callback',
  profileFields: ['id', 'displayName', 'photos', 'emails'],
};

const loginFunc = async (
  accessToken,
  refreshToken,
  profile,
  done
) => {
  
  return done(null, profile);
};

passport.use('facebook',new FaceBookStrategy(strategyOptions, loginFunc));

passport.serializeUser(function (user, cb) {
  cb(null, user);
});

passport.deserializeUser(function (obj, cb) {
  cb(null, obj);
});

export const isLoggedIn = (req, res, done) => {
  if (!req.isAuthenticated())
    return res.status(401).json({ msg: 'Unathorized' });

  done();
};

export default passport;