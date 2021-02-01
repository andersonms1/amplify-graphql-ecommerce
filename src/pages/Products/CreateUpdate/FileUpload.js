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
import { items as tp_items } from "../../../context/types";
import { getObj } from "../../../utils/localStorage";

function FileUpload({ children }) {
  const [css, theme] = useStyletron();
  const [position, setPosition] = useState(0);

  const [errorMsg, setErrorMsg] = useState("");
  const [errorDescription, setErrorDescription] = useState("");
  const [error, setError] = useState(false);
  const [files, setFiles] = useState([]);

  const {
    setCurrentStep,
    uploadPhotos,
    updateItems,
    current,
    items,
  } = useContext(AppContext);

  useEffect(() => {
    const init = getObj(tp_items);

    updateItems(init);
  }, [current]);

  return (
    <>
      {HandleErrors(error, errorDescription, errorMsg)}
      <FormControl label="Fotos">
        {files && (
          <List
            items={files.map((item, index) => {
              if (item.name.length < 30) {
                return item.name;
              } else {
                return item.name.slice(0, 19);
              }
            })}
            removable
            // removableByMove
            onChange={({ oldIndex, newIndex }) => {
              setPosition(position + 1);

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
          if (rejectedFiles.length) {
            setErrorDescription("Apenas fotos são aceitas.");
            setErrorMsg(`${rejectedFiles[0]["path"].slice(0, 19)}...`);
            setError(true);
          }

          if (files.length) {
            setFiles(_.union(files, acceptedFiles));
          } else {
            setFiles(acceptedFiles);
          }
          try {
          } catch (e) {
            console.log(e);
          }
        }}
      />
      {files.length || items?.photos?.length ? (
        <Block paddingTop="50px">
          <Button
            kind={KIND.primary}
            size="compact"
            onClick={() => {
              uploadPhotos(files);
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
