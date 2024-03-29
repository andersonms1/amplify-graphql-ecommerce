import React, { useState, useContext, useEffect } from "react";
import { useStyletron } from "baseui";
import { Button, KIND } from "baseui/button";
import { Block } from "baseui/block";

import { ProgressSteps, NumberedStep } from "baseui/progress-steps";
import { Grid, Cell } from "baseui/layout-grid";
import { useMediaQuery } from "react-responsive";

import AppContext from "../../../context/AppContext";

import FileUpload from "./FileUpload";
import Title from "./Title";
import Price from "./Price";
import Inventory from "./Inventory";

import { currentProductPage } from "../../../context/types";
import { getItem } from "../../../utils/localStorage";

// import Storage from "@aws-amplify/storage";
// import API, { graphqlOperation } from "@aws-amplify/api";
// import { createProduct } from "../../graphql/mutations";

const CreateUpdate = (props) => {
  const [css, theme] = useStyletron();

  const [modalConfirm, setModalConfirm] = useState(false);

  const { setCurrentStep, current } = useContext(AppContext);

  const isLarge = useMediaQuery({
    query: `(min-width: ${theme.breakpoints.large}px)`,
  });

  const button = css({
    width: "100%",
  });

  useEffect(() => {
    const _currentProductPage = parseInt(getItem(currentProductPage));
    console.log(_currentProductPage);
    if (_currentProductPage) {
      setCurrentStep(_currentProductPage);
    }
    // setCurrentStep(1);
  }, []);

  return (
    <div>
      <ProgressSteps current={current}>
        <NumberedStep title="Enviar fotos">
          <FileUpload />
        </NumberedStep>
        <NumberedStep title="Descrição">
          <Title />
        </NumberedStep>
        <NumberedStep title="Estoque">
          <Inventory />
        </NumberedStep>
        <NumberedStep title="Preços">
          <Price />
        </NumberedStep>
      </ProgressSteps>
    </div>
  );
};
export default CreateUpdate;
