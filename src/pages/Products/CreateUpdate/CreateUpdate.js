import React, { useState, useContext } from "react";
import { useStyletron } from "baseui";
import { Button, KIND } from "baseui/button";
import { Block } from "baseui/block";

import { ProgressSteps, NumberedStep } from "baseui/progress-steps";
import { Grid, Cell } from "baseui/layout-grid";
import { useMediaQuery } from "react-responsive";
import Header from "../../Home/Header";

import AppContext from "../../../context/AppContext";

import FileUpload from "./FileUpload";
import Form from "./Form";
import FormPrice from "./FormPrice";

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
    <Grid>
      <Cell span={[6, 8, 12]}>
        <Header />
        {/* <div
        className={css({
          display: "flex",
          flexDirection: isLarge ? "row" : "column",
        })}
      > */}
        <ProgressSteps current={context.current}>
          <NumberedStep title="Enviar fotos">
            <FileUpload />
          </NumberedStep>
          <NumberedStep title="Descrição">
            <Form />
          </NumberedStep>
          <NumberedStep title="Preços">
            <FormPrice />
          </NumberedStep>
        </ProgressSteps>
        {/* </div> */}
      </Cell>
    </Grid>
  );
};
export default CreateUpdate;
