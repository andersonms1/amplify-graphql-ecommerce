const Joi = require("joi");

const deliverTo = Joi.object({
  deliverTo: Joi.string().min(3).max(52).required().messages({
    "string.base": `"Entregar para" deve conter somente texto curto.'`,
    "string.empty": `"Entregar para" não pode ficar vazio.`,
    "string.min": `"Entregar para" Deve possuir ao menos {#limit} caracteres`,
    "string.max": `"Entregar para" deve ter no máximo {#limit} caracteres`,
    "any.required": `"Entregar para" É um campo obrigatório`,
  }),
});

const state = Joi.object({
  state: Joi.string().min(2).max(2).required().messages({
    "string.base": `"UF" deve conter somente texto curto.'`,
    "string.empty": `"UF" não pode ficar vazio.`,
    "string.min": `"UF" Deve possuir ao menos {#limit} caracteres`,
    "string.max": `"UF" deve ter no máximo {#limit} caracteres`,
    "any.required": `"UF" É um campo obrigatório`,
  }),
});

const city = Joi.object({
  city: Joi.string().min(3).max(52).required().messages({
    "string.base": `"Cidade" deve conter somente texto curto.'`,
    "string.empty": `"Cidade" não pode ficar vazio.`,
    "string.min": `"Cidade" Deve possuir ao menos {#limit} caracteres`,
    "string.max": `"Cidade" deve ter no máximo {#limit} caracteres`,
    "any.required": `"Cidade" É um campo obrigatório`,
  }),
});

const neighborhood = Joi.object({
  neighborhood: Joi.string().min(2).max(52).required().messages({
    "string.base": `"Bairro" deve conter somente texto curto.'`,
    "string.empty": `"Bairro" não pode ficar vazio.`,
    "string.min": `"Bairro" Deve possuir ao menos {#limit} caracteres`,
    "string.max": `"Bairro" deve ter no máximo {#limit} caracteres`,
    "any.required": `"Bairro" É um campo obrigatório`,
  }),
});

const street = Joi.object({
  street: Joi.string().min(3).max(52).required().messages({
    "string.base": `"Rua" deve conter somente texto curto.'`,
    "string.empty": `"Rua" não pode ficar vazio.`,
    "string.min": `"Rua" Deve possuir ao menos {#limit} caracteres`,
    "string.max": `"Rua" deve ter no máximo {#limit} caracteres`,
    "any.required": `"Rua" É um campo obrigatório`,
  }),
});

const number = Joi.object({
  number: Joi.number().required().messages({
    "any.required": `"Número" É um campo obrigatório`,
    "number.number": "É necessário digitar um número",
    "number.positive": `"Número" maior igual a zero`,
  }),
});

const complematitionInfo = Joi.object({
  street: Joi.string().min(3).max(52).messages({
    "string.base": `"Rua" deve conter somente texto curto.'`,
    "string.empty": `"Rua" não pode ficar vazio.`,
    "string.min": `"Rua" Deve possuir ao menos {#limit} caracteres`,
    "string.max": `"Rua" deve ter no máximo {#limit} caracteres`,
    "any.required": `"Rua" É um campo obrigatório`,
  }),
});
let formAddress = Joi.object();
formAddress = formAddress.concat(deliverTo);
formAddress = formAddress.concat(state);
formAddress = formAddress.concat(city);
formAddress = formAddress.concat(neighborhood);
formAddress = formAddress.concat(street);
formAddress = formAddress.concat(number);
formAddress = formAddress.concat(complematitionInfo);

export {
  deliverTo,
  state,
  city,
  neighborhood,
  street,
  number,
  complematitionInfo,
  formAddress,
};
