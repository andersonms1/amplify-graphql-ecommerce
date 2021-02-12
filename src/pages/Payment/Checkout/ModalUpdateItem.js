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
import { Select, TYPE } from "baseui/select";
import { FormControl } from "baseui/form-control";
import { Button, KIND, SIZE as BTSIZE, SHAPE } from "baseui/button";
import { ArrowUp, ArrowDown, DeleteAlt, ChevronLeft, Check } from "baseui/icon";
import { useHistory } from "react-router-dom";

import AppContext from "../../../context/AppContext";
import CheckoutContext from "../../../context/CheckoutContext";
import _ from "lodash";

function ModalSelection({ status, currentItem }) {
  let history = useHistory();

  const [size, setSize] = useState();
  const [quantity, setQuantity] = useState(100);
  const [disabled, setDisabled] = useState(true);
  const [select, setSelect] = useState([]);
  const [maxQuantity, setMaxQuantity] = useState(0);

  const { getById, product } = useContext(AppContext);

  const {
    current,
    setCurrentStep,
    cart,
    addCartItem,
    addCartSelection,
    setCart,
    updateCartItem,
    removeCartItem,
    modalOpen,
    setModalOpen,
  } = useContext(CheckoutContext);

  useEffect(() => {
    if (handleCartLoading()) {
      if (isCurrentItemValid()) {
        setSize([
          {
            label: cart.products[currentItem].selection.size,
            id: `${currentItem}`,
          },
        ]);
        setSelect(
          cart.products[currentItem].amount.map((size, index) => {
            return { label: size.size, id: `${index}` };
          })
        );
        // setSelect(cart.products[currentItem].amount)
        // console.log(cart.products[currentItem].selection.size);
        // console.log(
        //   cart.products[currentItem].amount[
        //     _.findIndex(cart.products[currentItem].selection.size, {})
        //   ]
        // );

        setQuantity(cart.products[currentItem].selection.quantity);
      }
    }
  }, [cart, currentItem, modalOpen]);
  // }, [cart, currentItem, modalOpen]);

  useEffect(() => {
    if (maxQuantity) {
      if (quantity > maxQuantity) {
        setQuantity(maxQuantity);
      }
    }
    if (quantity < 1) {
      setQuantity(1);
    }
  });

  const isCurrentItemValid = () => {
    try {
      if (cart.products[currentItem]) {
        return true;
      }
    } catch (e) {
      console.log("Not valid");
      return false;
    }
  };

  const handleCartLoading = () => {
    // We need to wait until the cart state update
    if (Array.isArray(cart?.products)) {
      if (cart.products.length) {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  };

  const handleSave = () => {
    updateCartItem(currentItem, { size: size[0].label, quantity });
    setModalOpen({ ...modalOpen, open: false });
  };

  const handleMaxQuantity = (params) => {
    // setMaxQuantity(10);
    setMaxQuantity(
      cart.products[currentItem].amount[params.value[0].id].amount
    );
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
              options={select}
              // placeholder={cart.products[currentItem].selection.size}
              clearable={false}
              searchable={false}
              value={size}
              onChange={(params) => {
                console.log(params.value);
                handleMaxQuantity(params);
                setSize(params.value);
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
        </ModalBody>

        <ModalFooter>
          <ModalButton
            endEnhancer={() => (
              <DeleteAlt
                // color="red"
                onClick={() => {
                  setModalOpen({ ...modalOpen, open: false });
                }}
              />
            )}
            kind={ButtonKind.minimal}
            onClick={() => {
              setModalOpen({ ...modalOpen, open: false });
              removeCartItem(currentItem);
            }}
          >
            Excluir
          </ModalButton>
          <ModalButton
            endEnhancer={() => (
              <ChevronLeft
                onClick={() => {
                  setModalOpen({ ...modalOpen, open: false });
                }}
              />
            )}
            kind={ButtonKind.secondary}
            onClick={() => {
              setModalOpen({ ...modalOpen, open: false });
            }}
          >
            Cancelar
          </ModalButton>
          <ModalButton
            endEnhancer={() => (
              <Check
                // color="green"
                onClick={() => {
                  setModalOpen({ ...modalOpen, open: false });
                }}
              />
            )}
            disabled={false}
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
