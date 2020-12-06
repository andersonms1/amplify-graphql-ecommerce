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

import AppContext from "../../../context/AppContext";
import CheckoutContext from "../../../context/CheckoutContext";

import { PRODUCT_SELECTION_TYPES as PS_TYPES } from "../../../utils/STATUS";

function ModalSelection({ status, currentItem }) {
  const [size, setSize] = useState();
  const [quantity, setQuantity] = useState();
  const [inconsistent, setInconsistent] = useState(false); //Quantitty grater than stock

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

  const handleSelect = () => {
    if (product) {
      if (PS_TYPES.DETAILS === status) {
        return product.amount.map((size, index) => {
          return { label: size.size, id: `${index}` };
        });
      } else if (PS_TYPES.CART === status) {
        return cart.products[currentItem].amount.map((size, index) => {
          return { label: size.size, id: `${index}` };
        });
      } else {
        return [{ label: "Produto não setado", id: 0 }];
      }
    } else {
      return [{ label: "Carregando...", id: "0" }];
    }
  };

  // const handleMaxQuantity = () => {
  //   if (product) {
  //     if(PS_TYPES.CART ===  status){
  //       return product.amount.amount
  //     }else if(PS_TYPES.DETAILS === status){
  //         return cart.products[currentItem].amount[0].amount
  //     }else{
  //       return [{label: "Produto não setado", id: 0}]
  //     }
  //   } else {
  //     return [{ label: "Carregando...", id: "0" }];
  //   }
  // }

  return (
    <div>
      <Modal
        onClose={() => setModalOpen(false)}
        closeable
        isOpen={modalOpen}
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
              value={size}
              // placeholder={
              //   handleStateComparation() && isOpen && !size
              //     ? `${cart.products[currentItem].amount[0].size}`
              //     : `${size}`
              // }
              onChange={(params) => {
                setSize(params.value);
              }}
            />
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
              setModalOpen(false);
            }}
          >
            Cancelar
          </ModalButton>
          <ModalButton
            onClick={() => {
              console.log("Save");
              setModalOpen(false);
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
