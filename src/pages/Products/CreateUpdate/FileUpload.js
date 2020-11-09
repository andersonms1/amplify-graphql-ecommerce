import React, { useState, useContext, useEffect } from "react";
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
  const [files, setFiles] = useState([]);

  const { items, updateItems, setCurrentStep, post } = useContext(AppContext);

  useEffect(() => {
    items.files && setFiles(items.files);
  }, []);

  // useEffect(() => {
  //   post(items);
  // }, [items]);

  return (
    <>
      {HandleErrors(error, errorDescription, errorMsg)}
      <FormControl label="Fotos">
        {files && (
          <List
            items={files.map((item, index) => {
              return item.name;
            })}
            removable
            removableByMove
            onChange={({ oldIndex, newIndex }) => {
              setPosition(position + 1);
              console.log(newIndex);

              setFiles(
                newIndex === -1
                  ? arrayRemove(files, oldIndex)
                  : arrayMove(files, oldIndex, newIndex)
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

          if (files.length) {
            setFiles(_.union(files, aFiles));
          } else {
            setFiles(aFiles);
          }
          try {
          } catch (e) {
            console.log(e);
          }
        }}
      />
      {files.length ? (
        <Block paddingTop="50px">
          <Button
            kind={KIND.primary}
            size="compact"
            onClick={() => {
              updateItems({ files });
              setCurrentStep(1);
            }}
          >
            Próximo
          </Button>
        </Block>
      ) : null}
    </>
  );
}

export default FileUpload;
