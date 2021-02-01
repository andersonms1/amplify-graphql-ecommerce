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
import { getObj, removeAny } from "../../../utils/localStorage";
import { items as tp_items, currentProductPage } from "../../../context/types";
import { useHistory } from "react-router-dom";
import { H2, H4 } from "baseui/typography";
function Price() {
  const [css, theme] = useStyletron();
  const { setCurrentStep, items, updateItems, post, current } = useContext(
    AppContext
  );

  const [category, setCategory] = useState("");
  const [categoryCaption, setCategoryCaption] = useState("");

  const [subCategory, setSubCategory] = useState("");
  const [subCategoryCaption, setSubCategoryCaption] = useState("");
  const [price, setPrice] = useState("");
  const [priceCaption, setPriceCaption] = useState("");

  const [confirmModal, setConfirmModal] = useState(false);
  const [loadModal, setLoadModal] = useState(false);
  const [spinner, setSpinner] = useState(false);

  const [isPostSuccessed, setIsPostSuccessed] = useState(false);
  let history = useHistory();
  useEffect(() => {
    const init = getObj(tp_items);
    console.log(init);
    console.log(items);
    updateItems(init);
    init.price && setPrice(init.price);

    console.log(items);
  }, [current]);

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
      setConfirmModal(true);
    }
  };

  const handlePost = async () => {
    setSpinner(true);
    setLoadModal(true);
    const res = await Promise.resolve(post(items));

    if (res?.data?.createProduct === null) {
      setIsPostSuccessed(false);
    } else {
      setIsPostSuccessed(true);
    }
    console.log(res.data);
    setSpinner(false);
    console.log(res.data);
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
          onChange={(params) => {
            setCategory(params.value);
            console.log(params);
          }}
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
        onClick={() => {
          setCurrentStep(2);
        }}
      >
        Anterior
      </Button>

      <Button kind={KIND.primary} size="compact" onClick={() => handleNext()}>
        Publicar
      </Button>

      <Modal
        onClose={() => setConfirmModal(false)}
        closeable
        isOpen={confirmModal}
        animate
        autoFocus
        size={SIZE.default}
        role={ROLE.dialog}
        unstable_ModalBackdropScroll
      >
        <ModalHeader>Confirmar publicação de produto</ModalHeader>
        <ModalBody>Deseja finalizar a edição e enviar o produto?</ModalBody>
        <ModalFooter>
          <ModalButton
            kind={ButtonKind.tertiary}
            onClick={() => setConfirmModal(false)}
          >
            Cancelar
          </ModalButton>
          <ModalButton
            onClick={() => {
              handlePost();
              setConfirmModal(false);
            }}
          >
            Sim
          </ModalButton>
        </ModalFooter>
      </Modal>

      <Modal
        onClose={() => setLoadModal(false)}
        closeable
        isOpen={loadModal}
        animate
        autoFocus
        size={SIZE.default}
        role={ROLE.dialog}
        unstable_ModalBackdropScroll
      >
        <ModalHeader>Enviando produto</ModalHeader>
        <ModalBody>
          {spinner ? (
            <StyledSpinnerNext />
          ) : isPostSuccessed ? (
            <H4>O seu producto foi publicado!</H4>
          ) : (
            <H4>ERRO: O seu produto não foi publicado</H4>
          )}
        </ModalBody>
        <ModalFooter>
          <ModalButton
            onClick={() => {
              setLoadModal(false);
              removeAny(tp_items);
              removeAny(currentProductPage);
              history.push("/");
            }}
          >
            OK
          </ModalButton>
        </ModalFooter>
      </Modal>
    </>
  );
}
export default Price;
