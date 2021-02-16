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
import HeaderFilters from "./HeaderFilters";
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
    setQuerie({
      querie: "productsByCategorySold",
      values: {
        sortDirection: "DESC",
        category: "FEMININO",
        sold: { ge: 0 },
      },
    });
    setIsQuerie(true);
  }, []);

  return (
    <div>
      <HeaderFilters title="Calçados" />

      {isQuerie ? (
        <Products querie={querie.querie} values={querie.values} />
      ) : null}
    </div>
  );
};

export default Calçados;
