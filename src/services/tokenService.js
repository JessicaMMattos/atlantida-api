import { config as dotenvConfig } from 'dotenv';
dotenvConfig();

import jwt from 'jsonwebtoken';
import User from '../models/user.js';
import logger from '../utils/logger.js';

const chaveJWTDev = process.env.CHAVE_JWT;

class TokenService {

  static async createTokenJWT(email) {
    logger.info('TokenService.createTokenJWT');
    const account = await User.findOne({ email: email });

    const payload = {
      id: account.id,
    };

    const token = jwt.sign(payload, chaveJWTDev, { expiresIn: '720h' });
    return token;
  }

  static async createNewTokenJWT(req) {
    logger.info('TokenService.createNewTokenJWT');
    const token = req.headers.authorization;

    const id = await this.returnUserIdToToken(token);

    const novoToken = jwt.sign({ id: id }, chaveJWTDev, { expiresIn: '720h' });
    return novoToken;
  }

  static async returnUserIdToToken(token) {
    logger.info('TokenService.returnUserIdToToken');
    const tokenJWT = token.replace("Bearer ", "");

    const decoded = jwt.verify(tokenJWT, chaveJWTDev);

    if (!decoded.id) {
      throw new Error('ID da conta não encontrado no token');
    }

    return decoded.id;
  }
}

export default TokenService;