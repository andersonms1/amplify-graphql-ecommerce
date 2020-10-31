import React, { createContext } from "react";

const AppContext = createContext({
  items: [],
  products: [],
  product: [],
  loading: false,
  current: 0,
  getById: (id) => {},
  post: (files, data) => {},
  setCurrentStep: () => {},
  setLoading: () => {},
  updateItems: () => {},
});

export default AppContext;
