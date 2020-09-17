import React, { useEffect, useState } from "react";
import Auth from "@aws-amplify/auth";
import Storage from "@aws-amplify/storage";
import API, { graphqlOperation } from "@aws-amplify/api";
import { listProducts, getProduct } from "../graphql/queries";
import { createProduct } from "../graphql/mutations";
import { Link, useParams } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import config from "../aws-exports";

const {
  aws_user_files_s3_bucket_region: region,
  aws_user_files_s3_bucket: bucket,
} = config;

const ProductContext = React.createContext();

const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [didImgLoad, setDidImgLoad] = useState(false);
  const [product, setProduct] = useState();
  const [photos, setPhotos] = React.useState([]);

  useEffect(() => {
    fetch();
  }, []);

  useEffect(() => {
    console.log(products);
    setDidImgLoad(true);
  }, [products]);

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

  const getById = async (id) => {
    try {
      const { data } = await API.graphql(graphqlOperation(getProduct, { id }));
      console.log(data);
      const res = await data.getProduct.photos.map(async (i) => {
        console.log(i);
        const image = await Storage.get(i.key, { level: "public" });
        return (i.link = image);
      });
      await Promise.all(res);

      console.log(data);
      setProduct(data.getProduct);
    } catch (e) {
      console.log(new Error(e));
    }
  };

  const post = async (files, data) => {
    let photos = [];
    const promises = await files.map(async (file, index) => {
      const extension = file.name.split(".")[1];
      const name = file.name.split(".")[0];
      const key = `images/${uuidv4()}${name}.${extension}`;
      const url = `https://${bucket}.s3.${region}.amazonaws.com/public/${key}`;

      console.log(`%c ${file}`, "color: red; font-weight: bold");
      console.table(file);

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
      console.log("Executed?");
      console.log(
        `{Bucket: ${bucket}, Region: ${region}, Key: ${key}, Position: ${index} }`
      );

      let photosAux = [];

      photosAux = photos;
      photosAux.push({ bucket, region, key, position: index });

      setPhotos(photos);

      const image = await Storage.get(key, { level: "public" });
      console.log(photos);
      console.log(`%c ${image}`, "color: brown; font-weight: bold");
    });

    console.log(data);
    console.log(
      `%c ${photos}`,
      "font-weight: bold; color: red; font-size: 15px"
    );

    await Promise.all(promises);

    const res = await API.graphql(
      graphqlOperation(createProduct, {
        input: { ...data, photos },
      })
    );
    console.log(res);
  };

  return (
    <ProductContext.Provider
      value={{ products, loading, getById, product, post, didImgLoad }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export { ProductContext, ProductProvider };
