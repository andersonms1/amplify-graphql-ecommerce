import React, { useState, useContext, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useStyletron } from "baseui";
import { Button, KIND } from "baseui/button";
import { Block } from "baseui/block";
import { Upload, Delete } from "baseui/icon";
import { Combobox } from "baseui/combobox";
import { Input } from "baseui/input";
import { FormControl } from "baseui/form-control";
import { Textarea } from "baseui/textarea";
import { FileUploader } from "baseui/file-uploader";
import { List, arrayMove, arrayRemove } from "baseui/dnd-list";
import _ from "lodash";
import { ProductContext } from "../../context/products";

// import Storage from "@aws-amplify/storage";
// import API, { graphqlOperation } from "@aws-amplify/api";
// import { createProduct } from "../../graphql/mutations";
import {
  schema as SCHEMA,
  title as TITLE,
  description as DESCRIPTION,
  category as CATEGORY,
  amount as AMOUNT,
  photos as PHOTOS,
  price as PRICE,
} from "./validations";

export default (props) => {
  const [css, theme] = useStyletron();

  const [items, setItems] = React.useState([]);
  const [title, setTitle] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [category, setCategory] = React.useState("");

  const [itemsCaption, setItemsCaption] = React.useState("");
  const [titleCaption, setTitleCaption] = React.useState("");
  const [descriptionCaption, setDescriptionCaption] = React.useState("");
  const [categoryCaption, setCategoryCaption] = React.useState("");
  const { post } = useContext(ProductContext);

  const data = {
    title,
    description,
    category,
    amount: 10,
    price: { specie: 10, cents: 10 },
    photos: [
      {
        bucket: "ecommerce-images-product101337-dev",
        position: 0,
        key: "images/456d578b-b797-4a53-825f-bc621c01c2d9crop-ahmed-carter.jpg",
        region: "us-east-1",
      },
    ],
  };
  const button = css({
    width: "25vw",
  });

  const save = async (items) => {
    console.log(
      `title: ${title}, description: ${description}, section: ${category}, `
    );

    const { error } = SCHEMA.validate(data, {
      abortEarly: false,
    });

    await post(items, data);
  };

  return (
    <div>
      <div style={{ width: "25vw" }}>
        <FormControl label="Fotos">
          <List
            items={items.map((i) => i.name)}
            removable
            removableByMove
            onChange={({ oldIndex, newIndex }) => {
              setItems(
                newIndex === -1
                  ? arrayRemove(items, oldIndex)
                  : arrayMove(items, oldIndex, newIndex)
              );
            }}
          />
        </FormControl>
        <FileUploader
          onCancel={null}
          aria-describedby="Testee?"
          name="Name"
          onDrop={(acceptedFiles, rejectedFiles) => {
            try {
              const arr = acceptedFiles.map((f, index) => {
                // console.log(index);
                // f.position = index;
                //not need to set position
                // by some witchcraft is set automatic
                return f;
              });
              console.log(arr);
              if (items.length) {
                setItems(_.union(items, arr));
              } else {
                setItems(arr);
              }
            } catch (e) {
              console.log(e);
            }
          }}
          progressMessage={false ? `Uploading... hang tight.` : ""}
        />
      </div>
      <div style={{ width: "25vw" }}>
        <FormControl label="Título" caption={`${titleCaption}`}>
          <Input
            id="input"
            value={title}
            onChange={(e) => {
              const { error } = TITLE.validate(
                { title },
                { abortEarly: false }
              );
              let caption;
              // for (var key of TITLE._ids._byKey.keys()) {
              //   console.log(key);
              //   type = key;
              // }

              // for (var value of TITLE._ids._byKey.values()) {
              //   console.log(value.id);
              // }
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
            value={description}
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
        <FormControl label="Categoria" caption={`${categoryCaption}`}>
          <Combobox
            value={category}
            onChange={(nextValue) => {
              const { error } = CATEGORY.validate(
                { category },
                { abortEarly: false }
              );
              let caption;
              setCategory(nextValue);
              if (error) {
                caption = `${error.message}`;
              } else {
                caption = "";
              }
              // setCategoryCaption(caption);
            }}
            options={[
              { label: "Masculino", id: "#F0F8FF" },
              { label: "Feminino", id: "#FAEBD7" },
              { label: "Infantil", id: "#00FFFF" },
            ]}
            mapOptionToString={(option) => option.label}
          />
        </FormControl>

        <FormControl label="Finalizar">
          <>
            <Button
              className={button}
              endEnhancer={() => <Upload size={24} />}
              onClick={() => save(items)}
            >
              Publicar produto
            </Button>
            <Block marginBottom="scale300" />
            <Button
              className={button}
              kind={KIND.secondary}
              endEnhancer={() => <Delete size={24} />}
            >
              Cancelar
            </Button>
          </>
        </FormControl>
      </div>
    </div>
  );
};
