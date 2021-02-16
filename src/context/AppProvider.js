import React, { useEffect, useState } from "react";
import Auth from "@aws-amplify/auth";
import Storage from "@aws-amplify/storage";
import API, { graphql, graphqlOperation } from "@aws-amplify/api";
import { items as tp_items, currentProductPage } from "./types";
import {
  listProducts,
  getProduct,
  productsByCategorySubCategory,
  productsByCategorySubCategoryBrand,
  productsByCategorySubCategoryCreatedAt,
  productsByCategorySold,
  productsByCategorySubCategorySold,
  productsByCategorySubCategoryPrice,
  productsByCategoryCreatedAt,
  productsByCategoryPrice,
} from "../graphql/queries";

import { createProduct } from "../graphql/mutations";
import { v4 as uuidv4 } from "uuid";
import config from "../aws-exports";

import AppContext from "./AppContext";
import { subCategorys } from "../utils/CATEGORYSUBCATEGORYS";
import { setObj, setItem, removeAny } from "../utils/localStorage";

const {
  aws_user_files_s3_bucket_region: region,
  aws_user_files_s3_bucket: bucket,
} = config;

const AppProvider = ({ children }) => {
  useEffect(() => {
    // async function getUser() {
    //   try {
    //     const user = await Auth.currentAuthenticatedUser();
    //     console.log(user);
    //   } catch (error) {
    //     Error(error);
    //     console.log("error: ", error);
    //   }
    // }
    // getUser();
    // removeAny(currentProductPage);
  }, []);

  const updateItems = (items) => {
    setObj(tp_items, items);
    setAppContext((prevState) => {
      return {
        ...prevState,
        items,
      };
    });
  };

  const stringToQuery = async (querie, values = null) => {
    switch (querie) {
      // Home querie
      case "productsByCategorySold":
        try {
          const { category, sold, sortDirection, limit } = values;
          const res = await API.graphql(
            graphqlOperation(productsByCategorySold, {
              sortDirection,
              limit,
              category,
              sold,
            })
          );
          return res;
        } catch (e) {
          console.log(e);
          return Error(e);
        }

      case "productsByCategoryCreatedAt":
        try {
          const { category, createdAt, sortDirection, limit } = values;
          const res = await API.graphql(
            graphqlOperation(productsByCategoryCreatedAt, {
              sortDirection,
              limit,
              category,
              createdAt,
            })
          );
          return res;
        } catch (e) {
          console.log(e);
          return e;
        }

      case "productsByCategoryPrice":
        try {
          const { category, price, sortDirection, limit } = values;
          const res = await API.graphql(
            graphqlOperation(productsByCategoryPrice, {
              sortDirection,
              limit,
              category,
              price,
            })
          );
          return res;
        } catch (e) {
          console.log(e);
          return e;
        }
      case "productsByCategorySubCategorySold":
        try {
          alert("Silva Anderson");
          const { category, subCategorySold, sortDirection } = values;
          const res = await API.graphql(
            graphqlOperation(productsByCategorySubCategorySold, {
              sortDirection: "ASC",
              category: "FEMININO",
              // subCategory: "CALÇADOS",
              // sold: { ge: "5" },
              // subCategorySold: { ge: { subCategory: "CALÇADOS", sold: "1" } },
              subCategorySold: {
                le: { subCategory: "CALÇADOS", sold: "10" },
              },
              // subCategorySold: { ge: { sold: "100" } },
              // sold: { ge: 0 },
              // subCategorySold: { le: { subCategory: "CALÇADOS", sold: "0" } },
            })
          );

          return res;
        } catch (e) {
          console.log(e);
          return Error(e);
        }

      case "listProducts":
        try {
          const res = await API.graphql(
            graphqlOperation(listProducts, { limit: 2 })
          );
          console.log(res);
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
              limit: 2,
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

  const getProducts = async (args) => {
    const { querie, values } = args.querie;
    // alert("here");
    // console.log(querie);
    // console.log(values);
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

      items.map((i) => console.log(i.createdAt));

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
      setItem(currentProductPage, goTo);
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

  const uploadPhotos = async (files) => {
    let photos = [];
    if (files) {
      const promises = await files.map(async (file, index) => {
        const extension = file.name.split(".")[1];
        const name = file.name.split(".")[0];
        const key = `images/${uuidv4()}${name}.${extension}`;

        // console.log(`%c ${file}`, "color: red; font-weight: bold");
        // console.table(file);
        // console.log(name);
        // console.log(key);

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

      updateItems({ photos, files });

      return;
    }
  };

  const post = async (items) => {
    const {
      title,
      description,
      price,
      category,
      subCategory,
      photos,
      inventory: amount,
    } = items;

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
            amount,
            brand: "Default",
            avaliation: 5,
            photos,
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
    uploadPhotos,
  };

  const [appContext, setAppContext] = useState(appState);
  return (
    <AppContext.Provider value={appContext}>{children}</AppContext.Provider>
  );
};

export default AppProvider;

// ne: Int # "not equal to"
// eq: Int # "equal to"
// le: Int # "less than or equal to"
// lt: Int # "less than"
// ge: Int # "greater than or equal to"
// gt: Int # "greater than"
