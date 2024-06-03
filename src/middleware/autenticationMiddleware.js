import passport from './estrategias.js';

export async function local(req, res, next) {
  passport.authenticate(
    'local',
    { session: false },
    (erro, user) => {
      if (erro && erro.name === 'InvalidArgumentError') {
        return res.status(401).json({ erro: erro.message });
      }

      if (erro) {
        return res.status(500).json({ erro: erro.message });
      }

      if (!user) {
        return res.status(401).json('Credenciais inválidas');
      }

      req.user = user;
      return next();
    },
  )(req, res, next);
}

export function bearer(req, res, next) {
  passport.authenticate(
    'bearer',
    { session: false },
    async (erro, user, info) => {
      
      if (erro && erro.name === 'JsonWebTokenError') {
        return res.status(401).json({ erro: erro.message });
      }

      if (erro && erro.name === 'TokenExpiredError') {
        return res
          .status(401)
          .json({ erro: erro.message, expiradoEm: erro.expiredAt });
      }

      if (erro) {
        return res.status(500).json({ erro: erro.message });
      }

      if (!user) {
        return res.status(401).json();
      }

      req.token = info.token;
      req.user = user;  
      return next();
    },
  )(req, res, next);
}
