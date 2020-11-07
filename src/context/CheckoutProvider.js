import React, { useEffect, useState } from "react";

import CheckoutContext from "./CheckoutContext";

const CheckoutProvider = ({ children }) => {
  const setCurrentStep = (goTo) => {
    setAppContext((prevState) => {
      return {
        ...prevState,
        current: goTo,
      };
    });
  };
  const appState = {
    current: 1,
    setCurrentStep,
    cart: [
      {
        id: 0,
        price: 100.0,
        title: "Some Title",
        description: "Some description",
        amount: 1,
      },
      {
        id: 1,
        price: 100.0,
        title: "Some Title",
        description: "Some description",
        amount: 2,
      },
      {
        id: 3,
        price: 100.0,
        title: "Some Title",
        description: "Some description",
        amount: 1,
      },
    ],
  };

  const [appContext, setAppContext] = useState(appState);
  return (
    <CheckoutContext.Provider value={appContext}>
      {children}
    </CheckoutContext.Provider>
  );
};

export default CheckoutProvider;
