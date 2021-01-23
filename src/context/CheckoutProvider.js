import React, { useEffect, useState } from "react";

import API, { graphql, graphqlOperation } from "@aws-amplify/api";
import { listOrders, ordersByUserCreatedAt } from "../graphql/queries";

import { setObj, getObj } from "../utils/localStorage";
import _ from "lodash";

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

  const setCart = (cart) => {
    setAppContext((prevState) => {
      const newCart = getObj("cart");
      return {
        ...prevState,
        cart: newCart,
      };
    });
  };

  const removeCartItem = (index) => {
    setAppContext((prevState) => {
      if (prevState.cart.products.lenght === 1) {
        setObj("cart", null);
        setCart();
      } else {
        _.pullAt(prevState.cart.products, index); //Change state  by reference
        setObj("cart", prevState.cart);
      }
      return {
        ...prevState,
      };
    });
  };

  const addCartItem = (items) => {
    setAppContext((prevState) => {
      console.log(prevState.cart);

      if (prevState.cart) {
        const cart = {
          products: [...prevState.cart.products, items],
          ..._.omit(prevState.cart, "products"),
        };
        setObj("cart", cart);
        return {
          ...prevState,
          cart: cart,
        };
      } else {
        const cart = {
          products: [items],
          total: 0,
          address: {},
          status: "",
        };
        setObj("cart", cart);
        return {
          ...prevState,
          cart: cart,
        };
      }
    });
  };

  const addCartSelection = (index, selection) => {
    setAppContext((prevState) => {
      prevState.cart.products[index].selection = selection;
      console.log(prevState.cart.products[index]);
      setObj("cart", prevState.cart);
      return {
        ...prevState,
      };
    });
  };

  const getAddress = async () => {
    console.log("Anderson");
    const res = await API.graphql(graphqlOperation(listOrders));
    //Waiting until have more order, to correcly test data coparison
    // const res = await API.graphql(graphqlOperation(ordersByUserCreatedAt, {user: "", createAt: {lt: ""}}));
    // Set local storage address as well
    setAppContext((prevState) => {
      return {
        ...prevState,
        address: res.data.listOrders, //remind to chande atribute listOrders when updated
      };
    });
  };

  const setModalOpen = (modalOpen) => {
    setAppContext((prevState) => {
      return {
        ...prevState,
        modalOpen,
      };
    });
  };

  const appState = {
    current: 0,
    setCurrentStep,
    modalOpen: {},
    setModalOpen,
    cart: {},
    address: {},
    setCart,
    addCartItem,
    addCartSelection,
    removeCartItem,
    getAddress,
  };

  const [appContext, setAppContext] = useState(appState);
  return (
    <CheckoutContext.Provider value={appContext}>
      {children}
    </CheckoutContext.Provider>
  );
};

export default CheckoutProvider;
