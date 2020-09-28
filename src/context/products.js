import React, { useEffect, useState } from "react";
import Auth from "@aws-amplify/auth";
import Storage from "@aws-amplify/storage";
import API, { graphqlOperation } from "@aws-amplify/api";
import { listProducts, getProduct } from "../graphql/queries";
import config from "../aws-exports";

const ProductsContext = React.createContext();

const ProductsProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetch();
  }, []);

  useEffect(() => {
    async function getUser() {
      try {
        let user = await Auth.currentAuthenticatedUser();
        console.log(user);
      } catch (error) {
        console.log("error: ", error);
      }
    }
    getUser();
  }, []);

  const fetch = async () => {
    try {
      setLoading(true);
      const { data } = await API.graphql(graphqlOperation(listProducts));

      await Promise.all(
        await data.listProducts.items.map(async (i) => {
          // console.log(i);
          const image = await Storage.get(i.photos[0].key, {
            level: "public",
          });
          i.didImgLoad = false;
          return (i.link = image);
        })
      );
      // console.log(data.listProducts.items);
      setProducts(data.listProducts.items);
      setLoading(false);
    } catch (e) {
      console.log({ e });
      console.log(new Error(e));
    }
  };

  return (
    <ProductsContext.Provider value={{ products, loading }}>
      {children}
    </ProductsContext.Provider>
  );
};

export { ProductsContext, ProductsProvider };
