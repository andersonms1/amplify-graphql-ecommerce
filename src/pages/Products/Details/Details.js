import React, { useState, useContext, useEffect, useRef } from "react";
import { useStyletron } from "baseui";
import { Button, KIND } from "baseui/button";
import { Block } from "baseui/block";
import { useParams } from "react-router-dom";
import { Paragraph1, Display4, H4 } from "baseui/typography";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import _ from "lodash";
import { Tag } from "baseui/tag";
import ChevronDown from "baseui/icon/chevron-down";
import { Select, SIZE, TYPE } from "baseui/select";

import AppContext from "../../../context/AppContext";
import CheckoutContext from "../../../context/CheckoutContext";
// import ModalSelection from "../../Payment/Checkout/ModalSelection";
import ModalDeatil from "../../Payment/Checkout/ModalDetail";
import { Accordion, Panel } from "baseui/accordion";
import { useMediaQuery } from "react-responsive";
import { handleLoad } from "../../../utils";
import { setObj, getObj } from "../../../utils/localStorage";
import { PRODUCT_SELECTION_TYPES as STATUS } from "../../../utils/STATUS";
import { FormControl } from "baseui/form-control";
import { useStyles } from "./useStyles";
import Loader from "./Loader";

function Details() {
  const [css, theme] = useStyletron();
  const {
    containerStyles,
    itemStyles,
    detailsContainerStyes,
    imgStyles,
  } = useStyles();

  const { breakpoints } = theme;
  let { id } = useParams();

  const { getById, product } = useContext(AppContext);
  const { cart, setCart, addCartItem, modalOpen, setModalOpen } = useContext(
    CheckoutContext
  );
  const [imgsDidLoad, setImgsDidLoad] = useState(false); // was false
  const [imgsLoadCounter, setImgsLoadCounter] = useState(0);

  const [size, setSize] = useState();
  const [quantity, setQuantity] = useState();

  useEffect(() => {
    getById(id);
    setCart(getObj("cart"));
    // console.log(JSON.stringify(getObj("cart")));

    setImgsDidLoad(false);
  }, [id]);

  const isLarge = useMediaQuery({
    query: `(min-width: ${breakpoints.large - 136}px)`,
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

  const handleBuy = () => {
    setModalOpen({ ...modalOpen, open: true });
  };

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
                onClick={() => handleBuy()}
                height="10px"
                className="material-icons"
                style={{ paddingRight: "5px" }}
              >
                shopping_cart
              </i>
            </div>
          </div>
        );
      });
    } else {
      return null;
    }
  };

  const renderContent = () => {
    if (!product) {
      return null;
    } else {
      return (
        <>
          <ModalDeatil />
          <div className={isLarge ? containerStyles : null}>
            <div className={isLarge ? itemStyles : null}>
              <div className={isLarge ? imgStyles : null}>
                <Carousel {...getConfigurableProps()}>
                  {iterateImages()}
                </Carousel>
              </div>
            </div>

            <div className={isLarge ? itemStyles : null}>
              <div className={isLarge ? detailsContainerStyes : null}>
                <Display4 marginBottom="scale500">{product.title}</Display4>
                <H4 marginBottom="scale500">R${product.price}</H4>

                {imgsDidLoad && (
                  // Conditional really necessary.
                  // Select was showing before the of the elements ready and
                  // even during loading screen
                  <FormControl
                    caption={() => {
                      if (quantity || quantity === 0) {
                        return `${quantity} unidade(s)`;
                      }
                    }}
                    positive={undefined}
                    error={undefined}
                  >
                    <Select
                      backspaceRemoves
                      clearable={false}
                      closeOnSelect
                      error={false}
                      escapeClearsValue
                      size={SIZE.default}
                      options={product.amount.map((size, index) => {
                        return { label: size.size, id: `${index}` };
                      })}
                      value={size}
                      searchable={false}
                      type={TYPE.select}
                      placeholder="Tamanho"
                      onChange={(params) => {
                        setSize(params.value);
                        setQuantity(product.amount[params.value[0].id].amount);
                      }}
                    />
                  </FormControl>
                )}
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
            </div>
          </div>
        </>
      );
    }
  };

  return (
    <>
      <Block paddingBottom="10px" />
      {handleLoad(renderContent(), <Loader />, imgsDidLoad)}
    </>
  );
}

export default Details;
