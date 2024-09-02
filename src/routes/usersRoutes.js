import express from "express";
import UserController from "../controllers/usersController.js";
import { bearer, local } from '../middleware/autenticationMiddleware.js';

const usersRoutes = express.Router();

usersRoutes
  .get('/api/validateToken', bearer, UserController.validateToken)
  .post('/api/users/email', UserController.findUserByEmail)
  .get('/api/users/:userId', UserController.findUserById)
  .post('/api/users/findUserByToken', bearer, UserController.findUserByToken)
  .post('/api/users', UserController.createUser)
  .post('/api/users/login', local, UserController.login)
  .post('/api/users/recoverPassword', UserController.recoverPassword)
  .put('/api/users', bearer, UserController.updateUser)
  .put('/api/users/updatePassword', bearer, UserController.updatePassword)
  .delete('/api/users', bearer, UserController.deleteUser);

export default usersRoutes;
