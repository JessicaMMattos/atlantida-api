import { config as dotenvConfig } from 'dotenv';
dotenvConfig();

import fs from 'fs';
import crypto from "crypto";
import bcryptjs from 'bcryptjs';
import sgMail from '@sendgrid/mail';
import UserRepository from '../repositories/userRepository.js';

class UsersService {
  static async encryptPassword(password) {
    const passwordEncrypted = await bcryptjs.hash(password, 12);
    return passwordEncrypted;
  }

  static async sendPasswordResetEmail(userEmail, newPassword) {
    sgMail.setApiKey(process.env.TOKEN_SENDGRID);

    return new Promise((resolve, reject) => {
        fs.readFile("./src/emails/emailRecoverPassword.html", "utf-8", (err, htmlContent) => {
          if (err) {
            console.error("Erro ao ler o arquivo HTML:", err);
            reject(err);
            return;
          }

          const personalizedHtmlContent = htmlContent.replace('{{newPassword}}', newPassword);
          const msg = {
            to: userEmail,
            from: "atlantidamergulhos@gmail.com",
            subject: "Recuperação de Senha",
            text: `Sua nova senha é: ${newPassword}`,
            html: personalizedHtmlContent,
          };

          sgMail
            .send(msg)
            .then(() => {
              console.log("Email sent");
              resolve();
            })
            .catch((error) => {
              console.error(error);
              reject(error);
            });
        });
    });
  }
 
  static async findUsers() {
    return await UserRepository.findAll();
  }

  static async findUserByToken(id) {
    return await UserRepository.findById(id);
  }

  static async createUser(userData) {
    userData.password = await this.encryptPassword(userData.password);
    return await UserRepository.createUser(userData);
  }

  static async recoverPassword(email) {
    const user = await UserRepository.findOne({ email });
    if (!user) {
      throw new Error("Usuário não encontrado");
    }

    const newPassword = crypto.randomBytes(5).toString('hex');
    const newPasswordEncrypted = await this.encryptPassword(newPassword);

    await this.sendPasswordResetEmail(user.email, newPassword);

    await UserRepository.findByIdAndUpdate(user._id, { password: newPasswordEncrypted });
 }

  static async updatePassword(id, currentPassword, newPassword) {
    const user = await UserRepository.findById(id);
    const passwordMatch = await bcryptjs.compare(currentPassword, user.password);
    if (!passwordMatch) {
      throw new Error('Senha atual incorreta');
    }

    const newPasswordEncrypted = await this.encryptPassword(newPassword);
    await UserRepository.findByIdAndUpdate(id, { password: newPasswordEncrypted });
  }

  static async updateUser(id, userData) {
    delete userData.password;
    return await UserRepository.findByIdAndUpdate(id, userData);
 }

  static async deleteUser(id) {
    return await UserRepository.findByIdAndDelete(id);
  }
}

export default UsersService;
