import React, { useState, useContext, useEffect, useRef } from "react";
import { useStyletron } from "baseui";
import { Button, KIND } from "baseui/button";
import { Block } from "baseui/block";
import { useParams } from "react-router-dom";
import {
  Paragraph1,
  Display4,
  H1,
  H2,
  H3,
  H4,
  H5,
  H6,
} from "baseui/typography";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import _ from "lodash";
import { useHistory } from "react-router-dom";
import { FormControl } from "baseui/form-control";
import { Input } from "baseui/input";
import { Select } from "baseui/select";
import { Tag } from "baseui/tag";
import ChevronDown from "baseui/icon/chevron-down";
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalButton,
  SIZE,
  ROLE,
} from "baseui/modal";
import { KIND as ButtonKind } from "baseui/button";

import AppContext from "../../context/AppContext";
import CheckoutContext from "../../context/CheckoutContext";
import ContentLoader from "react-content-loader";
import { Accordion, Panel } from "baseui/accordion";
import { useMediaQuery } from "react-responsive";
import { handleLoad } from "../../utils";
import { quantity as VAL_QUANTITY } from "../Products/CreateUpdate/validations";
import { setObj, getObj } from "../../utils/localStorage";
import { ValidationError } from "joi";

function Details() {
  const [css, theme] = useStyletron();
  const { breakpoints } = theme;
  let { id } = useParams();
  let history = useHistory();

  const { getById, product } = useContext(AppContext);
  const { cart, setCart, addCartItem } = useContext(CheckoutContext);
  const [imgsDidLoad, setImgsDidLoad] = useState(false);
  const [imgsLoadCounter, setImgsLoadCounter] = useState(0);

  const [isOpen, setIsOpen] = useState(false); //modal
  const [size, setSize] = useState([]);
  const [quantity, setQuantity] = useState("1");
  const [captionQuantity, setCaptionQuantity] = useState("");

  useEffect(() => {
    getById(id);
    setCart(getObj("cart"));
    // console.log(JSON.stringify(getObj("cart")));

    setImgsDidLoad(false);
  }, [id]);

  useEffect(() => {
    setSize(
      product
        ? [
            {
              label: `${product.amount[0].size}`,
              id: "0",
              quantity: `${product.amount[0].amount}`,
            },
          ]
        : [{ label: "Carregando...", id: "0", quantity: "0" }]
    );
  }, [product]);

  // useEffect(() => {
  //   setCart(getObj("cart"));
  //   setImgsDidLoad(true);
  //   console.log(product.amount);
  // }, []);

  const isLarge = useMediaQuery({
    query: `(min-width: ${breakpoints.large}px)`,
  });

  const itemWidth = {
    width: "25vw",
  };

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

  const iterateImages = () => {
    if (product) {
      return product.photos.map((image, index) => {
        // let display = "inline";
        return (
          <div key={index}>
            <img
              src={image.link}
              alt="Foto do produto"
              /* The carousel and baseui don't "talk", very well. 
              So the photos were appearing first.  */
              style={
                image.loaded && imgsDidLoad
                  ? { display: "inline" }
                  : { display: "none" }
              }
              onLoad={() => {
                image.loaded = true;
                setImgsLoadCounter(imgsLoadCounter + 1);
                if (imgsLoadCounter === product.photos.length - 1) {
                  /*Due to rerender, this counter is not reliable */
                  setImgsDidLoad(true);
                }
              }}
            />
            <div className="legend">
              <i
                onClick={() => alert("Shopping Cart")}
                height="10px"
                className="material-icons"
                style={{ paddingRight: "5px" }}
              >
                shopping_cart
              </i>
              {/* <i
                onClick={() => alert("Loyalty")}
                height="10px"
                className="material-icons"
                style={{ paddingLeft: "5px" }}
              >
                loyalty
              </i> */}
            </div>
          </div>
        );
      });
    } else {
      return null;
    }
  };

  const contentLoader = () => {
    return (
      <div style={{ display: "flex" }}>
        {!isLarge ? (
          <ContentLoader
            speed={2}
            width="100vw"
            height="100%"
            viewBox="0 0 150 500"
            backgroundColor="#f3f3f3"
            foregroundColor="#ecebeb"
          >
            <rect x="0" y="131" rx="0" ry="0" width="139" height="26" />
            <rect x="0" y="0" rx="0" ry="0" width="141" height="122" />
            <rect x="0" y="165" rx="0" ry="0" width="139" height="77" />
          </ContentLoader>
        ) : (
          <ContentLoader
            speed={2}
            width="100vw"
            height="100%"
            viewBox="0 0 1000 460"
            backgroundColor="#f3f3f3"
            foregroundColor="#ecebeb"
            style={{
              width: "100vw",
              maxWidth: "100%",
              height: "auto",
              flexGrow: "1",
              flexShrink: "1",
            }}
            className={{ flexGrow: "1", flexShrink: "1" }}
          >
            <rect x="5" y="1" rx="2" ry="2" width="272" height="396" />
            <rect x="321" y="5" rx="0" ry="0" width="260" height="60" />
            <rect x="323" y="96" rx="0" ry="0" width="261" height="160" />
            <rect x="495" y="175" rx="0" ry="0" width="21" height="4" />
            <rect x="325" y="301" rx="0" ry="0" width="261" height="31" />
            <rect x="324" y="357" rx="0" ry="0" width="261" height="31" />
          </ContentLoader>
        )}
      </div>
    );
  };

  const isComoboValid = () => {
    return product.amount.filter((_product) => _product.size === size[0].label);
  };

  const handleBuy = () => {
    // setCart({products: product});
    const filter = isComoboValid();
    console.log(filter);

    const haveStock = filter[0].amount > quantity;
    console.log(filter[0].amount);
    console.log(haveStock);
    product.selection = {
      amount: quantity,
      size: size[0].label,
    };
    addCartItem(product);
    history.push("/cart");
  };

  // useEffect(() => {
  //   console.log(cart);
  //   console.log(product);
  //   const navigate = () => {
  //     if (product === cart.products[cart.products.length - 1]) {
  //       history.push("/cart");
  //     }
  //   };
  //   navigate();
  // }, [cart]);

  const renderContent = () => {
    if (!product) {
      return null;
    } else {
      return (
        <>
          <div
            className={
              isLarge
                ? css({
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "flex-start",
                    justifyContent: "flex-end",
                    alignContent: "flex-end",
                    // maxWidth: "800px",
                    // background: "gray",
                    // width: "500px",
                  })
                : null
            }
          >
            <div
              className={
                isLarge
                  ? css({
                      flexGrow: "3",
                      flexShrink: "3",
                      paddingRight: "5px",
                      ...itemWidth,
                    })
                  : null
              }
            >
              <Carousel {...getConfigurableProps()}>{iterateImages()}</Carousel>
            </div>

            <div
              className={
                isLarge
                  ? css({
                      flexGrow: "3",
                      flexShrink: "3",
                      paddingLeft: "5px",
                      ...itemWidth,
                    })
                  : null
              }
            >
              <Display4 marginBottom="scale500">{product.title}</Display4>
              <H4 marginBottom="scale500">R${product.price}</H4>

              <div>
                <Tag
                  onClick={() => setIsOpen(true)}
                  overrides={{
                    Root: {
                      style: {
                        marginLeft: "0px",
                      },
                    },
                    ActionIcon: () => (
                      <ChevronDown onClick={() => setIsOpen(true)} />
                    ),
                  }}
                >
                  Tamanho
                  {size.length
                    ? ` ${size[0].label}`
                    : ` ${product.amount[0].size}`}
                </Tag>
                <Tag closeable={false}>
                  {`${size[0].quantity} `}
                  unidades
                </Tag>
              </div>

              <Accordion className={css({ maxWidth: "100%" })}>
                <Panel
                  title="DESCRIÇÃO"
                  overrides={{
                    Root: {
                      style: { maxWidth: "100%" },
                    },
                    Header: {
                      style: {
                        paddingLeft: "0px",
                        paddingRight: "0px",
                        marginBottom: "10px",
                      },
                    },
                  }}
                >
                  <Tag
                    closeable={false}
                    overrides={{
                      Root: {
                        style: { marginLeft: "0px" },
                      },
                    }}
                  >
                    {product.category}
                  </Tag>
                  <Tag closeable={false}>{product.subCategory}</Tag>
                  <Paragraph1
                    className={css({ maxWidth: "100%" })}
                    marginBottom="scale500"
                  >
                    {product.description}
                  </Paragraph1>
                </Panel>
              </Accordion>

              <Button
                onClick={() => handleBuy()}
                endEnhancer={() => (
                  <i height="10px" className="material-icons">
                    shopping_cart
                  </i>
                )}
                kind={KIND.primary}
                className={css({ width: "100%" })}
              >
                Comprar
              </Button>

              {/* <Block marginBottom="scale300" /> */}

              {/* {renderButton(
                "loyalty",
                KIND.secondary,
                "Adicionar a lista de desejos"
              )} */}
            </div>
          </div>
        </>
      );
    }
  };

  const handleCombo = () => {
    return !product
      ? null
      : product.amount.map((item, index) => {
          return {
            label: item.size,
            quantity: item.amount,
            id: `${index}`,
          };
        });
  };

  const handleModal = () => {
    const _val = VAL_QUANTITY.validate({ quantity }, { abortEarly: false });
    const MAX_SIZE = `Quantidade máxima ${
      size[0] ? JSON.stringify(size[0].quantity) : "0"
    }`;
    if (_val.error) {
      //ser error
      setCaptionQuantity(`${JSON.stringify(_val.error.message)}`);
    } else {
      const filter = isComoboValid();
      if (quantity > filter[0].amount) {
        //set error
        setCaptionQuantity(MAX_SIZE);
      } else {
        //remove error
        setCaptionQuantity("");
        setIsOpen(false);
      }
    }
  };

  const renderModal = () => {
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
        <ModalHeader>Escolha o tamanho e quantidade</ModalHeader>
        <ModalBody>
          <FormControl label="Tamanho" caption="Teste">
            <Select
              options={handleCombo()}
              value={size}
              // placeholder={
              //   handleStateComparation() && isOpen && !size
              //     ? `${cart.products[currentItem].amount[0].size}`
              //     : `${size}`
              // }
              onChange={(params) => {
                setSize(params.value);
              }}
            />
          </FormControl>
          <FormControl
            label="Quantidade"
            placeholder="1"
            caption={`${captionQuantity}`}
            disabled={size ? false : true}
          >
            <Input
              value={quantity}
              onChange={(e) => {
                setQuantity(e.target.value);
              }}
              placeholder=""
              clearOnEscape
            />
          </FormControl>
        </ModalBody>

        <ModalFooter>
          <ModalButton kind={ButtonKind.tertiary} onClick={() => handleModal()}>
            OK
          </ModalButton>
        </ModalFooter>
      </Modal>
    );
  };
  return (
    <>
      <Block paddingBottom="10px" />
      {handleLoad(renderContent(), contentLoader(), imgsDidLoad)}
      {renderModal()}
    </>
  );
}

export default Details;
