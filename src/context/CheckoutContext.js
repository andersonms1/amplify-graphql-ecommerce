import React, { createContext } from "react";

const CheckoutContext = createContext({
  // items: {},
  // products: [],
  // product: [],
  // loading: false,
  current: 0,
  cart: {
    products: [],
    total: 0,
    status: "criado",
    address: {},
  },
  modalOpen: false,
  setModalOpen: () => {},
  address: {},
  setCart: () => {},
  addCartItem: () => {},
  // getById: (id) => {},
  // post: (files, data) => {},
  setCurrentStep: () => {},
  removeCartItem: (index) => {},
  addCartSelection: (index, selection) => {},
  getAddress: () => {},
});

export default CheckoutContext;
