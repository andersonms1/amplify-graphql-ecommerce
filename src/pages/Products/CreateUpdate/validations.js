const Joi = require("joi");

const title = Joi.object({
  title: Joi.string().alphanum().min(3).max(52).required().messages({
    "string.base": `"Título" deve conter somente texto curto.'`,
    "string.empty": `"Título" não pode ficar vazio.`,
    "string.min": `"Título" Deve possuir ao menos {#limit} caracteres`,
    "string.max": `"Título" deve ter no máximo {#limit} caracteres`,
    "any.required": `"Titulo" É um campo obrigatório`,
  }),
});
const description = Joi.object({
  description: Joi.string().alphanum().min(5).max(1000).required().messages({
    "string.base": `"Descrição" deve conter detalhes do produto a ser cadastrado.'`,
    "string.empty": `"Descrição" não pode ficar vazio.`,
    "string.min": `"Descrição" Deve possuir ao menos {#limit} caracteres`,
    "string.max": `"Descrição" Deve ter no máximo {#limit} caracteres`,
    // "any.required": `É um campo obrigatório`,
  }),
});
const category = Joi.object({
  category: Joi.string().alphanum().min(3).max(46).required().messages({
    "string.base": `"Categoria"Deve conter detalhes do produto a ser cadastrado.'`,
    "string.empty": `"Categoria"Não pode ficar vazio.`,
    "string.min": `"Categoria" Deve possuir ao menos {#limit} caracteres`,
    "string.max": `"Categoria" Deve ter no máximo {#limit} caracteres`,
    // "any.required": `É um campo obrigatório`,
  }),
});
const amount = Joi.object({ amount: Joi.number().positive().required() });

const price = Joi.object({
  price: Joi.object().keys({
    specie: Joi.number().positive(),
    cents: Joi.number().positive().max(99),
  }),
});
/* Leave here, it's a good example of a arr joi obj*/
// const photos = Joi.object({
//   photos: Joi.array().items({
//     bucket: Joi.string().alphanum().required(),
//     region: Joi.string().alphanum().required(),
//     key: Joi.string().alphanum().required(),
//     position: Joi.string().alphanum().required(),
//   }),
// });

let schema = Joi.object();
schema = schema.concat(title);
schema = schema.concat(description);
schema = schema.concat(category);

// const schema = Joi.object({
//   title: Joi.string().alphanum().min(3).max(52).required().messages({
//     "string.base": `"Título" deve conter somente texto curto.'`,
//     "string.empty": `"Título" não pode ficar vazio.`,
//     "string.min": `Deve possuir ao menos {#limit} caracteres`,
//     "string.max": `"Título" deve ter no máximo {#limit} caracteres`,
//     "any.required": `É um campo obrigatório`,
//   }),
//   description: Joi.string().alphanum().min(5).max(1000).required().messages({
//     "string.base": `"Descrição" deve conter detalhes do produto a ser cadastrado.'`,
//     "string.empty": `"Descrição" não pode ficar vazio.`,
//     "string.min": `Deve possuir ao menos {#limit} caracteres`,
//     "string.max": `Deve ter no máximo {#limit} caracteres`,
//     // "any.required": `É um campo obrigatório`,
//   }),
//   category: Joi.string().alphanum().min(3).max(46).required().messages({
//     "string.base": `Deve conter detalhes do produto a ser cadastrado.'`,
//     "string.empty": `"Não pode ficar vazio.`,
//     "string.min": `Deve possuir ao menos {#limit} caracteres`,
//     "string.max": `Deve ter no máximo {#limit} caracteres`,
//     // "any.required": `É um campo obrigatório`,
//   }),
//   amount: Joi.number().positive().required(),
//   price: Joi.object().keys({
//     specie: Joi.number().positive(),
//     cents: Joi.number().positive().max(99),
//   }),
//   photos: Joi.array().items({
//     bucket: Joi.string().alphanum().required(),
//     region: Joi.string().alphanum().required(),
//     key: Joi.string().alphanum().required(),
//     position: Joi.string().alphanum().required(),
//   }),
// });

export { schema, title, description, category, amount, price };
