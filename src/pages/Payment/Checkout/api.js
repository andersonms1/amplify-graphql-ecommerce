const axios = require("axios");

export const getInfoFromCEP = async (cep) => {
  const exem = {
    cep: "01001-000",
    logradouro: "Praça da Sé",
    complemento: "lado ímpar",
    bairro: "Sé",
    localidade: "São Paulo",
    uf: "SP",
    ibge: "3550308",
    gia: "1004",
    ddd: "11",
    siafi: "7107",
  };

  // 72.420-290
  try {
    const response = await axios.get(`http://viacep.com.br/ws/${cep}/json/`);
    await Promise.resolve(response);

    return response;

    // const response = axios.request({
    //   url: "",
    //   method: "get",
    //   baseURL: `http://viacep.com.br/ws/${unmask}/json/`,
    //   headers: {
    //     "Content-Type": "application/json",
    //     "Access-Control-Allow-Origin": "*",
    //   },
    // });

    // console.log(response.data);
    // return response.data;
  } catch (error) {
    console.error(error);
  }
};
