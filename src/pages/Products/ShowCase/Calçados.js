import React, { useState, useEffect, useContext } from "react";
import { useStyletron } from "baseui";
import {
  HeadingMedium,
  ParagraphMedium,
  LabelMedium,
  LabelSmall,
} from "baseui/typography";
import { Card, StyledBody, StyledAction } from "baseui/card";
import { FlexGrid, FlexGridItem } from "baseui/flex-grid";
import Products from "../Products";
import { Button, KIND, SIZE, SHAPE } from "baseui/button";
import HeaderContext from "../../../context/HeaderContext";
import { FEMININO, subCategorys } from "../../../utils/CATEGORYSUBCATEGORYS";
import OptionsDrw from "./OptionsDrw";
// import { listProducts } from "../../../graphql/queries";

const Calçados = () => {
  const { isDrwOptions, setIsDrwOptions, querie, setQuerie } = useContext(
    HeaderContext
  );
  const [css, theme] = useStyletron();
  const [isQuerie, setIsQuerie] = useState(false);

  const initial_date = "2021-01-23T15:25:14.159Z";
  useEffect(() => {
    // setQuerie({
    //   querie: "productsByCategorySubCategorySold",
    //   values: {
    //     sortDirection: "ASC",
    //     category: "FEMININO",
    //     subCategorySold: { eg: { subCategory: "CALÇADOS", sold: 0 } },
    //   },
    // });
    // setQuerie({
    //   querie: "productsByCategorySubCategorySold",
    //   values: {
    //     sortDirection: "ASC",
    //     category: "CALÇADOS",
    // subCategorySold: { eg: { sold: 0 } },

    // subCategorySold: { eg: { sold: 0 } },
    //   },
    // });

    // if (!isQuerie) {
    //   // setQuerie({
    //   //   querie: "productsByCategorySold",
    //   // values: {
    //   //   sortDirection: "DESC",
    //   //   category: "FEMININO",
    //   //   sold: { ge: 10 },
    //   // },
    //   // });

    //   // setQuerie({
    //   //   querie: "productsByCategoryCreatedAt",
    //   //   values: {
    //   //     sortDirection: "DESC",
    //   //     category: "FEMININO",
    //   //     createdAt: { ge: initial_date },
    //   //   },
    //   // });
    // }
    console.log(querie);
    setIsQuerie(true);
  }, [querie]);

  return (
    <div>
      <OptionsDrw />

      <div
        className={css({
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        })}
      >
        <div>
          <HeadingMedium marginBottom="5px">Calçados</HeadingMedium>
          <LabelSmall>Mais vendidos</LabelSmall>
        </div>
        <Button
          onClick={() => setIsDrwOptions(true)}
          kind={KIND.secondary}
          size={SIZE.default}
          shape={SHAPE.default}
        >
          Filtros
        </Button>
      </div>

      {querie || true ? (
        <Products
          querie={querie.querie ? querie.querie : "productsByCategorySold"}
          values={
            querie.querie
              ? querie.values
              : {
                  sortDirection: "DESC",
                  category: "FEMININO",
                  sold: { ge: 10 },
                }
          }
        />
      ) : null}

      {/* {isQuerie ? (
        <Products querie={querie.querie} values={querie.values} />
      ) : null} */}
    </div>
  );
};

export default Calçados;
