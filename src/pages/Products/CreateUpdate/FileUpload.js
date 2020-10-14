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

import { ProductContext } from "../../../context/product";
import AppContext from "../../../context/AppContext";

function FileUpload({ children }) {
  // const [items, f] = useState([]);
  const [position, setPosition] = useState(0);
  const [erroPhotos, setErroPhotos] = useState("");
  const [modalPhotos, setModalPhotos] = useState(false);

  // const context = useContext(ProductContext);
  const { items, updateItems } = useContext(AppContext);
  // const { items } = useContext(ProductContext);
  // const [items, updateItems] = useState([]);

  const funcAsArgs = () => {
    console.log("debug!");
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
          const aFiles = acceptedFiles.filter(
            /* f.position = index;
            not need to set position
            by some witchcraft is set automatic */
            (f) => f.name.length < 30
          );

          if (aFiles.length !== acceptedFiles.length) {
            console.log(aFiles);
            setErroPhotos(
              `O nome do arquivo não pode ser maior que 30 caracteres: ${_.difference(
                acceptedFiles,
                aFiles
              )}`
            );
            setModalPhotos(true);
          }

          if (rejectedFiles.length) {
            console.log(rejectedFiles);
            setErroPhotos(`Você não enviou uma foto? ${rejectedFiles}`);
            setModalPhotos(true);
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

      {productCreateButtons(0, true, funcAsArgs)}

      <Modal
        onClose={() => setModalPhotos(false)}
        closeable
        isOpen={modalPhotos}
        animate
        autoFocus
        size={SIZE.default}
        role={ROLE.dialog}
        unstable_ModalBackdropScroll
      >
        <ModalHeader>Erro de envio de fotos</ModalHeader>
        <ModalBody>{erroPhotos}</ModalBody>
        <ModalFooter>
          <ModalButton
            onClick={() => setModalPhotos(false)}
            kind={KIND.tertiary}
          >
            Entendi
          </ModalButton>
        </ModalFooter>
      </Modal>
    </div>
  );
}

export default FileUpload;
