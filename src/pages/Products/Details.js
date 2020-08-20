import React from "react";
import { useStyletron } from "baseui";
import { Button, KIND } from "baseui/button";
import { Block } from "baseui/block";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useParams,
} from "react-router-dom";
import { useMediaQuery } from "react-responsive";
import { Breadcrumbs } from "baseui/breadcrumbs";
// import {StyledLink as Link} from 'baseui/link';
import { Paragraph1, Display4 } from "baseui/typography";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import { Upload, Delete } from "baseui/icon";
import { Input } from "baseui/input";
import { FormControl } from "baseui/form-control";
import { Textarea } from "baseui/textarea";
import { Combobox } from "baseui/combobox";
import { FileUploader } from "baseui/file-uploader";
import { List, arrayMove, arrayRemove } from "baseui/dnd-list";
import { v4 as uuidv4 } from "uuid";
import _ from "lodash";

import { PHOTO_AHMED, PHOTO_HILL } from "../../assets/imgs";

function Details() {
  let { id } = useParams();
  const [css, theme] = useStyletron();
  const [value, setValue] = React.useState("");
  const [fileLoad, setFileLoad] = React.useState(false);
  const [items, setItems] = React.useState([]);
  const [files, setFiles] = React.useState([]);

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
    // // display: "flex",
    // flexDirection: "row",
    // alignItems: "center",
    // justifyContent: "space-between",
    width: "25vw",
    // marginBottom: `${theme.sizing.scale500}`,
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

  const compareFiles = (string) => {
    // file.map()
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
                items={items}
                removable
                removableByMove
                onChange={({ oldIndex, newIndex }) =>
                  setItems(
                    newIndex === -1
                      ? arrayRemove(items, oldIndex)
                      : arrayMove(items, oldIndex, newIndex)
                  )
                }
              />
            </FormControl>
            <FileUploader
              onCancel={null}
              aria-describedby="Testee?"
              name="Name"
              onDrop={(acceptedFiles, rejectedFiles) => {
                // handle file upload...
                // Make req
                try {
                  setFileLoad(true);
                  const arr = acceptedFiles.map((i) => i.name);
                  console.log(acceptedFiles);
                  // console.log();
                  // console.log(
                  //   "%c ",
                  //   "background: blue; background-color: yellow; width: 100%"
                  // );
                  // console.log(
                  //   `%c arr: ${arr}`,
                  //   "color: black; font-weight: bold; height: 2rem;"
                  // );
                  // const filter = file.filter(
                  //   (f) =>
                  //     f != arr.map((a) => a) ||
                  //     (alert("Arquivos nomes diferentes") && false)
                  // );
                  // console.log(
                  //   `%c filtro: ${filter}`,
                  //   "color: green; font-weight: bold; heigh: 2rem;"
                  // );
                  // console.log(
                  //   `%c file: ${file}`,
                  //   "color: purple; font-weight: bold; height: 2rem;"
                  // );
                  // if (file.length) {
                  //   console.log(
                  //     `%c condicional ${true}. file: ${[...file]}. filter: ${[
                  //       ...filter,
                  //     ]}`,
                  //     "color: blue; font-weight: bold; height: 2rem;"
                  //   );
                  //   setFile([...file, ...filter]);
                  // } else {
                  //   console.log(
                  //     `%c condicional ${false}. file: ${[...file]}. filter: ${[
                  //       ...filter,
                  //     ]}`,
                  //     "color: red; font-weight: bold; height: 2rem;"
                  //   );

                  //   setFile([...arr]);
                  // }
                  // _.difference([2, 1], [2, 3]);

                  if (items.length) {
                    setItems(_.union(arr, items));
                    // setFiles(files.filter(f => f.name === ))
                  } else {
                    setItems(arr);
                    setFiles({ acceptedFiles });
                  }
                } catch (e) {
                  console.log(e);
                }

                setFileLoad(false);
              }}
              progressMessage={fileLoad ? `Uploading... hang tight.` : ""}
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
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
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
              <FormControl label="Título">
                <Input
                  id="input"
                  value={value}
                  onChange={(e) => setValue(e.target.value)}
                  placeholder=""
                  clearOnEscape
                />
              </FormControl>
              <FormControl label="Descrição" caption="Textarea caption">
                <Textarea
                  id="textarea-id"
                  value={value}
                  onChange={(event) => setValue(event.currentTarget.value)}
                />
              </FormControl>
              <FormControl label="Sessão" caption="No caption">
                <Combobox
                  value={value}
                  onChange={(nextValue) => setValue(nextValue)}
                  options={[
                    { label: "AliceBlue", id: "#F0F8FF" },
                    { label: "AntiqueWhite", id: "#FAEBD7" },
                    { label: "Aqua", id: "#00FFFF" },
                    { label: "Aquamarine", id: "#7FFFD4" },
                    { label: "Azure", id: "#F0FFFF" },
                    { label: "Beige", id: "#F5F5DC" },
                  ]}
                  mapOptionToString={(option) => option.label}
                />
              </FormControl>

              <FormControl label="Finalizar">
                <>
                  <Button
                    className={button}
                    endEnhancer={() => <Upload size={24} />}
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
      {/* <p>Anderson</p> */}
    </div>
  );
}

export default Details;
