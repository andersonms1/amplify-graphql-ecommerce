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
import { useStyletron } from "baseui";
import { useStyles } from "./useStyles";
import { LabelMedium } from "baseui/typography";

function ModalDetail({ status, currentItem }) {
  let history = useHistory();

  const [css, theme] = useStyletron();
  const [size, setSize] = useState();
  const [quantity, setQuantity] = useState(1);
  const [inconsistent, setInconsistent] = useState(false); //Quantitty grater than stock
  const [slider, setSlider] = useState([2]);
  const [disabled, setDisabled] = useState(true);
  const [maxQuantity, setMaxQuantity] = useState(0);

  const { containerStyles } = useStyles();

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

  useEffect(() => {
    // const _cart = getObj("cart");Already loaded from the Cart page
  }, [cart]);

  useEffect(() => {
    if (maxQuantity) {
      if (quantity > maxQuantity) {
        setQuantity(maxQuantity);
      }
      if (quantity < 1) {
        setQuantity(1);
      }
    }
  }, [quantity]);

  const handleSelect = () => {
    if (product) {
      return product.amount.map((size, index) => {
        return { label: size.size, id: `${index}` };
      });
    } else {
      return [{ label: "Carregando...", id: "0" }];
    }
  };

  const handleSave = () => {
    console.log(size);
    addCartItem({
      ...product,
      selection: {
        size: size[0].label,
        quantity: quantity,
        inconsistency: false,
      },
    });
    setModalOpen({ ...modalOpen, open: false });
    history.push("/checkout");
  };

  const handleMaxQuantity = (params) => {
    setMaxQuantity(product.amount[params.value[0].id].amount);
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
          <div className={containerStyles}>
            <FormControl label="" caption="">
              <Select
                options={handleSelect()}
                clearable={false}
                searchable={false}
                placeholder="Tamanho"
                value={size}
                onChange={(params) => {
                  setSize(params.value);
                  handleMaxQuantity(params);
                  setDisabled(false);
                }}
              />
            </FormControl>

            <FormControl
              label=""
              // caption={() => {
              //   if (disabled === false) {
              //     return `Máximo de unidades ${maxQuantity}`;
              //   }
              // }}
              className={css({
                display: "inline-block",
              })}
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
          </div>

          {!disabled && (
            <LabelMedium>Máximo de unidades {maxQuantity}</LabelMedium>
          )}
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

export default ModalDetail;
