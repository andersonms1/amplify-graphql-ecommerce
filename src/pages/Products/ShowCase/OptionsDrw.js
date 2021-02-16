import React, { useState, useEffect, useContext } from "react";
import { useStyletron } from "baseui";
import { ListItem, ListItemLabel, ARTWORK_SIZES } from "baseui/list";
import { Check, ChevronRight } from "baseui/icon";
import { Drawer, SIZE, ANCHOR } from "baseui/drawer";
import { Button, KIND, SIZE as BTSIZE, SHAPE } from "baseui/button";
import HeaderContext from "../../../context/HeaderContext";
import { set } from "lodash";

function OptionsDrw() {
  const { isDrwOptions, setIsDrwOptions, querie, setQuerie } = useContext(
    HeaderContext
  );
  const [css, theme] = useStyletron();

  const initial_date = "2021-01-23T15:25:14.159Z";

  const types = {
    _new: "NEW",
    sold: "SOLD",
    priceLow: "PRICE_LOW",
    priceHigh: "PRICE_HIGH",
  };

  const handleSelection = (opt) => {
    const { _new, sold, priceLow, priceHigh } = types;

    switch (opt) {
      case _new:
        setQuerie({
          querie: "productsByCategoryCreatedAt",
          values: {
            sortDirection: "DESC",
            category: "FEMININO",
            createdAt: { ge: initial_date },
          },
        });
        setIsDrwOptions(false);
        return;

      case sold:
        setQuerie({
          querie: "productsByCategorySold",
          values: {
            sortDirection: "DESC",
            category: "FEMININO",
            sold: { ge: 0 },
          },
        });
        setIsDrwOptions(false);
        return;

      case priceLow:
        setQuerie({
          querie: "productsByCategoryPrice",
          values: {
            sortDirection: "ASC",
            category: "FEMININO",
            price: { ge: 0 },
          },
        });
        setIsDrwOptions(false);
        return;

      case priceHigh:
        setQuerie({
          querie: "productsByCategoryPrice",
          values: {
            sortDirection: "DESC",
            category: "FEMININO",
            price: { ge: 0 },
          },
        });
        setIsDrwOptions(false);
        return;
    }
  };

  const renderOptionsDrw = () => {
    return (
      <Drawer
        isOpen={isDrwOptions}
        renderAll
        onClose={() => setIsDrwOptions(false)}
        size={SIZE.auto}
        anchor={ANCHOR.default}
      >
        <ul
          className={css({
            paddingLeft: 0,
            paddingRight: 0,
          })}
        >
          <ListItem>
            <ListItemLabel>Filtros</ListItemLabel>
          </ListItem>

          <ListItem
            endEnhancer={() => (
              <ChevronRight
                size={22}
                onClick={() => handleSelection(types._new)}
              />
            )}
            sublist
          >
            <ListItemLabel>Novidades</ListItemLabel>
          </ListItem>

          <ListItem
            endEnhancer={() => (
              <ChevronRight
                size={22}
                onClick={() => handleSelection(types.sold)}
              />
            )}
            sublist
          >
            <ListItemLabel>Mais vendidos</ListItemLabel>
          </ListItem>

          <ListItem
            endEnhancer={() => (
              <ChevronRight
                size={22}
                onClick={() => handleSelection(types.priceLow)}
              />
            )}
            sublist
          >
            <ListItemLabel>Menores preços</ListItemLabel>
          </ListItem>

          <ListItem
            endEnhancer={() => (
              <ChevronRight
                size={22}
                onClick={() => handleSelection(types.priceHigh)}
              />
            )}
            sublist
          >
            <ListItemLabel>Maiores preços</ListItemLabel>
          </ListItem>
        </ul>
      </Drawer>
    );
  };
  return <div>{renderOptionsDrw()}</div>;
}

export default OptionsDrw;
