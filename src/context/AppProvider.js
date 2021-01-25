import React, { useEffect, useState } from "react";
import Auth from "@aws-amplify/auth";
import Storage from "@aws-amplify/storage";
import API, { graphql, graphqlOperation } from "@aws-amplify/api";
import {
  listProducts,
  getProduct,
  productsByCategorySubCategory,
  productsByCategorySubCategoryBrand,
  productsByCategorySubCategoryCreatedAt,
} from "../graphql/queries";

import { createProduct } from "../graphql/mutations";
import { v4 as uuidv4 } from "uuid";
import config from "../aws-exports";

import AppContext from "./AppContext";
import { subCategorys } from "../utils/CATEGORYSUBCATEGORYS";

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
        Error(error);
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

  const stringToQuery = async (querie, values = null) => {
    switch (querie) {
      case "listProducts":
        try {
          const res = await API.graphql(graphqlOperation(listProducts));
          return res;
        } catch (e) {
          console.log(Error(e));
          return new Error(e);
        }
      case "productsByCategorySubCategory":
        try {
          const { category, subCategory } = values;
          const res = await API.graphql(
            graphqlOperation(productsByCategorySubCategory, {
              category,
              subCategory,
            })
          );

          return res;
        } catch (e) {
          console.log(Error(e));
          return new Error(e);
        }

      case "productsByCategorySubCategoryCreatedAt":
        try {
          const { category, subCategoryCreatedAt } = values;
          const res = await API.graphql(
            graphqlOperation(productsByCategorySubCategoryCreatedAt, {
              category,
              subCategoryCreatedAt,
            })
          );

          return res;
        } catch (e) {
          return new Error(e);
        }

      case "productsByCategorySubCategoryBrand":
        const res = await API.graphql(
          graphqlOperation(productsByCategorySubCategoryBrand, {
            category: "FEMININO",
            subCategoryBrand: { eq: { brand: "ZARA", subCategory: "CAMISA" } },
          })
        );
        return res;

      default:
        return new Error("Querie não encontrada.");
    }
  };

  const getProducts = async ({ props }) => {
    const { querie, values } = props;

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
        const _products = {};
        _products[`${querie}`] = items;
        return {
          ...prevState,
          products: { ..._products },
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
      const res = await data.getProduct.photos.map(async (i) => {
        const image = await Storage.get(i.key, { level: "public" });
        return (i.link = image);
      });
      await Promise.all(res);

      setAppContext((prevState) => {
        return {
          ...prevState,
          product: data.getProduct,
        };
      });
    } catch (e) {
      new Error(e);
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

      try {
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
        return res;
      } catch (e) {
        return new Error(e);
      }
    }
  };

  const appState = {
    items: {},
    products: { listProducts: [] }, //
    product: null, //was null
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
