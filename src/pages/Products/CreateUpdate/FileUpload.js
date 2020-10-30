import React, { useState, useContext } from "react";
import { useStyletron } from "baseui";
import { FileUploader } from "baseui/file-uploader";
import { List, arrayMove, arrayRemove } from "baseui/dnd-list";
import { FormControl } from "baseui/form-control";
import { Button, KIND } from "baseui/button";
import { Block } from "baseui/block";
import _ from "lodash";

import { HandleErrors } from "../../../components";

import AppContext from "../../../context/AppContext";

function FileUpload({ children }) {
  const [css, theme] = useStyletron();
  const [position, setPosition] = useState(0);

  const [errorMsg, setErrorMsg] = useState("");
  const [errorDescription, setErrorDescription] = useState("");
  const [error, setError] = useState(false);

  const { items, updateItems, setCurrentStep } = useContext(AppContext);

  return (
    <>
      {HandleErrors(error, errorDescription, errorMsg)}
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
            (f) => {
              if (f.name.length < 30) {
                setError(false);
                return true;
              } else {
                setErrorMsg(`${f.name.slice(0, 19)}...`);
                setErrorDescription(
                  "Arquivo com nome muito grande. Máximo aceito é de 30 caracteres"
                );
                setError(true);
                return false;
              }
            }
          );

          if (rejectedFiles.length) {
            setErrorDescription("Apenas fotos são aceitas.");
            setErrorMsg(`${rejectedFiles[0]["path"].slice(0, 19)}...`);
            setError(true);
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
      {items.length ? (
        <Block paddingTop="50px">
          <Button
            kind={KIND.primary}
            size="compact"
            onClick={() => setCurrentStep(1)}
          >
            Próximo
          </Button>
        </Block>
      ) : null}
    </>
  );
}

export default FileUpload;
