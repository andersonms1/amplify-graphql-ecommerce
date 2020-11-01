import React, { useState, useContext } from "react";
import { useStyletron } from "baseui";
import { FormControl } from "baseui/form-control";
import { Textarea } from "baseui/textarea";
import { Input } from "baseui/input";

import { Button, KIND } from "baseui/button";
import { Block } from "baseui/block";
import {
  formDescription as SCHEMA,
  title as TITLE,
  description as DESCRIPTION,
} from "./validations";

import { HandleErrors } from "../../../components";

import AppContext from "../../../context/AppContext";

function Form({ children }) {
  const { setCurrentStep, items, updateItems } = useContext(AppContext);

  const [error, setError] = useState(false);
  const [errorDescription, setErrorDescription] = useState("");
  const [errorMsg, setErrorMsg] = useState([]);
  const [titleCaption, setTitleCaption] = useState("");
  const [descriptionCaption, setDescriptionCaption] = useState("");
  const [categoryCaption, setCategoryCaption] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleNext = () => {
    const validator = SCHEMA.validate(
      { title, description },
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
      updateItems({ ...items, title, description });
      setCurrentStep(2);
    }
  };

  return (
    <>
      {HandleErrors(error, errorDescription, errorMsg)}
      <FormControl label="Título" caption={`${titleCaption}`}>
        <Input
          id="input"
          value={items.title ? items.title : title}
          onChange={(e) => {
            const { error } = TITLE.validate({ title }, { abortEarly: false });
            let caption;

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
          value={items.description ? items.description : description}
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

      <Block paddingTop="50px" />
      <Button
        kind={KIND.secondary}
        size="compact"
        onClick={() => setCurrentStep(0)}
      >
        Anterior
      </Button>

      <Button kind={KIND.primary} size="compact" onClick={() => handleNext()}>
        Próximo
      </Button>
    </>
  );
}

export default Form;
