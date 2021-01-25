import React from "react";
import { Products } from "../Products/index";
import { useStyletron } from "baseui";
import { Display4 } from "baseui/typography";
import { FEMININO, subCategorys } from "../../utils/CATEGORYSUBCATEGORYS";

function ShowCase({ item }) {
  const [css, theme] = useStyletron();
  console.log(subCategorys.CALCADOS);
  return (
    <div>
      <Display4 paddingTop={theme.sizing.scale850}>{item}</Display4>
      {/* <Products querie="listProducts" /> */}

      {/* <Products
        querie="productsByCategorySubCategory"
        values={{
          category: FEMININO,
          subCategory: { eq: subCategorys.CALCADOS },
          sort: "createdAt",
        }}
      /> */}

      <Products
        querie="productsByCategorySubCategoryCreatedAt"
        values={{
          category: FEMININO,
          subCategoryCreatedAt: {
            le: {
              subCategory: subCategorys.CALCADOS,
              // createdAt: "2021-01-23T15:25:14.159Z",
              createdAt: "2021-01-23T15:19:20.005Z",
            },
          },
        }}
      />
    </div>
  );
}

export default ShowCase;
