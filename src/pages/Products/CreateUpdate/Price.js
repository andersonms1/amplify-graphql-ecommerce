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
import { formPrice as SCHEMA } from "./validations";
import { HandleErrors } from "../../../components";
import {
  CATEGORYS as ALL_CAT,
  SUBCATEGORYS as ALL_SUB_CAT,
} from "../../../utils/CATEGORYSUBCATEGORYS";
import InputReplacement from "../../../components/InputReplacement";

function Price({ children }) {
  useEffect(() => {
    console.log("pricec");
    console.log(items);
  }, []);

  const [css] = useStyletron();
  const { setCurrentStep, items, updateItems, post } = useContext(AppContext);

  const [error, setError] = useState(false);
  const [errorDescription, setErrorDescription] = useState("");
  const [errorMsg, setErrorMsg] = useState([]);

  const [categoryCaption, setCategoryCaption] = useState(
    `Digite a categoria e aperte enter, somente categorias cadastradas aceitas. \n ${ALL_CAT.join(
      ", "
    )}`
  );
  const [category, setCategory] = useState("");
  const [categorys, setCategorys] = useState([]);
  const [subCategory, setSubCategory] = useState("");
  const [subCategorys, setSubCategorys] = useState([]);
  const [subCategoryCaption, setSubCategoryCaption] = useState(
    `Digite a categoria e aperte enter, somente categorias cadastradas aceitas.\n ${ALL_SUB_CAT.join(
      ", "
    )}`
  );
  const [price, setPrice] = useState("");
  const [priceCaption, setPriceCaption] = useState(
    "Digite todos os digitos. Ex: 010,25"
  );

  const [isOpen, setIsOpen] = useState(false);
  const [spinner, setSpinner] = useState(false);
  const [message, setMessage] = useState(
    "Deseja finalizar a edição e enviar o produto?"
  );

  const handleNext = () => {
    const _price = `${price.replace(",", ".")}`;
    const validator = SCHEMA.validate(
      {
        category: categorys[0],
        subCategory: subCategorys[0],
        price: parseFloat(_price),
      },
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
      updateItems({
        ...items,
        price: `${price.replace(",", ".")}`,
        category: categorys[0],
        subCategory: subCategorys[0],
      });
      setIsOpen(true);
    }
  };

  const handlePost = () => {
    setSpinner(true);
    post(items);
    setMessage("O seu produto foi enviado");
    setSpinner(false);
  };

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
                removeTag: (tag) => {
                  setCategorys(categorys.filter((t) => t !== tag));
                },
                onKeyDown: (event) => {
                  switch (event.keyCode) {
                    // Enter
                    case 13: {
                      if (!category) return;
                      const filterNotEqual = ALL_CAT.filter(
                        (c) => c != category
                      );
                      if (filterNotEqual.length !== ALL_CAT.length) {
                        setCategorys([category]);
                        setCategory("");
                        setError(false);
                        return;
                      } else {
                        setErrorDescription(
                          "Categoria inválida: Utilize as categorias abaixo"
                        );
                        setErrorMsg(ALL_CAT);
                        setError(true);
                        setCategory("");
                        setCategoryCaption(`${categoryCaption} \n ${ALL_CAT}`);
                        return;
                      }
                    }
                    // Backspace
                    case 8: {
                      if (category || !categorys.length) return;
                      setCategorys(categorys[categorys.length - 1]);
                      return;
                    }
                  }
                },
              },
            },
          }}
        />
      </FormControl>

      <FormControl label="Subcategoria" caption={`${subCategoryCaption}`}>
        <Input
          // placeholder={categorys.length ? "" : "Enter A Tag"}
          value={subCategory}
          onChange={(e) => setSubCategory(e.currentTarget.value.toUpperCase())}
          overrides={{
            Input: {
              component: InputReplacement,
              props: {
                tags: subCategorys,
                removeTag: (tag) =>
                  setSubCategorys(subCategorys.filter((t) => t !== tag)),
                onKeyDown: (event) => {
                  switch (event.keyCode) {
                    // Enter
                    case 13: {
                      if (!subCategory) return;
                      const filterNotEqual = ALL_SUB_CAT.filter(
                        (s) => s != subCategory
                      );
                      if (filterNotEqual.length !== ALL_SUB_CAT.length) {
                        setSubCategorys([subCategory]);
                        setSubCategory("");
                        setError(false);
                        return;
                      } else {
                        setErrorDescription(
                          "SubCategoria inválida: Utilize as subcategorias abaixo"
                        );
                        setErrorMsg(ALL_SUB_CAT);
                        setError(true);
                        setCategory("");
                        return;
                      }
                    }
                    // Backspace
                    case 8: {
                      if (subCategory || !subCategorys.length) return;
                      setCategorys(subCategorys[subCategorys.length - 1]);
                      return;
                    }
                  }
                },
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
        <ModalBody>{spinner ? <StyledSpinnerNext /> : { message }}</ModalBody>
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
