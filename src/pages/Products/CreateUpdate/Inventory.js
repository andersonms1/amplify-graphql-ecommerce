import React, { useState, useContext, useEffect } from "react";
import { useStyletron } from "baseui";
import { FormControl } from "baseui/form-control";
import { Combobox } from "baseui/combobox";
import { Input, MaskedInput } from "baseui/input";
import { Button, KIND } from "baseui/button";
import { Block } from "baseui/block";

import { ListItem, ListItemLabel } from "baseui/list";
import { List, arrayMove, arrayRemove } from "baseui/dnd-list";

import Delete from "baseui/icon/delete";
import AppContext from "../../../context/AppContext";
import { items as tp_items } from "../../../context/types";
import { getObj } from "../../../utils/localStorage";
import {
  formDescription as SCHEMA,
  category as CATEGORY,
  quantity as AMOUNT,
  // photos as PHOTOS,
  price as PRICE,
} from "./validations";
import { HandleErrors } from "../../../components";

function Inventory({ children }) {
  // useEffect(() => {
  //   console.log(items);
  // }, []);

  const [css] = useStyletron();
  const { setCurrentStep, items, updateItems, current } = useContext(
    AppContext
  );

  const [inventory, setInventory] = useState([]);
  const [amount, setAmount] = useState({});

  useEffect(() => {
    const init = getObj(tp_items);
    console.log(init);
    console.log(items);
    updateItems(init);
    init.inventory && setInventory(init.inventory);
    // init.description && setDescription(init.description);
  }, [current]);

  useEffect(() => {
    console.log(inventory);
  }, [inventory]);

  useEffect(() => {
    console.log(amount);
  }, [amount]);

  const handleSave = () => {
    setInventory([...inventory, amount]);
    setAmount({});
  };

  const renderInventory = () => {
    const renderListItems = () => {
      return inventory.map((item, index) => {
        return (
          <ListItem
            key={index}
            endEnhancer={() => (
              <Button size="compact" kind="secondary" shape="round">
                <Delete onClick={() => setAmount(inventory.splice(index, 1))} />
              </Button>
            )}
          >
            <ListItemLabel
              onClick={() => console.log("Test")}
              description={item.amount}
            >
              {item.size}
            </ListItemLabel>
          </ListItem>
        );
      });
    };
    return (
      <ul
        className={css({
          paddingLeft: 0,
          paddingRight: 0,
        })}
      >
        {renderListItems()}
      </ul>
    );
  };

  return (
    <>
      {inventory.length ? (
        <List
          removable
          items={inventory.map((i) => {
            return `Tamanho: ${i.size}, Quant.: ${i.amount}`;
          })}
          onChange={({ oldIndex, newIndex }) =>
            setInventory(
              newIndex === -1
                ? arrayRemove(inventory, oldIndex)
                : arrayMove(inventory, oldIndex, newIndex)
            )
          }
        />
      ) : null}
      <FormControl label="Tamanho" caption="">
        <Input
          value={amount.size ? amount.size : ""}
          onChange={(e) => {
            setAmount({ ...amount, size: e.target.value });
            console.log(amount);
          }}
        />
      </FormControl>
      <FormControl label="Quantidade" caption="">
        <Input
          value={amount.amount ? amount.amount : ""}
          onChange={(e) => {
            setAmount({ ...amount, amount: parseInt(e.target.value) });
            console.log(amount);
          }}
        />
      </FormControl>
      <Button
        kind={KIND.primary}
        disabled={!amount.size || !Number.isInteger(parseInt(amount.amount))}
        size="compact"
        onClick={() => handleSave()}
      >
        Adicionar
      </Button>

      <Block paddingTop="50px" />
      <Button
        kind={KIND.secondary}
        size="compact"
        onClick={() => {
          updateItems({ ...items, inventory });
          setCurrentStep(1);
        }}
      >
        Anterior
      </Button>
      {inventory.length ? (
        <Button
          kind={KIND.primary}
          size="compact"
          onClick={() => {
            console.log("Test");
            updateItems({ ...items, inventory });
            setCurrentStep(3);
          }}
        >
          Próximo
        </Button>
      ) : null}
    </>
  );
}
export default Inventory;
