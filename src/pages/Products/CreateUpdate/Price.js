import React, { useState, useContext, useEffect } from "react";
import { useStyletron } from "baseui";
import { FormControl } from "baseui/form-control";
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
import { StyledSpinnerNext } from "baseui/spinner";

import AppContext from "../../../context/AppContext";
import {
  category as val_category,
  subCategory as val_subCategoty,
  price as val_price,
} from "./validations";
import { CATEGORYS, SUBCATEGORYS } from "../../../utils/CATEGORYSUBCATEGORYS";
import { Select, SIZE as SSIZE, TYPE } from "baseui/select";

function Price() {
  useEffect(() => {
    console.log("pricec");
    console.log(items);
  }, []);

  const [css, theme] = useStyletron();
  const { setCurrentStep, items, updateItems, post } = useContext(AppContext);

  const [category, setCategory] = useState("");
  const [categoryCaption, setCategoryCaption] = useState("");

  const [subCategory, setSubCategory] = useState("");
  const [subCategoryCaption, setSubCategoryCaption] = useState("");
  const [price, setPrice] = useState("");
  const [priceCaption, setPriceCaption] = useState("");

  const [isOpen, setIsOpen] = useState(false);
  const [spinner, setSpinner] = useState(false);
  const [message, setMessage] = useState(
    "Deseja finalizar a edição e enviar o produto?"
  );

  const handleNext = () => {
    let error = false;
    const _val_category = val_category.validate(
      { category: category[0]?.label },
      { abortEarly: true }
    );
    if (_val_category.error) {
      error = true;
      setCategoryCaption(_val_category.error.details.map((e) => e.message));
    } else {
      setCategoryCaption("");
    }

    const _val_subCategory = val_subCategoty.validate(
      { subCategory: subCategory[0]?.label },
      { abortEarly: true }
    );
    if (_val_subCategory.error) {
      error = true;
      setSubCategoryCaption(
        _val_subCategory.error.details.map((e) => e.message)
      );
    } else {
      setSubCategoryCaption("");
    }

    const _val_price = val_price.validate(
      { price: `${price.replace(",", ".")}` },
      { abortEarly: true }
    );
    if (_val_price.error) {
      error = true;
      // setPriceCaption(_val_price.error.details.map((e) => e.message));
      setPriceCaption("Digite todos os digitos. Ex: 010,05");
    } else {
      setPriceCaption("");
    }

    if (!error) {
      updateItems({
        ...items,
        price: `${price.replace(",", ".")}`,
        category: category[0].label,
        subCategory: subCategory[0].label,
      });
      setIsOpen(true);
    }
  };

  const handlePost = () => {
    setSpinner(true);
    const res = post(items);
    console.log(res);
    setMessage("O seu produto foi enviado");
    setSpinner(false);
  };

  return (
    <>
      <FormControl label="Categoria" caption={`${categoryCaption}`}>
        <Select
          clearable={true}
          closeOnSelect={true}
          searchable={false}
          error={false}
          size={SSIZE.default}
          options={CATEGORYS}
          value={category}
          filterOutSelected
          openOnClick
          required
          type={TYPE.select}
          placeholder="Selecione categoria"
          onChange={(params) => setCategory(params.value)}
        />
      </FormControl>

      <FormControl label="Sub Categoria" caption={`${subCategoryCaption}`}>
        <Select
          clearable={true}
          closeOnSelect={true}
          searchable={false}
          error={false}
          size={SSIZE.default}
          options={SUBCATEGORYS}
          value={subCategory}
          filterOutSelected
          openOnClick
          required
          type={TYPE.select}
          placeholder="Selecione subcategoria"
          onChange={(params) => setSubCategory(params.value)}
        />
      </FormControl>

      <FormControl label="Preço" caption={`${priceCaption}`}>
        <MaskedInput
          value={price}
          startEnhancer="R$"
          placeholder="999,99"
          mask="999,99"
          onChange={(e) => {
            // setPriceCaption(caption);
            setPrice(e.target.value);
          }}
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

      <Button kind={KIND.primary} size="compact" onClick={() => handleNext()}>
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
        unstable_ModalBackdropScroll
      >
        <ModalHeader>Confirmar publicação de produto</ModalHeader>
        <ModalBody>{spinner ? <StyledSpinnerNext /> : null}</ModalBody>
        <ModalFooter>
          <ModalButton
            kind={ButtonKind.tertiary}
            onClick={() => setIsOpen(false)}
          >
            Cancelar
          </ModalButton>
          <ModalButton onClick={() => handlePost()}>Sim</ModalButton>
        </ModalFooter>
      </Modal>
    </>
  );
}
export default Price;
