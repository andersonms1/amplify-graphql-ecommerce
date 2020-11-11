import React, { useEffect, useState } from "react";
import Auth from "@aws-amplify/auth";
import Storage from "@aws-amplify/storage";
import API, { graphql, graphqlOperation } from "@aws-amplify/api";
import {
  listProducts,
  getProduct,
  productsByCategorySubCategory,
} from "../graphql/queries";

import { createProduct } from "../graphql/mutations";
import { v4 as uuidv4 } from "uuid";
import config from "../aws-exports";

import AppContext from "./AppContext";

const {
  aws_user_files_s3_bucket_region: region,
  aws_user_files_s3_bucket: bucket,
} = config;

const AppProvider = ({ children }) => {
  useEffect(() => {
    async function getUser() {
      try {
        const user = await Auth.currentAuthenticatedUser();
        console.log(user);
      } catch (error) {
        console.log("error: ", error);
      }
    }
    getUser();
  }, []);

  const updateItems = (items) => {
    setAppContext((prevState) => {
      return {
        ...prevState,
        items,
      };
    });
  };

  const setLoading = (status) => {
    setAppContext((prevState) => {
      return {
        ...prevState,
        loading: status,
      };
    });
  };

  const stringToQuery = async (querie, values) => {
    switch (querie) {
      case "listProducts":
        return await API.graphql(graphqlOperation(listProducts));
        break;
      case "productsByCategorySubCategory":
        console.log("object");
        // return await API.graphql(graphqlOperation(listProducts));
        return await API.graphql(
          graphqlOperation(productsByCategorySubCategory),
          {
            category: values.category,
            subCategory: values.subCategory,
          }
        );

      //   try {
      //   return await API.graphql(graphqlOperation(listProducts));
      // } catch (e) {
      //   new Error(e);
      // }

      default:
        return new Error("Querie não encontrada.");
    }
  };

  const getProducts = async ({ props }) => {
    const { querie, values } = props;
    console.log(querie);
    console.log(values);
    try {
      const { data } = await stringToQuery(querie, values);
      const { items } = data[`${querie}`];
      await Promise.all(
        await items.map(async (i) => {
          const image = await Storage.get(i.photos[0].key, {
            level: "public",
          });
          i.didImgLoad = false;
          return (i.link = image);
        })
      );
      console.log(items);

      setAppContext((prevState) => {
        return {
          ...prevState,
          products: items,
        };
      });
    } catch (e) {
      new Error(e);
    }
  };

  const setCurrentStep = (goTo) => {
    setAppContext((prevState) => {
      return {
        ...prevState,
        current: goTo,
      };
    });
  };
  const setPage = (goTo) => {
    setAppContext((prevState) => {
      return {
        ...prevState,
        page: goTo,
      };
    });
  };

  const getById = async (id) => {
    try {
      const { data } = await API.graphql(graphqlOperation(getProduct, { id }));
      // console.log(data);
      const res = await data.getProduct.photos.map(async (i) => {
        // console.log(i);
        const image = await Storage.get(i.key, { level: "public" });
        return (i.link = image);
      });
      await Promise.all(res);

      // console.log(data);
      setAppContext((prevState) => {
        return {
          ...prevState,
          product: data.getProduct,
        };
      });
    } catch (e) {
      console.log(new Error(e));
    }
  };

  const post = async (items) => {
    const { files } = items;
    let photos = [];
    if (files) {
      const promises = await files.map(async (file, index) => {
        const extension = file.name.split(".")[1];
        const name = file.name.split(".")[0];
        const key = `images/${uuidv4()}${name}.${extension}`;

        console.log(`%c ${file}`, "color: red; font-weight: bold");
        console.table(file);
        console.log(name);
        console.log(key);

        await Storage.put(
          key,
          file,
          { level: "public", contentType: file.type },
          {
            progressCallback(progress) {
              console.log(`Uploaded: ${progress.loaded}/${progress.total}`);
            },
          }
        );

        photos.push({ bucket, region, key, position: index });
      });

      await Promise.all(promises);

      const { title, description, price, category, subCategory } = items;

      const res = await API.graphql(
        graphqlOperation(createProduct, {
          input: {
            title,
            description,
            price,
            category,
            subCategory,
            sold: 0,
            amount: items.inventory,
            brand: "",
            avaliation: 5,
            photos,
          },
        })
      );
      console.log(res);
    }
  };

  const appState = {
    items: {},
    products: [], //
    product: null,
    loading: false,
    current: 0,
    page: 0,
    updateItems,
    getById,
    getProducts, //
    post,
    setCurrentStep,
    setPage,
  };

  const [appContext, setAppContext] = useState(appState);
  return (
    <AppContext.Provider value={appContext}>{children}</AppContext.Provider>
  );
};

export default AppProvider;
