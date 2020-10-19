import React, { useContext } from "react";
import { useStyletron } from "baseui";
import { FormControl } from "baseui/form-control";
import { Textarea } from "baseui/textarea";
import { Combobox } from "baseui/combobox";
import { Input } from "baseui/input";

import { Button, KIND } from "baseui/button";
import { Block } from "baseui/block";
import {
  schema as SCHEMA,
  title as TITLE,
  description as DESCRIPTION,
  category as CATEGORY,
  amount as AMOUNT,
  photos as PHOTOS,
  price as PRICE,
} from "./validations";

import AppContext from "../../../context/AppContext";

function Form({ children }) {
  const { setCurrentStep } = useContext(AppContext);
  const [css, theme] = useStyletron();

  const [titleCaption, setTitleCaption] = React.useState("");
  const [descriptionCaption, setDescriptionCaption] = React.useState("");
  const [categoryCaption, setCategoryCaption] = React.useState("");
  const [title, setTitle] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [category, setCategory] = React.useState("");

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

  //   const { error } = SCHEMA.validate(data, {
  //     abortEarly: false,
  //   });

  //   await context.post(items, data);
  // };

  return (
    <div>
      <div className={css({ flexGrow: 1, flexShrink: 1 })}>
        <FormControl label="Título" caption={`${titleCaption}`}>
          <Input
            id="input"
            value={title}
            onChange={(e) => {
              const { error } = TITLE.validate(
                { title },
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
      </div>
      {/* {items ? children : null} */}
      <Block paddingTop="50px" />
      <Button
        kind={KIND.secondary}
        size="compact"
        onClick={() => setCurrentStep(0)}
      >
        Anterior
      </Button>

      <Button
        kind={KIND.primary}
        size="compact"
        onClick={() => setCurrentStep(2)}
      >
        Próximo
      </Button>
    </div>
  );
}

export default Form;
