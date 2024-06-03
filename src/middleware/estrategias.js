import passport from 'passport';
import LocalStrategy from 'passport-local';
import BearerStrategy from 'passport-http-bearer';

import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/user.js';
import UserRepository from '../repositories/userRepository.js';

import { config as dotenvConfig } from 'dotenv';
dotenvConfig();

const chaveJWTDev = process.env.CHAVE_JWT;

passport.use(
  new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    session: false,
  }, async (email, password, done) => {
    const user = await UserRepository.findOne({ email: email });
    
    if (!user || !(await bcryptjs.compare(password, user.password))) {
      return done(null, false);
    }

    return done(null, user);
  }),
);

passport.use(
  new BearerStrategy(
    async (token, done) => {
      try {
        const payload = jwt.verify(token, chaveJWTDev, { expiresIn: '720h' });

        const user = await User.findById(payload.id);
        done(null, user, { scope: 'all' });
      } catch (erro) {
        console.error(erro);
        done(erro);
      }
    },
  ),
);

export default passport;