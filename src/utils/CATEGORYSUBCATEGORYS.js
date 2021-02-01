const FEMININO = "FEMININO";
const MASCULINO = "MASCULINO";
const INFANTIL = "INFANTIL";

const ACESSORIOS = "ACESSÓRIOS";
const CALCADOS = "CALÇADOS";
const CAMISAS_CAMISETAS = "CAMISAS E CAMISETAS";
const CALCAS = "CALÇAS";
const SHORT_BEMUDAS = "SHORT E BEMUDAS";
const PRAIA = "PRAIA";
const ACADEMIA = "ACADEMIA";

const subCategorys = {
  ACADEMIA,
  ACESSORIOS,
  CALCADOS,
  CAMISAS_CAMISETAS,
  CALCAS,
  PRAIA,
  SHORT_BEMUDAS,
};

const CATEGORYS = [
  { id: 1, label: FEMININO },
  { id: 2, label: MASCULINO },
  { id: 3, label: INFANTIL },
];

const SUBCATEGORYS = [
  { id: 1, categorys: [FEMININO, MASCULINO, INFANTIL], label: ACESSORIOS },
  { id: 6, categorys: [FEMININO, MASCULINO], label: ACADEMIA },
  { id: 2, categorys: [FEMININO, MASCULINO, INFANTIL], label: CALCADOS },
  {
    id: 3,
    categorys: [FEMININO, MASCULINO, INFANTIL],
    label: CAMISAS_CAMISETAS,
  },
  { id: 4, categorys: [FEMININO, MASCULINO, INFANTIL], label: CALCAS },
  { id: 7, categorys: [FEMININO, MASCULINO, INFANTIL], label: PRAIA },
  { id: 5, categorys: [FEMININO, MASCULINO, INFANTIL], label: SHORT_BEMUDAS },
];

// const SUBCATEGORYS = [
//   { id: 1, label: "ACESSÓRIOS", categorys: [FEMININO, MASCULINO, INFANTIL] },
//   // { id: 4, label: "CAMISA", categorys: [FEMININO, MASCULINO, INFANTIL] },
//   { id: 5, label: "CAMISETA", categorys: [FEMININO, MASCULINO, INFANTIL] },
//   { id: 6, label: "JAQUETA", categorys: [FEMININO, MASCULINO, INFANTIL] },
//   { id: 7, label: "TERNO", categorys: [FEMININO, MASCULINO, INFANTIL] },
//   { id: 8, label: "SHORT", categorys: [FEMININO, MASCULINO, INFANTIL] },
//   // { id: 9, label: "BERMUDA", categorys: [FEMININO, MASCULINO, INFANTIL] },
//   { id: 10, label: "CALÇA", categorys: [FEMININO, MASCULINO, INFANTIL] },
//   // { id: 11, label: "CUECA", categorys: [MASCULINO, INFANTIL] },
//   { id: 12, label: "CALCINHA", categorys: [FEMININO, INFANTIL] },
//   { id: 13, label: "SUTIÃ", categorys: [FEMININO] },
//   { id: 14, label: "BODY", categorys: [FEMININO, INFANTIL] },
//   { id: 15, label: "LOUNGERIE", categorys: [FEMININO] },
//   { id: 16, label: "MEIA", categorys: [FEMININO, MASCULINO, INFANTIL] },
//   { id: 17, label: "SAPATO", categorys: [FEMININO, MASCULINO, INFANTIL] },
//   { id: 18, label: "TÊNIS", categorys: [FEMININO, MASCULINO, INFANTIL] },
//   { id: 19, label: "SANDALHAS", categorys: [FEMININO, MASCULINO, INFANTIL] },
// ];

export { CATEGORYS, SUBCATEGORYS, FEMININO, MASCULINO, INFANTIL, subCategorys };
