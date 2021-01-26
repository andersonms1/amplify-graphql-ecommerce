import React, { useState, useEffect, useContext } from "react";
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalButton,
  SIZE,
  ROLE,
} from "baseui/modal";
import { KIND as ButtonKind } from "baseui/button";
import { Input, ADJOINED } from "baseui/input";
import { Select, TYPE } from "baseui/select";
import { FormControl } from "baseui/form-control";
import { Slider } from "baseui/slider";
import { Button, KIND, SIZE as BTSIZE, SHAPE } from "baseui/button";
import { ArrowUp, ArrowDown } from "baseui/icon";
import { useHistory } from "react-router-dom";

import AppContext from "../../../context/AppContext";
import CheckoutContext from "../../../context/CheckoutContext";

import { PRODUCT_SELECTION_TYPES as PS_TYPES } from "../../../utils/STATUS";
import {
  getItem,
  setItem,
  getObj,
  setObj,
  removeAny,
} from "../../../utils/localStorage";

function ModalSelection({ status, currentItem }) {
  let history = useHistory();

  const [size, setSize] = useState();
  const [quantity, setQuantity] = useState(1);
  const [inconsistent, setInconsistent] = useState(false); //Quantitty grater than stock
  const [slider, setSlider] = useState([2]);
  const [disabled, setDisabled] = useState(true);
  const [maxQuantity, setMaxQuantity] = useState(0);

  const { getById, product } = useContext(AppContext);

  const {
    current,
    setCurrentStep,
    cart,
    addCartItem,
    addCartSelection,
    setCart,
    removeCartItem,
    modalOpen,
    setModalOpen,
  } = useContext(CheckoutContext);

  // useEffect(() => {
  //   setObj(product.id, { quantity: 100, size: "G" });

  //   const selection = getObj(product.id);

  //   if (selection) {
  //     setQuantity(selection.quantity);
  //     setSize(selection.size);
  //   }

  //   console.log(quantity);
  // }, [quantity, size, inconsistent]);

  // useEffect(() => {
  //   console.log(value);
  // }, [value]);

  useEffect(() => {
    // const _cart = getObj("cart");Already loaded from the Cart page

    if (handleCartLoading()) {
      // setSize(_cart.products[currentItem].size);
      // setQuantity(_cart.products[currentItem].quantity);
      // console.log(_cart);
    }
  }, [cart]);

  const handleCartLoading = () => {
    // We need to wait until the cart state update
    if (Array.isArray(cart.products)) {
      if (cart.products.length) {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  };

  const handleSelect = () => {
    if (PS_TYPES.DETAILS === status) {
      if (product) {
        return product.amount.map((size, index) => {
          return { label: size.size, id: `${index}` };
        });
      } else {
        return [{ label: "Carregando...", id: "0" }];
      }
    } else if (PS_TYPES.CART === status) {
      if (handleCartLoading()) {
        return cart.products[currentItem].amount.map((size, index) => {
          return { label: size.size, id: `${index}` };
        });
      } else {
        return [{ label: "Carregando...", id: "0" }];
      }
    } else {
      new Error("Produto não setado");
      return [{ label: "Produto não setado", id: 0 }];
    }
  };

  const handleSave = () => {
    if (PS_TYPES.DETAILS === status) {
      addCartItem({
        ...product,
        selection: { size: "G", quantity: "1", inconsistency: false },
      });
      setModalOpen({ ...modalOpen, open: false });
      history.push("/checkout");
    } else if (PS_TYPES.CART === status) {
    } else {
      new Error("status not seted!");
    }
  };

  const handleMaxQuantity = (params) => {
    if (PS_TYPES.DETAILS === status) {
      setMaxQuantity(product.amount[params.value[0].id].amount);
    } else if (PS_TYPES.CART === status) {
      setMaxQuantity(
        cart.products[currentItem].amount[params.value[0].id].amount
      );
    } else {
      new Error("status not seted!");
    }
  };

  const isValidSelection = () => {
    if (maxQuantity < 1 || disabled) {
      return false;
    } else {
      return true;
    }
  };

  return (
    <div>
      <Modal
        onClose={() => setModalOpen({ ...modalOpen, open: false })}
        closeable
        isOpen={modalOpen.open}
        animate
        autoFocus
        size={SIZE.default}
        role={ROLE.dialog}
        unstable_ModalBackdropScroll
      >
        <ModalHeader>Escolha o tamanho e quantidade</ModalHeader>
        <ModalBody>
          <FormControl label="Tamanho" caption="">
            <Select
              options={handleSelect()}
              clearable={false}
              searchable={false}
              value={size}
              onChange={(params) => {
                setSize(params.value);
                handleMaxQuantity(params);
                setDisabled(false);
              }}
            />
          </FormControl>

          <FormControl
            label="Quantidade"
            caption={() => {
              if (disabled === false) {
                return `Máximo de unidades ${maxQuantity}`;
              }
            }}
          >
            <Button
              onClick={() => console.log("Clicked!")}
              startEnhancer={() => (
                <ArrowUp onClick={() => setQuantity(quantity + 1)} />
              )}
              endEnhancer={() => (
                <ArrowDown onClick={() => setQuantity(quantity - 1)} />
              )}
              disabled={false}
              kind={KIND.primary}
              size={BTSIZE.default}
              shape={SHAPE.default}
            >
              {quantity}
            </Button>
          </FormControl>
          {/* <FormControl
            label="Quantidade"
            placeholder="1"
            caption={`Quantidade máxima ${
              handleStateComparation() && isOpen
                ? `${cart.products[currentItem].amount[0].amount}`
                : ""
            }
              `}
            disabled={size ? false : true}
          >
            <Input
              value={quantity}
              onChange={(e) => {
                setQuantity(e.target.value);
              }}
              placeholder=""
              clearOnEscape
            />
          </FormControl> */}
        </ModalBody>

        <ModalFooter>
          <ModalButton
            kind={ButtonKind.tertiary}
            onClick={() => {
              setModalOpen({ ...modalOpen, open: false });
            }}
          >
            Cancelar
          </ModalButton>
          <ModalButton
            disabled={!isValidSelection()}
            onClick={() => {
              handleSave();
            }}
          >
            Salvar
          </ModalButton>
        </ModalFooter>
      </Modal>
    </div>
  );
}

export default ModalSelection;
