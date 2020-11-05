import React, { useEffect, useState } from "react";
import Auth from "@aws-amplify/auth";
import Storage from "@aws-amplify/storage";
import API, { graphqlOperation } from "@aws-amplify/api";
import { listProducts, getProduct } from "../graphql/queries";

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
    fetch();
  }, []);

  const updateItems = (items) => {
    setAppContext((prevState) => {
      return {
        ...prevState,
        items,
      };
    });
  };

  // useEffect(() => {
  //   async function getUser() {
  //     try {
  //       const user = await Auth.currentAuthenticatedUser();
  //       console.log(user);
  //     } catch (error) {
  //       console.log("error: ", error);
  //     }
  //   }
  //   getUser();
  // }, []);

  const setLoading = (status) => {
    setAppContext((prevState) => {
      return {
        ...prevState,
        loading: status,
      };
    });
  };

  const fetch = async () => {
    try {
      setLoading(true);
      const { data } = await API.graphql(graphqlOperation(listProducts));

      // await Promise.all(
      //   await data.listProducts.items.map(async (i) => {

      //     const image = await Storage.get(i.photos[0].key, {
      //       level: "public",
      //     });
      //     i.didImgLoad = false;
      //     return (i.link = image);
      //   })
      // );

      setAppContext((prevState) => {
        return {
          ...prevState,
          products: data.listProducts.items,
          loading: false,
        };
      });
    } catch (e) {
      console.log({ e });
      console.log(new Error(e));
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

  const post = () => {
    return null;
  };
  // const post = async (files, data) => {
  //   console.log(files);
  //   console.log(data);
  //   let photos = [];

  //   const promises = await files.map(async (file, index) => {
  //     const extension = file.name.split(".")[1];
  //     const name = file.name.split(".")[0];
  //     const key = `images/${uuidv4()}${name}.${extension}`;

  //     console.log(`%c ${file}`, "color: red; font-weight: bold");
  //     console.table(file);

  //     await Storage.put(
  //       key,
  //       file,
  //       { level: "public", contentType: file.type },
  //       {
  //         progressCallback(progress) {
  //           console.log(`Uploaded: ${progress.loaded}/${progress.total}`);
  //         },
  //       }
  //     );
  //     console.log("Executed?");
  //     console.log(
  //       `{Bucket: ${bucket}, Region: ${region}, Key: ${key}, Position: ${index} }`
  //     );

  //     let photosAux = [];

  //     photosAux = photos;
  //     photosAux.push({ bucket, region, key, position: index });

  //     setPhotos(photos);

  //     const image = await Storage.get(key, { level: "public" });
  //     console.log(photos);
  //     console.log(`%c ${image}`, "color: brown; font-weight: bold");
  //   });

  //   console.log(data);
  //   console.log(
  //     `%c ${photos}`,
  //     "font-weight: bold; color: red; font-size: 15px"
  //   );

  //   await Promise.all(promises);

  //   const res = await API.graphql(
  //     graphqlOperation(createProduct, {
  //       input: { ...data, photos },
  //     })
  //   );
  //   console.log(res);
  // };

  const appState = {
    items: {},
    products: [],
    product: null,
    loading: false,
    current: 2,
    updateItems,
    getById,
    post,
    setCurrentStep,
  };

  const [appContext, setAppContext] = useState(appState);
  return (
    <AppContext.Provider value={appContext}>{children}</AppContext.Provider>
  );
};

export default AppProvider;
