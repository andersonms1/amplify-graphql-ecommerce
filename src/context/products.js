import React, { useEffect, useState } from "react";
import Auth from "@aws-amplify/auth";
import Storage from "@aws-amplify/storage";
import API, { graphqlOperation } from "@aws-amplify/api";
import { listProducts } from "../graphql/queries";

const ProductContext = React.createContext();

const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetch();
  }, []);

  const fetch = async () => {
    try {
      setLoading(true);
      const { data } = await API.graphql(graphqlOperation(listProducts));
      console.log(data);
      setProducts(data.listProducts.items);
      setLoading(false);
    } catch (e) {
      console.log(new Error(e));
    }
  };
  return (
    <ProductContext.Provider value={{ products, loading }}>
      {children}
    </ProductContext.Provider>
  );
};

export { ProductContext, ProductProvider };
