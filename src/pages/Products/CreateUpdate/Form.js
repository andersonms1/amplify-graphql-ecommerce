import React, { useState, useContext } from "react";
import { useStyletron } from "baseui";
import { FormControl } from "baseui/form-control";
import { Textarea } from "baseui/textarea";
import { Combobox } from "baseui/combobox";
import { Input, MaskedInput } from "baseui/input";

import { Button, KIND } from "baseui/button";
import { Block } from "baseui/block";
import {
  schema as SCHEMA,
  title as TITLE,
  description as DESCRIPTION,
  category as CATEGORY,
  quantity as AMOUNT,
  // photos as PHOTOS,
  price as PRICE,
} from "./validations";

import { HandleErrors } from "../../../components";

import AppContext from "../../../context/AppContext";

function Form({ children }) {
  const { setCurrentStep } = useContext(AppContext);
  const [css, theme] = useStyletron();

  const [error, setError] = useState(false);
  const [errorDescription, setErrorDescription] = useState("");
  const [errorMsg, setErrorMsg] = useState([]);
  const [titleCaption, setTitleCaption] = useState("");
  const [descriptionCaption, setDescriptionCaption] = useState("");
  const [categoryCaption, setCategoryCaption] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [priceCaption, setPriceCaption] = useState(
    "Digite todos os digitos. Ex: 010,25"
  );
  const [quantityCaption, setQuantityCaption] = useState("");
  const [quantity, setQuantity] = useState("");
  const data = {
    title,
    description,
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

  // const save = async (items) => {
  //   console.log(
  //     `title: ${title}, description: ${description}, section: ${category}, `
  //   );

  // const { error } = SCHEMA.validate(data, {
  //   abortEarly: false,
  // });

  //   await context.post(items, data);
  // };

  const validateNext = () => {
    const validator = SCHEMA.validate(
      { title, description, category },
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

  return (
    <>
      {HandleErrors(error, errorDescription, errorMsg)}
      <FormControl label="Título" caption={`${titleCaption}`}>
        <Input
          id="input"
          value={title}
          onChange={(e) => {
            const { error } = TITLE.validate({ title }, { abortEarly: false });
            let caption;
            // for (var key of TITLE._ids._byKey.keys()) {
            //   console.log(key);
            //   type = key;
            // }

            // for (var value of TITLE._ids._byKey.values()) {
            //   console.log(value.id);
            // }
            setTitle(e.target.value);
            if (error) {
              caption = `${error.message}`;
            } else {
              caption = "";
            }
            setTitleCaption(caption);
          }}
          placeholder=""
          clearOnEscape
        />
      </FormControl>
      <FormControl label="Descrição" caption={`${descriptionCaption}`}>
        <Textarea
          id="textarea-id"
          value={description}
          onChange={(e) => {
            const { error } = DESCRIPTION.validate(
              { description },
              { abortEarly: false }
            );
            let caption;
            setDescription(e.target.value);
            if (error) {
              caption = `${error.message}`;
            } else {
              caption = "";
            }
            setDescriptionCaption(caption);
          }}
        />
      </FormControl>
      <FormControl label="Categoria" caption={`${categoryCaption}`}>
        <Combobox
          value={category}
          onChange={(nextValue) => {
            const { error } = CATEGORY.validate(
              { category },
              { abortEarly: false }
            );
            let caption;
            setCategory(nextValue);
            if (error) {
              caption = `${error.message}`;
            } else {
              caption = "";
            }
            // setCategoryCaption(caption);
          }}
          options={[
            { label: "Masculino", id: "#F0F8FF" },
            { label: "Feminino", id: "#FAEBD7" },
            { label: "Infantil", id: "#00FFFF" },
          ]}
          mapOptionToString={(option) => option.label}
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
            // for (var key of TITLE._ids._byKey.keys()) {
            //   console.log(key);
            //   type = key;
            // }

            // for (var value of TITLE._ids._byKey.values()) {
            //   console.log(value.id);
            // }
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
        onClick={() => setCurrentStep(0)}
      >
        Anterior
      </Button>

      <Button kind={KIND.primary} size="compact" onClick={() => validateNext()}>
        Publicar
      </Button>

      {/* </div> */}
      {/* {items ? children : null} */}
    </>
  );
}

export default Form;
