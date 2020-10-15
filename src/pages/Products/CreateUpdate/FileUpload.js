import React, { useState, useContext } from "react";
import { FileUploader } from "baseui/file-uploader";
import { List, arrayMove, arrayRemove } from "baseui/dnd-list";
import { FormControl } from "baseui/form-control";
import { productCreateButtons } from "../../../utils";
import _ from "lodash";

import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalButton,
  SIZE,
  ROLE,
} from "baseui/modal";
import { KIND } from "baseui/button";

import AppContext from "../../../context/AppContext";
import { productErrorModal } from "../../../utils";
import ProductErrorModal from "../../../components/ProductErrorModal";

import { useStyletron } from "baseui";
import Check from "baseui/icon/check";
import Delete from "baseui/icon/delete";
import DeleteAlt from "baseui/icon/delete-alt";
// import { SnackbarElement } from "baseui/snackbar";
// import { SnackbarProvider, useSnackbar, PLACEMENT } from "baseui/snackbar";

function FileUpload({ children }) {
  const [position, setPosition] = useState(0);
  const [error, setError] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const { items, updateItems } = useContext(AppContext);

  const funcAsArgs = () => {
    console.log("debug!");
  };

  const handleErrors = (acFiles, rjFiles, items) => {};

  const handleModal = (title, error) => {
    return (
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
        <ModalHeader>{title}</ModalHeader>
        <ModalBody>{error}</ModalBody>
        <ModalFooter>
          <ModalButton onClick={() => setIsOpen(false)} kind={KIND.tertiary}>
            Entendi
          </ModalButton>
        </ModalFooter>
      </Modal>
    );
  };

  return (
    <div>
      <FormControl label="Fotos">
        {items && (
          <List
            items={items.map((item, index) => {
              return item.name;
            })}
            removable
            removableByMove
            onChange={({ oldIndex, newIndex }) => {
              setPosition(position + 1);
              console.log(newIndex);

              updateItems(
                newIndex === -1
                  ? arrayRemove(items, oldIndex)
                  : arrayMove(items, oldIndex, newIndex)
              );
            }}
            overrides={{
              Item: {
                style: {
                  display: "flex",
                  flexWrap: "wrap",
                  paddingLeft: "0px",
                  paddingRight: "0px",
                  paddingTop: "0px",
                  paddingBottom: "0px",
                },
              },
              // DragHandle: dragHandle(position),
            }}
          />
        )}
      </FormControl>
      <FileUploader
        onCancel={null}
        aria-describedby={null}
        name={null}
        accept="image/*"
        onDrop={(acceptedFiles, rejectedFiles) => {
          const errorImg = [];
          setIsOpen(false);
          const aFiles = acceptedFiles.filter(
            /* f.position = index;
            not need to set position
            by some witchcraft is set automatic */
            (f) => {
              if (f.name.length < 30) {
                return true;
              } else {
                setError(error + " " + f.name);
                errorImg.push(f.name);
                productErrorModal("Error na validação do arquivo", f.name);

                // setError(`${error} ${f.name}`);
                return false;
              }
            }
          );
          console.log(error);
          if (error) {
            setIsOpen(true);
          }

          // if (isError.length) {
          //   // setError(isError);
          //   setError(`${isError.map((e) => e)} `);
          //   setIsOpen(true);
          //   setError(true);
          // }
          // if (aFiles.length !== acceptedFiles.length) {
          //   const e = _.difference(acceptedFiles, aFiles);

          //   setError(
          //     `O nome do arquivo não pode ser maior que 30 caracteres: ${_.difference(
          //       acceptedFiles,
          //       aFiles
          //     )}`
          //   );
          //   setIsOpen(true);
          // }

          if (rejectedFiles.length) {
            console.log(rejectedFiles);
            productErrorModal("RF", "RF");
            setError(`Você não enviou uma foto? ${rejectedFiles}`);
            setIsOpen(true);
          }

          if (items.length) {
            updateItems(_.union(items, aFiles));
          } else {
            updateItems(aFiles);
          }
          try {
          } catch (e) {
            console.log(e);
          }
        }}
      />
      {/* {ProductErrorModal(isOpen, "Error na validação do arquivo", `${error}`)} */}
      {productCreateButtons(0, true, funcAsArgs)}
    </div>
  );
}

export default FileUpload;
