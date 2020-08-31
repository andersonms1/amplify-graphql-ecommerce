import React from "react";
import { useStyletron } from "baseui";
import { Button, KIND } from "baseui/button";
import { Block } from "baseui/block";
import { Link, useParams } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
import { Breadcrumbs } from "baseui/breadcrumbs";
import { Paragraph1, Display4 } from "baseui/typography";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import { Upload, Delete } from "baseui/icon";
import { Combobox } from "baseui/combobox";
import { Input } from "baseui/input";
import { FormControl } from "baseui/form-control";
import { Textarea } from "baseui/textarea";
import { FileUploader } from "baseui/file-uploader";
import { List, arrayMove, arrayRemove } from "baseui/dnd-list";
import { v4 as uuidv4 } from "uuid";
import _ from "lodash";
import config from "../../aws-exports";
import Auth from "@aws-amplify/auth";
import Storage from "@aws-amplify/storage";
import API, { graphqlOperation } from "@aws-amplify/api";
import { createProduct } from "../../graphql/mutations";
// import Joi from "joi";

import { PHOTO_AHMED, PHOTO_HILL } from "../../assets/imgs";
import {
  schema as SCHEMA,
  title as TITLE,
  description as DESCRIPTION,
  category as CATEGORY,
  amount as AMOUNT,
  photos as PHOTOS,
  price as PRICE,
} from "./validations";

const {
  aws_user_files_s3_bucket_region: region,
  aws_user_files_s3_bucket: bucket,
} = config;

function Details() {
  let { id } = useParams();
  const [css, theme] = useStyletron();
  const [items, setItems] = React.useState([]);
  const [title, setTitle] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [category, setCategory] = React.useState("");
  const [photos, setPhotos] = React.useState([]);

  const [itemsCaption, setItemsCaption] = React.useState("");
  const [titleCaption, setTitleCaption] = React.useState("");
  const [descriptionCaption, setDescriptionCaption] = React.useState("");
  const [categoryCaption, setCategoryCaption] = React.useState("");

  const container = css({
    display: "flex",
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-evenly",
    marginRight: "20vw",
    marginLeft: "20vw",
  });

  const details = css({
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
  });

  const button = css({
    width: "25vw",
  });

  const getConfigurableProps = () => ({
    autoPlay: true,
    infiniteLoop: true,
    swipeable: true,
    showThumbs: false,
    showIndicators: true,
    showStatus: false,
    // interval: 3000,
    // showArrows: boolean('showArrows', true, tooglesGroupId),
    // useKeyboardArrows: boolean('useKeyboardArrows', true, tooglesGroupId),
    // stopOnHover: boolean('stopOnHover', true, tooglesGroupId),
    // dynamicHeight: boolean('dynamicHeight', true, tooglesGroupId),
    // emulateTouch: boolean('emulateTouch', true, tooglesGroupId),
    // thumbWidth: number('thumbWidth', 100, {}, valuesGroupId),
    // selectedItem: number('selectedItem', 0, {}, valuesGroupId),
    // transitionTime: number('transitionTime', 150, {}, valuesGroupId),
    // swipeScrollTolerance: number('swipeScrollTolerance', 5, {}, valuesGroupId),
  });

  const data = {
    title,
    description,
    category,
    amount: 10,
    price: { specie: 10, cents: 10 },
    // photos: [
    //   {
    //     bucket: "asdfad",
    //     region: "dafdfa",
    //     key: "asdfasdf",
    //     position: "adfadf",
    //   },
    // ],
  };

  React.useEffect(() => {
    async function getUser() {
      try {
        let user = await Auth.currentAuthenticatedUser();
        console.log(user);
      } catch (error) {
        console.log("error: ", error);
      }
    }
    getUser();
  }, []);

  const save = async (files) => {
    console.log(
      `title: ${title}, description: ${description}, section: ${category}, `
    );

    const { error } = SCHEMA.validate(data, {
      abortEarly: false,
    });

    files.map(async (file) => {
      try {
        const extension = file.name.split(".")[1];
        const name = file.name.split(".")[0];
        const key = `images/${uuidv4()}${name}.${extension}`;
        const url = `https://${bucket}.s3.${region}.amazonaws.com/public/${key}`;
        let position = 0;

        console.log(`%c ${file}`, "color: red; font-weight: bold");
        console.table(file);

        await Storage.put(
          key,
          file,
          {
            level: "public",
            contentType: file.type,
          },
          {
            progressCallback(progress) {
              console.log(`Uploaded: ${progress.loaded}/${progress.total}`);
            },
          }
        );

        setPhotos(photos.push({ bucket, region, key, position }));
        position++;
        const image = await Storage.get(key, { level: "public" });
        console.log(photos);
        console.log(`%c ${image}`, "color: brown; font-weight: bold");
      } catch (e) {
        console.log(e);
      }
    });

    // console.log(photos);
    // data.photos = photos;
    // console.log(data);
    try {
      console.log(data);
      const res = await API.graphql(
        graphqlOperation(createProduct, {
          input: { ...data, photos },
        })
      );
      console.log(res);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div style={{}}>
      <Breadcrumbs>
        <Link to="/">Feminino</Link>
        <span>Calças</span>
      </Breadcrumbs>

      <Block marginBottom="scale750" />

      <div className={container}>
        {(id && (
          <Carousel width="25vw" {...getConfigurableProps()}>
            <div style={{}}>
              <img style={{}} src={PHOTO_AHMED} />
            </div>
            <div>
              <img src={PHOTO_AHMED} />
            </div>
            <div>
              <img src={PHOTO_AHMED} />
            </div>
            <div>
              <img src={PHOTO_AHMED} />
            </div>
            <div>
              <img src={PHOTO_AHMED} />
            </div>
          </Carousel>
        )) || (
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
        )}
        <div className={details}>
          {(id && (
            <>
              <Display4 marginBottom="scale500">Calça com listras</Display4>
              <Paragraph1 width="25vw" marginBottom="scale500">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laborisi
                nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
                in reprehenderit in voluptate velit esse cillum dolore eu fugiat
                nulla pariatur. Excepteur sint occaecat cupidatat non proident,
                sunt in culpa qui officia deserunt mollit anim id est laborum.
              </Paragraph1>
              <Button
                endEnhancer={() => (
                  <i height="10px" className="material-icons">
                    shopping_cart
                  </i>
                )}
                kind={KIND.primary}
                className={button}
              >
                Adicionar ao carrinho
              </Button>
              <Block marginBottom="scale300" />
              <Button
                endEnhancer={() => (
                  <i height="10px" className="material-icons">
                    loyalty
                  </i>
                )}
                kind={KIND.secondary}
                className={button}
              >
                Adicionar a lista de desejos
              </Button>
            </>
          )) || (
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
          )}
        </div>
      </div>
    </div>
  );
}

export default Details;
