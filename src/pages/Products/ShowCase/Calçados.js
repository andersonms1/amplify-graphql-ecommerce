import React, { useState, useEffect, useContext } from "react";
import { useStyletron } from "baseui";
import Products from "../Products";
import HeaderContext from "../../../context/HeaderContext";
import { FEMININO, subCategorys } from "../../../utils/CATEGORYSUBCATEGORYS";
import HeaderFilters from "./HeaderFilters";

const Calçados = () => {
  const { querie, setQuerie } = useContext(HeaderContext);
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
