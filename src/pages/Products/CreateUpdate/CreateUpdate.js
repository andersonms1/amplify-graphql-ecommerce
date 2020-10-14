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

import { ProductContext } from "../../../context/product";

import FileUpload from "./FileUpload";
import Form from "./Form";

// import Storage from "@aws-amplify/storage";
// import API, { graphqlOperation } from "@aws-amplify/api";
// import { createProduct } from "../../graphql/mutations";

const CreateUpdate = (props) => {
  const [css, theme] = useStyletron();

  const [modalConfirm, setModalConfirm] = useState(false);

  const context = useContext(ProductContext);

  const isLarge = useMediaQuery({
    query: `(min-width: ${theme.breakpoints.large}px)`,
  });

  const button = css({
    width: "100%",
  });

  const renderNextPrevButtons = (isValid) => {
    return (
      <>
        {isValid && (
          <>
            <Block paddingTop="50px" />

            {context.current === 0 ? null : (
              <Button
                kind={KIND.secondary}
                size="compact"
                onClick={() => context.setCurrentStep(context.current - 1)}
              >
                Anterior
              </Button>
            )}
            <Button
              kind={KIND.primary}
              size="compact"
              onClick={() => context.setCurrentStep(context.current + 1)}
            >
              Próximo
            </Button>
          </>
        )}
      </>
    );
  };

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
            <FileUpload></FileUpload>
          </NumberedStep>
          <NumberedStep title="Descrição">
            <Form></Form>
          </NumberedStep>
          <NumberedStep title="Confirmação">
            <FormControl label="Finalizar">
              <>
                <Modal
                  onClose={() => setModalConfirm(false)}
                  closeable
                  isOpen={modalConfirm}
                  animate
                  autoFocus
                  size={SIZE.default}
                  role={ROLE.dialog}
                  unstable_ModalBackdropScroll
                >
                  <ModalHeader>Confirmação de publicação</ModalHeader>
                  <ModalBody>Deseja publicar o producto?</ModalBody>
                  <ModalFooter>
                    <ModalButton
                      onClick={() => setModalConfirm(false)}
                      kind={KIND.tertiary}
                    >
                      Não
                    </ModalButton>
                    <ModalButton
                      onClick={() => {
                        console.log("sim");
                      }}
                    >
                      Sim
                    </ModalButton>
                  </ModalFooter>
                </Modal>

                <Button
                  className={button}
                  endEnhancer={() => <Upload size={24} />}
                  onClick={() => setModalConfirm(true)}
                >
                  Publicar produto
                </Button>
                <Block marginBottom="scale300" />
                <Button
                  className={button}
                  kind={KIND.secondary}
                  onClick={() => context.setCurrentStep(context.current - 1)}
                  endEnhancer={() => <Delete size={24} />}
                >
                  Voltar
                </Button>
              </>
            </FormControl>
          </NumberedStep>
        </ProgressSteps>
      </div>
    </>
  );
};
export default CreateUpdate;
