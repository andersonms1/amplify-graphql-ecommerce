import React, { createContext } from "react";

const AppContext = createContext({
  items: {},
  products: [],
  product: [],
  loading: false,
  current: 0,
  page: 0,
  // didGetProductsLoad: false,
  getById: (id) => {},
  getProducts: () => {},
  setLoading: (isLoading) => {},
  post: (files, data) => {},
  setCurrentStep: () => {},
  setPage: () => {},
  setLoading: () => {},
  updateItems: () => {},
  uploadPhotos: () => {},
  postOrder: () => {},
  getProductsImgs: () => {},
});

export default AppContext;
