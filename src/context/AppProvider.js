import React, { useEffect, useState } from "react";
import Auth from "@aws-amplify/auth";
import Storage from "@aws-amplify/storage";
import API, { graphql, graphqlOperation } from "@aws-amplify/api";
import {
  listProducts,
  getProduct,
  productsByCategorySubCategory,
  productsByCategorySubCategoryBrand,
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

  const setProduct = () => {
    setAppContext((prevState) => {
      return {
        ...prevState,
        product: {
          id: "f7ae06b9-1557-4225-8de4-fc87191801b7",
          createdAt: "2020-11-11T21:48:06.359Z",
          title: "Titulo",
          description: "Descricao",
          price: 100.09,
          category: "FEMININO",
          subCategory: "CAMISA",
          sold: 0,
          amount: [{ size: "G", amount: 500 }],
          brand: "ZARA",
          photos: [
            {
              bucket: "ecommerce-images-product115813-products",
              region: "us-east-1",
              key:
                "images/f0800d87-c841-442c-a96b-d85a5b227aa6retroliquor120374347.jpg",
              position: "0",
              link:
                "https://ecommerce-images-product115813-products.s3.amazonaws.com/public/images/f0800d87-c841-442c-a96b-d85a5b227aa6retroliquor120374347.jpg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIA4WLJ6QFFNUDQAUMI%2F20201123%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20201123T032142Z&X-Amz-Expires=900&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDwaCXVzLWVhc3QtMSJHMEUCICqvYbkNF1tKAcYDEupWwMRSu%2BwCxqzFc3iskmZfQp3oAiEA40UezGgk1RyGtpQlLIMfba%2BpMAAHyQ%2FH1p1FEkNzYlAqzQQItP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARABGgw4NzI2Mzc0MzIxMzgiDO3T9cItA6Gz3X15HyqhBOW4cCqrV4UFahPwqR%2BeAxaFBeQF6CFpRagrIu2LuYpdy8JVPrXOROBweXYSBTeRsYFVwfQccn6L61lCHdSLyd2m1k0ImmfUEPNcfRoCR5k4G4H%2B5sdaD%2FqmU7llGRtWVwuzkX1Z%2F5U5o4rjrK8ctS1CBIgSQWv0Mdusnos88yiNkyoykN%2BGrdEw0dTky8LpnU3wOjvJqPqiyJWF6BgHsI%2F07yNcl7iqXNOmhJPe9oH3VR%2BMK9r%2FcZMdEtDP6QnErr8KQKWn6BgxABiRpHdqzoLLmKiAju4NmXDDZHwax4UWAvlKtoWCsZw0mmf%2F6BqPkCa%2BGBZ70m2VBQS03TtS9MEkE5d0NOkknUjKeyHLHxJCzxEfEkDb%2FXY8J7mwLeYpXGDTGRZZjxE5oreKlhK3Jx%2BKO2JWtilfeTYbk3Xn4ODALhfRbR1CBBj2gYazkuhK%2F8PuOCJj%2B0gaokpbnDlauHqQp4D%2FPSfpGzfXrkIKPMxCWEsfSPw2pqNRlP2qSo8JRxIpALwam0vPwsW4gdk6OL2QyQT4ZRG5u6KraGHNcrzfn34O7xyOtsbqbeO7O7DxUxJPPMMPQnp8Z0AGpsZydg9RksczN9YmocyDAagASk62osPi0mCbtTL6o%2F7gTtD7%2FNUQlCWFUlU0JjdW4g63JpSGaVo7ybNko0UYFKV68%2Fg6xxw7eVM4SkE%2BryL1ifRrtLE5blrvZTqOv2FSBWZ83thUMMfV7P0FOoUCVpPkkHGPApocblCnsmPmaUWU8fen9WlKFGJDz2YpKFm1HLA%2B%2Fnq7HDYKG%2BABZmqiT7e5FcRi%2Bd03efZ0E6MUxYkbbVq8GHXPIZf2IzKlw9N9Qfkl7xgLErc1PNWrytVC83wG7eIsX5IALVEynlemD8RRhLvpVXai7GM75lYZmWM4vFFd9coh0xImyLJF%2F9sHaWPRfZPRgffNg%2BAFF%2FvoFS1VUI9gTekotN%2B%2B8VHsTWeMVGYSWKvhwyNAFsC8ZJfFPrKewj8X98zE12REPq8pgtx7j48L1upCJdoXFL3gPF0R5IevTWNr%2FcOUFwc25BTomYF5YF2RqF88njZ3zcscrutsZlYZ&X-Amz-Signature=2fe8b90e950b42b7cb77816a92ac4ff4bda64c8cb27985ecf38da280d1d142d9&X-Amz-SignedHeaders=host&x-amz-user-agent=aws-sdk-js-v3-%40aws-sdk%2Fclient-s3%2F1.0.0-gamma.4%20Mozilla%2F5.0%20%28Linux%3B%20Android%206.0%3B%20Nexus%205%20Build%2FMRA58N%29%20AppleWebKit%2F537.36%20%28KHTML%2C%20like%20Gecko%29%20Chrome%2F86.0.4240.198%20Mobile%20Safari%2F537.36%20aws-amplify%2F3.4.5%20js&x-id=GetObject",
            },
            {
              bucket: "ecommerce-images-product115813-products",
              region: "us-east-1",
              key:
                "images/845fb0fa-2c1b-4e2d-aeca-698f626536d6retroliquor 120492192.jpg",
              position: "2",
              link:
                "https://ecommerce-images-product115813-products.s3.amazonaws.com/public/images/845fb0fa-2c1b-4e2d-aeca-698f626536d6retroliquor%20120492192.jpg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIA4WLJ6QFFNUDQAUMI%2F20201123%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20201123T032142Z&X-Amz-Expires=900&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDwaCXVzLWVhc3QtMSJHMEUCICqvYbkNF1tKAcYDEupWwMRSu%2BwCxqzFc3iskmZfQp3oAiEA40UezGgk1RyGtpQlLIMfba%2BpMAAHyQ%2FH1p1FEkNzYlAqzQQItP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARABGgw4NzI2Mzc0MzIxMzgiDO3T9cItA6Gz3X15HyqhBOW4cCqrV4UFahPwqR%2BeAxaFBeQF6CFpRagrIu2LuYpdy8JVPrXOROBweXYSBTeRsYFVwfQccn6L61lCHdSLyd2m1k0ImmfUEPNcfRoCR5k4G4H%2B5sdaD%2FqmU7llGRtWVwuzkX1Z%2F5U5o4rjrK8ctS1CBIgSQWv0Mdusnos88yiNkyoykN%2BGrdEw0dTky8LpnU3wOjvJqPqiyJWF6BgHsI%2F07yNcl7iqXNOmhJPe9oH3VR%2BMK9r%2FcZMdEtDP6QnErr8KQKWn6BgxABiRpHdqzoLLmKiAju4NmXDDZHwax4UWAvlKtoWCsZw0mmf%2F6BqPkCa%2BGBZ70m2VBQS03TtS9MEkE5d0NOkknUjKeyHLHxJCzxEfEkDb%2FXY8J7mwLeYpXGDTGRZZjxE5oreKlhK3Jx%2BKO2JWtilfeTYbk3Xn4ODALhfRbR1CBBj2gYazkuhK%2F8PuOCJj%2B0gaokpbnDlauHqQp4D%2FPSfpGzfXrkIKPMxCWEsfSPw2pqNRlP2qSo8JRxIpALwam0vPwsW4gdk6OL2QyQT4ZRG5u6KraGHNcrzfn34O7xyOtsbqbeO7O7DxUxJPPMMPQnp8Z0AGpsZydg9RksczN9YmocyDAagASk62osPi0mCbtTL6o%2F7gTtD7%2FNUQlCWFUlU0JjdW4g63JpSGaVo7ybNko0UYFKV68%2Fg6xxw7eVM4SkE%2BryL1ifRrtLE5blrvZTqOv2FSBWZ83thUMMfV7P0FOoUCVpPkkHGPApocblCnsmPmaUWU8fen9WlKFGJDz2YpKFm1HLA%2B%2Fnq7HDYKG%2BABZmqiT7e5FcRi%2Bd03efZ0E6MUxYkbbVq8GHXPIZf2IzKlw9N9Qfkl7xgLErc1PNWrytVC83wG7eIsX5IALVEynlemD8RRhLvpVXai7GM75lYZmWM4vFFd9coh0xImyLJF%2F9sHaWPRfZPRgffNg%2BAFF%2FvoFS1VUI9gTekotN%2B%2B8VHsTWeMVGYSWKvhwyNAFsC8ZJfFPrKewj8X98zE12REPq8pgtx7j48L1upCJdoXFL3gPF0R5IevTWNr%2FcOUFwc25BTomYF5YF2RqF88njZ3zcscrutsZlYZ&X-Amz-Signature=4daa6b024d755fa3006411f6572f9e22fe26b0045723e8f55e6d35c3f31ac612&X-Amz-SignedHeaders=host&x-amz-user-agent=aws-sdk-js-v3-%40aws-sdk%2Fclient-s3%2F1.0.0-gamma.4%20Mozilla%2F5.0%20%28Linux%3B%20Android%206.0%3B%20Nexus%205%20Build%2FMRA58N%29%20AppleWebKit%2F537.36%20%28KHTML%2C%20like%20Gecko%29%20Chrome%2F86.0.4240.198%20Mobile%20Safari%2F537.36%20aws-amplify%2F3.4.5%20js&x-id=GetObject",
            },
            {
              bucket: "ecommerce-images-product115813-products",
              region: "us-east-1",
              key:
                "images/09bf57cf-3b5b-447d-9942-7826b6ae9b22retroliquor 120457647.jpg",
              position: "1",
              link:
                "https://ecommerce-images-product115813-products.s3.amazonaws.com/public/images/09bf57cf-3b5b-447d-9942-7826b6ae9b22retroliquor%20120457647.jpg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIA4WLJ6QFFNUDQAUMI%2F20201123%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20201123T032142Z&X-Amz-Expires=900&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDwaCXVzLWVhc3QtMSJHMEUCICqvYbkNF1tKAcYDEupWwMRSu%2BwCxqzFc3iskmZfQp3oAiEA40UezGgk1RyGtpQlLIMfba%2BpMAAHyQ%2FH1p1FEkNzYlAqzQQItP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARABGgw4NzI2Mzc0MzIxMzgiDO3T9cItA6Gz3X15HyqhBOW4cCqrV4UFahPwqR%2BeAxaFBeQF6CFpRagrIu2LuYpdy8JVPrXOROBweXYSBTeRsYFVwfQccn6L61lCHdSLyd2m1k0ImmfUEPNcfRoCR5k4G4H%2B5sdaD%2FqmU7llGRtWVwuzkX1Z%2F5U5o4rjrK8ctS1CBIgSQWv0Mdusnos88yiNkyoykN%2BGrdEw0dTky8LpnU3wOjvJqPqiyJWF6BgHsI%2F07yNcl7iqXNOmhJPe9oH3VR%2BMK9r%2FcZMdEtDP6QnErr8KQKWn6BgxABiRpHdqzoLLmKiAju4NmXDDZHwax4UWAvlKtoWCsZw0mmf%2F6BqPkCa%2BGBZ70m2VBQS03TtS9MEkE5d0NOkknUjKeyHLHxJCzxEfEkDb%2FXY8J7mwLeYpXGDTGRZZjxE5oreKlhK3Jx%2BKO2JWtilfeTYbk3Xn4ODALhfRbR1CBBj2gYazkuhK%2F8PuOCJj%2B0gaokpbnDlauHqQp4D%2FPSfpGzfXrkIKPMxCWEsfSPw2pqNRlP2qSo8JRxIpALwam0vPwsW4gdk6OL2QyQT4ZRG5u6KraGHNcrzfn34O7xyOtsbqbeO7O7DxUxJPPMMPQnp8Z0AGpsZydg9RksczN9YmocyDAagASk62osPi0mCbtTL6o%2F7gTtD7%2FNUQlCWFUlU0JjdW4g63JpSGaVo7ybNko0UYFKV68%2Fg6xxw7eVM4SkE%2BryL1ifRrtLE5blrvZTqOv2FSBWZ83thUMMfV7P0FOoUCVpPkkHGPApocblCnsmPmaUWU8fen9WlKFGJDz2YpKFm1HLA%2B%2Fnq7HDYKG%2BABZmqiT7e5FcRi%2Bd03efZ0E6MUxYkbbVq8GHXPIZf2IzKlw9N9Qfkl7xgLErc1PNWrytVC83wG7eIsX5IALVEynlemD8RRhLvpVXai7GM75lYZmWM4vFFd9coh0xImyLJF%2F9sHaWPRfZPRgffNg%2BAFF%2FvoFS1VUI9gTekotN%2B%2B8VHsTWeMVGYSWKvhwyNAFsC8ZJfFPrKewj8X98zE12REPq8pgtx7j48L1upCJdoXFL3gPF0R5IevTWNr%2FcOUFwc25BTomYF5YF2RqF88njZ3zcscrutsZlYZ&X-Amz-Signature=4201aae00bd2f808719217184be9cf89a0e56feff67654cd8d0f44aab1d58437&X-Amz-SignedHeaders=host&x-amz-user-agent=aws-sdk-js-v3-%40aws-sdk%2Fclient-s3%2F1.0.0-gamma.4%20Mozilla%2F5.0%20%28Linux%3B%20Android%206.0%3B%20Nexus%205%20Build%2FMRA58N%29%20AppleWebKit%2F537.36%20%28KHTML%2C%20like%20Gecko%29%20Chrome%2F86.0.4240.198%20Mobile%20Safari%2F537.36%20aws-amplify%2F3.4.5%20js&x-id=GetObject",
            },
          ],
          avaliation: 5,
          comments: { items: [], nextToken: null },
          updatedAt: "2020-11-11T21:48:06.359Z",
        },
      };
    });
  };

  const stringToQuery = async (querie, values) => {
    switch (querie) {
      case "listProducts":
        return await API.graphql(graphqlOperation(listProducts));
      case "productsByCategorySubCategory":
        try {
          const res = await API.graphql(
            graphqlOperation(productsByCategorySubCategory, {
              category: "FEMININO",
              subCategory: { eq: "CAMISA" },
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
      // console.log(data);
      const res = await data.getProduct.photos.map(async (i) => {
        // console.log(i);
        const image = await Storage.get(i.key, { level: "public" });
        return (i.link = image);
      });
      await Promise.all(res);

      // console.log(data);
      // console.log(JSON.stringify(data.getProduct));

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
            brand: "ZARA",
          },
        })
      );
      console.log(res);
    }
  };

  const _product = {
    id: "f7ae06b9-1557-4225-8de4-fc87191801b7",
    createdAt: "2020-11-11T21:48:06.359Z",
    title: "Camisa feminina retro mara",
    description: "Descricao",
    price: 100.09,
    category: "FEMININO",
    subCategory: "CAMISA",
    sold: 0,
    amount: [
      { size: "G", amount: 500 },
      { size: "P", amount: 0 },
    ],
    brand: "ZARA",
    photos: [
      {
        bucket: "ecommerce-images-product115813-products",
        region: "us-east-1",
        key:
          "images/f0800d87-c841-442c-a96b-d85a5b227aa6retroliquor120374347.jpg",
        position: "0",
        link:
          "https://ecommerce-images-product115813-products.s3.amazonaws.com/public/images/f0800d87-c841-442c-a96b-d85a5b227aa6retroliquor120374347.jpg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIA4WLJ6QFFPORDFSWU%2F20201124%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20201124T124327Z&X-Amz-Expires=900&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEF0aCXVzLWVhc3QtMSJGMEQCIE6cIXaubO3R63iEJt6AxekdtQ7%2FzX0c0veoqVm8uiU1AiAV%2F6PCrRUl3uLQt%2FgpYoNCWY68kfv4NDAZz%2FYflv%2FS2yrNBAjW%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAEaDDg3MjYzNzQzMjEzOCIMWkFTtmCqSe4iIb3AKqEEfNBJnCPF8p%2BmEFSmAZuaVDXqywoblan1nVypVIJqMnV8wjtpyUnlaoghVE%2F3%2BLKSBTLvfrn%2FXXRBxz0DBjn5z08iYYIezkgIDim4tj06EYkyvRYR1KqEwgUT1%2FSJkMhG2lxUk3TnDoXdG4r79MN0FgvnowJXeRmuas9MmPjCj5fIPlz7l5BXQin%2BKnS8%2BGEZRc04VI66gbFs5p7ZjuGDcDtYKAqmCOz2CeLvW4m39APsJh5tNe4JNkBysLVjz5PCVbJlFBlWtmbeHALXOhB%2FNfjO8K4IOyhixYpw0xhvYFsatp3GSwa%2BIY1GCQ5P%2FnnUaIFN0KqbKGLalPFMsQgbrrLvEMJrGNN%2Fl7jFTYH19YMMHKdqQCt3%2FY%2BadLbbIbgkOINl5wMkpUG4Qr0rGgsDiSTdy8M95U4IEBCb%2BYQsmSVFdJRX4Sm5u9ssyyNLuhL1hJU6Zqq8iX%2B0mTMQTI3nYiOyLIBF4%2F%2FtZfwODGqif7LFlJBxOXlJzRTuARWzhoCvVh34%2B9eLsmfV5fokUBhArhkUrFgXX%2FrT7eQRsFZ6M21%2F8F77vVdwro3PIywb0PDV1CBDWRA56W1ig7r0nkEJo7G5PnkqfCe%2BpwKnExXgcV%2F8aB7cGPsmry7atQ56JhQXNi%2F2MERHuy3ExzPkUHL4EkUrtDreHosr5rq4AD12XT%2BKDAnXhvEafgyN%2FrjmysuTa9OASTze8Cy68JT%2FVRKTuXsw7%2F%2Fz%2FQU6hgIHLPuMG8zdnlsZx9gmQbAeTPQ6fe8xKpfQv25vIGc%2Fl%2BIM%2BNcIX340eMnjWh4pzNCZsJyzTK8FOgkt7oC2mzgCXLCTtytNUU19u%2BJrH7xDzpuLQ0lbthFVy1PaqfvyJciSIPH%2FGMrsBukAFCCbfUpMCuc0KrHLEg9J53RiN2WTsQntZyzhTpGkUZtSSTn3TSk0yHw%2BrTLZBI6mAIEGOZInkJFNt06Fb0wCjK%2BO6NUUBX6i7zCdwUMDeune7SFzvjNPeU8qucoXNdvP8QoAaTte%2B1N6WStx6%2FPzLN3%2BtPu75JRF7fioyxidYfnFGuz76yoBtJ8GYAnU7nBoZua0d5DXQg3uvcMZ&X-Amz-Signature=cc54339de6b02f9be52708725b2c42f21860ac1fcfd96dd5ceff8141600bf935&X-Amz-SignedHeaders=host&x-amz-user-agent=aws-sdk-js-v3-%40aws-sdk%2Fclient-s3%2F1.0.0-gamma.4%20Mozilla%2F5.0%20%28X11%3B%20Linux%20x86_64%29%20AppleWebKit%2F537.36%20%28KHTML%2C%20like%20Gecko%29%20Chrome%2F86.0.4240.198%20Safari%2F537.36%20aws-amplify%2F3.4.5%20js&x-id=GetObject",
      },
      {
        bucket: "ecommerce-images-product115813-products",
        region: "us-east-1",
        key:
          "images/845fb0fa-2c1b-4e2d-aeca-698f626536d6retroliquor 120492192.jpg",
        position: "2",
        link:
          "https://ecommerce-images-product115813-products.s3.amazonaws.com/public/images/845fb0fa-2c1b-4e2d-aeca-698f626536d6retroliquor%20120492192.jpg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIA4WLJ6QFFPORDFSWU%2F20201124%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20201124T124327Z&X-Amz-Expires=900&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEF0aCXVzLWVhc3QtMSJGMEQCIE6cIXaubO3R63iEJt6AxekdtQ7%2FzX0c0veoqVm8uiU1AiAV%2F6PCrRUl3uLQt%2FgpYoNCWY68kfv4NDAZz%2FYflv%2FS2yrNBAjW%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAEaDDg3MjYzNzQzMjEzOCIMWkFTtmCqSe4iIb3AKqEEfNBJnCPF8p%2BmEFSmAZuaVDXqywoblan1nVypVIJqMnV8wjtpyUnlaoghVE%2F3%2BLKSBTLvfrn%2FXXRBxz0DBjn5z08iYYIezkgIDim4tj06EYkyvRYR1KqEwgUT1%2FSJkMhG2lxUk3TnDoXdG4r79MN0FgvnowJXeRmuas9MmPjCj5fIPlz7l5BXQin%2BKnS8%2BGEZRc04VI66gbFs5p7ZjuGDcDtYKAqmCOz2CeLvW4m39APsJh5tNe4JNkBysLVjz5PCVbJlFBlWtmbeHALXOhB%2FNfjO8K4IOyhixYpw0xhvYFsatp3GSwa%2BIY1GCQ5P%2FnnUaIFN0KqbKGLalPFMsQgbrrLvEMJrGNN%2Fl7jFTYH19YMMHKdqQCt3%2FY%2BadLbbIbgkOINl5wMkpUG4Qr0rGgsDiSTdy8M95U4IEBCb%2BYQsmSVFdJRX4Sm5u9ssyyNLuhL1hJU6Zqq8iX%2B0mTMQTI3nYiOyLIBF4%2F%2FtZfwODGqif7LFlJBxOXlJzRTuARWzhoCvVh34%2B9eLsmfV5fokUBhArhkUrFgXX%2FrT7eQRsFZ6M21%2F8F77vVdwro3PIywb0PDV1CBDWRA56W1ig7r0nkEJo7G5PnkqfCe%2BpwKnExXgcV%2F8aB7cGPsmry7atQ56JhQXNi%2F2MERHuy3ExzPkUHL4EkUrtDreHosr5rq4AD12XT%2BKDAnXhvEafgyN%2FrjmysuTa9OASTze8Cy68JT%2FVRKTuXsw7%2F%2Fz%2FQU6hgIHLPuMG8zdnlsZx9gmQbAeTPQ6fe8xKpfQv25vIGc%2Fl%2BIM%2BNcIX340eMnjWh4pzNCZsJyzTK8FOgkt7oC2mzgCXLCTtytNUU19u%2BJrH7xDzpuLQ0lbthFVy1PaqfvyJciSIPH%2FGMrsBukAFCCbfUpMCuc0KrHLEg9J53RiN2WTsQntZyzhTpGkUZtSSTn3TSk0yHw%2BrTLZBI6mAIEGOZInkJFNt06Fb0wCjK%2BO6NUUBX6i7zCdwUMDeune7SFzvjNPeU8qucoXNdvP8QoAaTte%2B1N6WStx6%2FPzLN3%2BtPu75JRF7fioyxidYfnFGuz76yoBtJ8GYAnU7nBoZua0d5DXQg3uvcMZ&X-Amz-Signature=2ff09146c38adcb6a4d8a6da92f2a3f583c187ef782d17d497b3ac65997395c3&X-Amz-SignedHeaders=host&x-amz-user-agent=aws-sdk-js-v3-%40aws-sdk%2Fclient-s3%2F1.0.0-gamma.4%20Mozilla%2F5.0%20%28X11%3B%20Linux%20x86_64%29%20AppleWebKit%2F537.36%20%28KHTML%2C%20like%20Gecko%29%20Chrome%2F86.0.4240.198%20Safari%2F537.36%20aws-amplify%2F3.4.5%20js&x-id=GetObject",
      },
      {
        bucket: "ecommerce-images-product115813-products",
        region: "us-east-1",
        key:
          "images/09bf57cf-3b5b-447d-9942-7826b6ae9b22retroliquor 120457647.jpg",
        position: "1",
        link:
          "https://ecommerce-images-product115813-products.s3.amazonaws.com/public/images/09bf57cf-3b5b-447d-9942-7826b6ae9b22retroliquor%20120457647.jpg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIA4WLJ6QFFPORDFSWU%2F20201124%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20201124T124327Z&X-Amz-Expires=900&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEF0aCXVzLWVhc3QtMSJGMEQCIE6cIXaubO3R63iEJt6AxekdtQ7%2FzX0c0veoqVm8uiU1AiAV%2F6PCrRUl3uLQt%2FgpYoNCWY68kfv4NDAZz%2FYflv%2FS2yrNBAjW%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAEaDDg3MjYzNzQzMjEzOCIMWkFTtmCqSe4iIb3AKqEEfNBJnCPF8p%2BmEFSmAZuaVDXqywoblan1nVypVIJqMnV8wjtpyUnlaoghVE%2F3%2BLKSBTLvfrn%2FXXRBxz0DBjn5z08iYYIezkgIDim4tj06EYkyvRYR1KqEwgUT1%2FSJkMhG2lxUk3TnDoXdG4r79MN0FgvnowJXeRmuas9MmPjCj5fIPlz7l5BXQin%2BKnS8%2BGEZRc04VI66gbFs5p7ZjuGDcDtYKAqmCOz2CeLvW4m39APsJh5tNe4JNkBysLVjz5PCVbJlFBlWtmbeHALXOhB%2FNfjO8K4IOyhixYpw0xhvYFsatp3GSwa%2BIY1GCQ5P%2FnnUaIFN0KqbKGLalPFMsQgbrrLvEMJrGNN%2Fl7jFTYH19YMMHKdqQCt3%2FY%2BadLbbIbgkOINl5wMkpUG4Qr0rGgsDiSTdy8M95U4IEBCb%2BYQsmSVFdJRX4Sm5u9ssyyNLuhL1hJU6Zqq8iX%2B0mTMQTI3nYiOyLIBF4%2F%2FtZfwODGqif7LFlJBxOXlJzRTuARWzhoCvVh34%2B9eLsmfV5fokUBhArhkUrFgXX%2FrT7eQRsFZ6M21%2F8F77vVdwro3PIywb0PDV1CBDWRA56W1ig7r0nkEJo7G5PnkqfCe%2BpwKnExXgcV%2F8aB7cGPsmry7atQ56JhQXNi%2F2MERHuy3ExzPkUHL4EkUrtDreHosr5rq4AD12XT%2BKDAnXhvEafgyN%2FrjmysuTa9OASTze8Cy68JT%2FVRKTuXsw7%2F%2Fz%2FQU6hgIHLPuMG8zdnlsZx9gmQbAeTPQ6fe8xKpfQv25vIGc%2Fl%2BIM%2BNcIX340eMnjWh4pzNCZsJyzTK8FOgkt7oC2mzgCXLCTtytNUU19u%2BJrH7xDzpuLQ0lbthFVy1PaqfvyJciSIPH%2FGMrsBukAFCCbfUpMCuc0KrHLEg9J53RiN2WTsQntZyzhTpGkUZtSSTn3TSk0yHw%2BrTLZBI6mAIEGOZInkJFNt06Fb0wCjK%2BO6NUUBX6i7zCdwUMDeune7SFzvjNPeU8qucoXNdvP8QoAaTte%2B1N6WStx6%2FPzLN3%2BtPu75JRF7fioyxidYfnFGuz76yoBtJ8GYAnU7nBoZua0d5DXQg3uvcMZ&X-Amz-Signature=d576c3d8f279eff59fbcefcda7193b1379814f332be36e806e7bf179d9ada333&X-Amz-SignedHeaders=host&x-amz-user-agent=aws-sdk-js-v3-%40aws-sdk%2Fclient-s3%2F1.0.0-gamma.4%20Mozilla%2F5.0%20%28X11%3B%20Linux%20x86_64%29%20AppleWebKit%2F537.36%20%28KHTML%2C%20like%20Gecko%29%20Chrome%2F86.0.4240.198%20Safari%2F537.36%20aws-amplify%2F3.4.5%20js&x-id=GetObject",
      },
    ],
    avaliation: 5,
    comments: { items: [], nextToken: null },
    updatedAt: "2020-11-11T21:48:06.359Z",
  };

  const appState = {
    items: {},
    products: { listProducts: [] }, //
    product: null, //was null
    loading: false,
    current: 0,
    page: 1,
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
