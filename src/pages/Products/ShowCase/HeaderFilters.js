import React, { useState, useEffect, useContext } from "react";
import { useStyletron } from "baseui";
import { HeadingMedium, LabelSmall } from "baseui/typography";
import { Button, KIND, SIZE, SHAPE } from "baseui/button";
import HeaderContext from "../../../context/HeaderContext";
import OptionsDrw from "./OptionsDrw";

function HeaderFilters(props) {
  const { title } = props;
  const { setIsDrwOptions, querie } = useContext(HeaderContext);
  const [css, theme] = useStyletron();
  const [filter, setFilter] = useState();
  // const [isQuerie, setIsQuerie] = useState(false);

  useEffect(() => {
    switch (querie.querie) {
      case "productsByCategoryCreatedAt":
        setFilter("Novidades");
        return;
      case "productsByCategorySold":
        setFilter("Mais vendidos");
        return;
      case "productsByCategoryPrice":
        if (querie.values.sortDirection === "ASC") {
          setFilter("Maiores preços");
          return;
        } else {
          setFilter("Menores preços");
          return;
        }
      default:
        setFilter("Filtro não selecionado");
        return;
    }
  }, [querie]);

  return (
    <div>
      <div
        className={css({
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        })}
      >
        <div>
          <HeadingMedium marginBottom={theme.sizing.scale200}>
            {title}
          </HeadingMedium>
          <LabelSmall marginBottom={theme.sizing.scale500}>{filter}</LabelSmall>
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
      <OptionsDrw />
    </div>
  );
}

export default HeaderFilters;
