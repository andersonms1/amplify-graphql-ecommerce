import React, { createContext } from "react";

const CheckoutContext = createContext({
  // items: {},
  // products: [],
  // product: [],
  // loading: false,
  current: 1,
  // getById: (id) => {},
  // post: (files, data) => {},
  setCurrentStep: () => {},
});

export default CheckoutContext;
