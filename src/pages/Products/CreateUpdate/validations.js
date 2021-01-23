const Joi = require("joi");

const title = Joi.object({
  title: Joi.string().min(3).max(52).required().messages({
    "string.base": `"Título" deve conter somente texto curto.'`,
    "string.empty": `"Título" não pode ficar vazio.`,
    "string.min": `"Título" Deve possuir ao menos {#limit} caracteres`,
    "string.max": `"Título" deve ter no máximo {#limit} caracteres`,
    "any.required": `"Titulo" É um campo obrigatório`,
  }),
});
const description = Joi.object({
  description: Joi.string().min(5).max(1000).required().messages({
    "string.base": `"Descrição" deve conter detalhes do produto a ser cadastrado.'`,
    "string.empty": `"Descrição" não pode ficar vazio.`,
    "string.min": `"Descrição" Deve possuir ao menos {#limit} caracteres`,
    "string.max": `"Descrição" Deve ter no máximo {#limit} caracteres`,
    // "any.required": `É um campo obrigatório`,
  }),
});

const quantity = Joi.object({ quantity: Joi.number().positive().required() });

/* Leave here, it's a good example of a arr joi obj*/
// const photos = Joi.object({
//   photos: Joi.array().items({
//     bucket: Joi.string().alphanum().required(),
//     region: Joi.string().alphanum().required(),
//     key: Joi.string().alphanum().required(),
//     position: Joi.string().alphanum().required(),
//   }),
// });

let formDescription = Joi.object();
formDescription = formDescription.concat(title);
formDescription = formDescription.concat(description);
// schema = schema.concat(category);

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
//   quantity: Joi.number().positive().required(),
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

//////////////////////////////// Price ////////////////////////////////////////
const category = Joi.object({
  category: Joi.string().min(3).max(52).required().messages({
    "string.empty": `"Categoria" não pode ficar vazio.`,
    "string.min": `"Categoria" Deve possuir ao menos {#limit} caracteres`,
    "string.max": `"Categoria" deve ter no máximo {#limit} caracteres`,
    "any.required": `"Categoria" É um campo obrigatório`,
  }),
});

const subCategory = Joi.object({
  subCategory: Joi.string().min(3).max(52).required().messages({
    "string.empty": `"Subcategoria" não pode ficar vazio.`,
    "string.min": `"Subcategoria" Deve possuir ao menos {#limit} caracteres`,
    "string.max": `"Subcategoria" deve ter no máximo {#limit} caracteres`,
    "any.required": `"Subcategoria" É um campo obrigatório`,
  }),
});

const price = Joi.object({
  price: Joi.number().required().messages({
    "string.base": `"Preço" sdfasdf.`,
    "string.empty": `"Preço" não pode ficar vazio.`,
    "any.required": `"Preço" É um campo obrigatório`,
  }),
});

let formPrice = Joi.object();
formPrice = formPrice.concat(category);
formPrice = formPrice.concat(subCategory);
formPrice = formPrice.concat(price);

export {
  formDescription,
  title,
  description,
  category,
  subCategory,
  price,
  quantity,
  formPrice,
};
