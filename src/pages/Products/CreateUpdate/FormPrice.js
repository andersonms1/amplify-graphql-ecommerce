import React, { useState, useContext, useEffect } from "react";
import { useStyletron } from "baseui";
import { FormControl } from "baseui/form-control";
import { Combobox } from "baseui/combobox";
import { Input, MaskedInput } from "baseui/input";
import { Button, KIND } from "baseui/button";
import { Block } from "baseui/block";
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
import { SnackbarElement } from "baseui/snackbar";
import { StyledSpinnerNext } from "baseui/spinner";

import AppContext from "../../../context/AppContext";
import {
  formDescription as SCHEMA,
  category as CATEGORY,
  quantity as AMOUNT,
  // photos as PHOTOS,
  price as PRICE,
} from "./validations";
import { HandleErrors } from "../../../components";
import ALLCATEGORYS from "../../../utils/CATEGORY";
import InputReplacement from "../../../components/InputReplacement";

function Form({ children }) {
  useEffect(() => {
    console.log(items);
  }, []);

  const [css] = useStyletron();
  const { setCurrentStep, items, updateItems } = useContext(AppContext);

  const [error, setError] = useState(false);
  const [errorDescription, setErrorDescription] = useState("");
  const [errorMsg, setErrorMsg] = useState([]);

  const [categoryCaption, setCategoryCaption] = useState(
    "Digite a categoria e aperte enter, somente categorias cadastradas aceitas."
  );
  const [category, setCategory] = useState("");
  const [categorys, setCategorys] = useState([]);
  const [price, setPrice] = useState("");
  const [priceCaption, setPriceCaption] = useState(
    "Digite todos os digitos. Ex: 010,25"
  );
  const [quantityCaption, setQuantityCaption] = useState(
    "Quantidade de produtos disponíveis"
  );
  const [quantity, setQuantity] = useState("");

  const [isOpen, setIsOpen] = useState(false);
  const [spinner, setSpinner] = useState(false);

  const data = {
    category,
    amount: 10,
    price: { specie: 10, cents: 10 },
    photos: [
      {
        bucket: "ecommerce-images-product101337-dev",
        position: 0,
        key: "images/456d578b-b797-4a53-825f-bc621c01c2d9crop-ahmed-carter.jpg",
        region: "us-east-1",
      },
    ],
  };

  const validateNext = () => {
    const validator = SCHEMA.validate(
      { category },
      {
        abortEarly: false,
      }
    );

    if (validator.error) {
      setErrorDescription("Algum(s) campos não está(ão) válidos");
      setErrorMsg(validator.error.details);
      setError(true);
    } else {
      setError(false);
      // setCurrentStep(2);
      alert("Publicado");
    }
    // if (error) {
    //   setError(true);
    // } else {
    //   setError(false);
    // setCurrentStep(2);
    // }
  };

  const addTag = (tag) => {
    setCategorys([...categorys, tag]);
  };
  const removeTag = (tag) => {
    setCategorys(categorys.filter((t) => t !== tag));
  };
  const handleKeyDown = (event) => {
    switch (event.keyCode) {
      // Enter
      case 13: {
        if (!category) return;
        const filter = ALLCATEGORYS.filter((c) => c != category);
        if (filter.length !== ALLCATEGORYS.length) {
          addTag(category);
          setCategory("");
          setError(false);
          return;
        } else {
          setErrorDescription(
            "Categoria inválida: Utilize as categorias abaixo"
          );
          setErrorMsg(ALLCATEGORYS);
          setError(true);
          setCategory("");
          return;
        }
      }
      // Backspace
      case 8: {
        if (category || !categorys.length) return;
        removeTag(categorys[categorys.length - 1]);
        return;
      }
    }
  };

  const handlePost = () => {};
  return (
    <>
      {HandleErrors(error, errorDescription, errorMsg)}

      <FormControl label="Categoria" caption={`${categoryCaption}`}>
        <Input
          // placeholder={categorys.length ? "" : "Enter A Tag"}
          value={category}
          onChange={(e) => setCategory(e.currentTarget.value.toUpperCase())}
          overrides={{
            Input: {
              component: InputReplacement,
              props: {
                tags: categorys,
                removeTag: removeTag,
                onKeyDown: handleKeyDown,
              },
            },
          }}
        />
      </FormControl>

      <FormControl label="Preço" caption={`${priceCaption}`}>
        <MaskedInput
          value={price}
          startEnhancer="R$"
          placeholder="Valor"
          mask="999,99"
          onChange={(e) => {
            // setPriceCaption(caption);
            setPrice(e.target.value);
          }}
        />
      </FormControl>
      <FormControl label="Estoque" caption={`${quantityCaption}`}>
        <Input
          value={quantity}
          onChange={(e) => {
            const { error } = AMOUNT.validate(
              { quantity },
              { abortEarly: false }
            );
            let caption;
            setQuantity(e.target.value);
            if (error) {
              caption = `${error.message}`;
            } else {
              caption = "";
            }
            setQuantityCaption(caption);
          }}
          placeholder=""
          clearOnEscape
        />
      </FormControl>

      <Block paddingTop="50px" />
      <Button
        kind={KIND.secondary}
        size="compact"
        onClick={() => setCurrentStep(1)}
      >
        Anterior
      </Button>

      <Button
        kind={KIND.primary}
        size="compact"
        onClick={() => setIsOpen(true)}
      >
        Publicar
      </Button>

      <Modal
        onClose={() => setIsOpen(false)}
        closeable
        isOpen={isOpen}
        animate
        autoFocus
        size={SIZE.default}
        role={ROLE.dialog}
        unstable_ModalBackdropScrol
      >
        <ModalHeader>Confirmar publicação de produto</ModalHeader>
        <ModalBody>
          {spinner ? (
            <StyledSpinnerNext />
          ) : (
            "Deseja finalizar a edição e enviar o produto?"
          )}
        </ModalBody>
        <ModalFooter>
          <ModalButton
            kind={ButtonKind.tertiary}
            onClick={() => setIsOpen(false)}
          >
            Cancelar
          </ModalButton>
          <ModalButton onClick={() => setSpinner(true)}>Sim</ModalButton>
        </ModalFooter>
      </Modal>

      {/* <div className={css({ paddingBottom: "24px" })}>
      </div> */}
    </>
  );
}
export default Form;
