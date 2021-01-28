import React, { createContext } from "react";

const CheckoutContext = createContext({
  current: 0,
  cart: {
    products: [],
    total: 0,
    status: "criado",
    address: {},
  },
  modalOpen: {},
  setModalOpen: () => {},
  address: {},
  setCart: () => {},
  addCartItem: () => {},
  setCurrentStep: () => {},
  removeCartItem: (index) => {},
  updateCartItem: (index, selection) => {},
  getAddress: () => {},
});

export default CheckoutContext;
