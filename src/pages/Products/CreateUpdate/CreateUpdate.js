import React, { useState, useContext } from "react";
import { useStyletron } from "baseui";
import { Button, KIND } from "baseui/button";
import { Block } from "baseui/block";
import { Upload, Delete } from "baseui/icon";

import { FormControl } from "baseui/form-control";
import { ProgressSteps, NumberedStep } from "baseui/progress-steps";
import { useMediaQuery } from "react-responsive";
import Header from "../../Home/Header";
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalButton,
  SIZE,
  ROLE,
} from "baseui/modal";

// import { ProductContext } from "../../../context/product";
import AppContext from "../../../context/AppContext";

import FileUpload from "./FileUpload";
import Form from "./Form";

// import Storage from "@aws-amplify/storage";
// import API, { graphqlOperation } from "@aws-amplify/api";
// import { createProduct } from "../../graphql/mutations";

const CreateUpdate = (props) => {
  const [css, theme] = useStyletron();

  const [modalConfirm, setModalConfirm] = useState(false);

  const context = useContext(AppContext);

  const isLarge = useMediaQuery({
    query: `(min-width: ${theme.breakpoints.large}px)`,
  });

  const button = css({
    width: "100%",
  });

  return (
    <>
      <Header />
      <div
        className={css({
          display: "flex",
          flexDirection: isLarge ? "row" : "column",
          // width: isLarge ? "25vw" : "100%",
        })}
      >
        <ProgressSteps current={context.current}>
          <NumberedStep title="Enviar fotos">
            <FileUpload />
          </NumberedStep>
          <NumberedStep title="Descrição">
            <Form />
          </NumberedStep>
        </ProgressSteps>
      </div>
    </>
  );
};
export default CreateUpdate;
