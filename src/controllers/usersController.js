import UsersService from '../services/usersService.js';
import TokenService from '../services/tokenService.js';

class UserController {
  static validateToken = async (_req, res) => {
    try {
      res.status(200).json({ message: 'Token valido' });
    } catch (err) {
      res.status(500).send({ message: err.message });
    }
  };

  static async findUserByToken(req, res) {
    try {
      const id = await TokenService.returnUserIdToToken(req.headers.authorization);

      const user = await UsersService.findUserByToken(id);
      res.status(200).json(user);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
 };

 static async findUserByEmail(req, res) {
    try {
      const user = await UsersService.findUserByEmail(req.params.email);
      
      res.status(200).json(user);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  static async createUser(req, res) {
    try {
      const user = await UsersService.createUser(req.body);      
      res.status(201).json(user);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  };

  static async recoverPassword(req, res) {
    try {
      await UsersService.recoverPassword(req.body.email);
      res.status(201).json({ message: "Senha redefinida com sucesso" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

  static async login(req, res) {
    try {
      const token = await TokenService.createTokenJWT(req.body.email);
      
      res.set('Authorization', token);
      res.status(200).json({ token }); 
    } catch (error) {
      res.status(401).json({ message: error.message });
    }
  };

  static async updatePassword(req, res) {
    try {
      const id = await TokenService.returnUserIdToToken(req.headers.authorization);

      await UsersService.updatePassword(id, req.body.password, req.body.newPassword);
      res.status(200).send();
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

  static async updateUser(req, res) {
    try {
      const id = await TokenService.returnUserIdToToken(req.headers.authorization);

      const updatedUser = await UsersService.updateUser(id, req.body);
      res.status(200).json(updatedUser);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

  static async deleteUser(req, res) {
    try {
      const id = await TokenService.returnUserIdToToken(req.headers.authorization);

      await UsersService.deleteUser(id);
      res.status(204).json({ message: "Usuário deletado com sucesso" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
}

export default UserController;