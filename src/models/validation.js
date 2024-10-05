// validation.js
import joi from "joi";

export const validateEmail = {
  validator: (value) =>
    joi.string().email().required().validate(value).error === undefined,
  message: 'Email deve ser válido.',
};

export const validateBirthDate = {
  validator: (value) => {
    const minAge = 10;
    const dateOfBirth = new Date(value);
    const currentDate = new Date();
    const userAge = Math.floor((currentDate - dateOfBirth) / 31557600000);
    return userAge >= minAge;
  },
  message: () => `Usuário deve ter no mínimo ${minAge} anos de idade.`,
};

export const validateIssuanceDate = {
  validator: (value) => {
    const currentDate = new Date();
    return value <= currentDate;
  },
  message: () => 'Data de emissão inválida.',
};
