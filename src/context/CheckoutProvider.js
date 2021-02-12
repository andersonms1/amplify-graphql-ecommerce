import React, { useEffect, useState } from "react";

import API, { graphql, graphqlOperation } from "@aws-amplify/api";
import { listOrders, ordersByUserCreatedAt } from "../graphql/queries";
import { createOrder } from "../graphql/mutations";

import { cart as tp_cart, currentCheckoutPage, status } from "./types";
import total from "./util/calculateCartTotal";
import getUser from "./util/getUsername";
import { setObj, getObj, setItem } from "../utils/localStorage";
import _ from "lodash";

import CheckoutContext from "./CheckoutContext";
import { ConsoleLogger } from "@aws-amplify/core";
import { types } from "joi";

const CheckoutProvider = ({ children }) => {
  const setCurrentStep = (goTo) => {
    setItem(currentCheckoutPage, goTo);
    setAppContext((prevState) => {
      return {
        ...prevState,
        current: goTo,
      };
    });
  };

  const setCart = () => {
    setAppContext((prevState) => {
      const newCart = getObj("cart");
      console.log(newCart);
      return {
        ...prevState,
        cart: newCart,
      };
    });
  };

  const removeCartItem = (index) => {
    setAppContext((prevState) => {
      if (prevState.cart.products.lenght === 1) {
        setObj(tp_cart, null);
        setCart();
      } else {
        _.pullAt(prevState.cart.products, index); //Change state  by reference
        prevState.cart.total = total(prevState.cart.products);
        setObj(tp_cart, prevState.cart);
      }
      return {
        ...prevState,
      };
    });
  };

  const addCartItem = (items) => {
    setAppContext((prevState) => {
      if (prevState.cart) {
        const cart = {
          products: [...prevState.cart.products, items],
          total: total([...prevState.cart.products, items]),
          ..._.omit(prevState.cart, ["products", "total"]),
        };
        setObj("cart", cart);
        return {
          ...prevState,
          cart: cart,
        };
      } else {
        const cart = {
          products: [items],
          total: total([items]),
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

  const updateCartItem = (index, selection) => {
    setAppContext((prevState) => {
      prevState.cart.products[index].selection = selection;
      prevState.cart.total = total(prevState.cart.products);

      setObj(tp_cart, prevState.cart);
      return {
        ...prevState,
      };
    });
  };

  const updateAddress = (address) => {
    setAppContext((prevState) => {
      prevState.cart.address = address;
      /* update price calc here */
      setObj(tp_cart, prevState.cart);

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

  const postOrder = async (cart) => {
    const { total: price, products: _products } = cart;

    const res = await getUser();
    console.log(res.username);

    console.log(price);
    console.log(_products);

    const products = _products.map((product, index) => {
      const {
        selection,
        id,
        createdAt,
        title,
        description,
        price,
        category,
        subCategory,
        sold,
        amount,
        brand,
        photos,
        avaliation,
        comments,
        updatedAt,
      } = product;

      return {
        product: {
          id,
          createdAt,
          title,
          description,
          price,
          category,
          subCategory,
          sold,
          amount,
          brand,
          photos,
          avaliation,
          comments,
          updatedAt,
        },
        amount: {
          size: selection.size,
          amount: selection.quantity,
        },
      };
    });
    console.log(products);

    try {
      res = await API.graphql(
        graphqlOperation(createOrder, {
          input: {
            price,
            user: res.username,
            status: status.wait_payment_confimation,
            products,
          },
        })
      );
      return res;
    } catch (e) {
      console.log(e);
      return e;
    }
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
    updateCartItem,
    removeCartItem,
    getAddress,
    updateAddress,
    postOrder,
  };

  const [appContext, setAppContext] = useState(appState);
  return (
    <CheckoutContext.Provider value={appContext}>
      {children}
    </CheckoutContext.Provider>
  );
};

export default CheckoutProvider;
