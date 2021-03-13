import React, { useState, useContext, useEffect, useRef } from "react";
import { useStyletron } from "baseui";
import { Button, KIND } from "baseui/button";
import { Block } from "baseui/block";
import { useParams } from "react-router-dom";
import {
  Paragraph1,
  Display4,
  H4,
  LabelMedium,
  H2,
  LabelLarge,
} from "baseui/typography";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import _ from "lodash";
import { Tag } from "baseui/tag";
import { Select, SIZE, TYPE } from "baseui/select";

import AppContext from "../../../context/AppContext";
import CheckoutContext from "../../../context/CheckoutContext";
import { ResponsiveProperty } from "../../../mediaQueries/mediaQueries";
import ModalAddItem from "../../Payment/Checkout/ModalAddItem";
import { Accordion, Panel } from "baseui/accordion";
import { useMediaQuery } from "react-responsive";
import { handleLoad } from "../../../utils";
import { setObj, getObj } from "../../../utils/localStorage";
import { FormControl } from "baseui/form-control";
import { useStyles } from "./useStyles";
import { LogoAdidas } from "../../../assets/imgs/home";
import { StyledSpinnerNext } from "baseui/spinner";
import Loader from "./Loader";

function Details() {
  const [css, theme] = useStyletron();
  const {
    containerStyles,
    itemStyles,
    detailsContainerStyes,
    imgStyles,
    sizeShow,
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

  const [isLoading, setIsloading] = useState(true);
  const [image, setImage] = useState();

  useEffect(() => {
    getById(id);
    setCart(getObj("cart"));
    // console.log(JSON.stringify(getObj("cart")));
    setIsloading(false);
    setImgsDidLoad(false);
  }, [id]);

  const isLarge = useMediaQuery({
    query: `(min-width: ${breakpoints.large - 136}px)`,
  });

  const getConfigurableProps = () => ({
    autoPlay: true,
    infiniteLoop: true,
    swipeable: true,
    showThumbs: true,
    showIndicators: false,
    showStatus: false,
    dynamicHeight: true,
    // interval: 3000,
    // showArrows: boolean('showArrows', true, tooglesGroupId),
    // useKeyboardArrows: boolean('useKeyboardArrows', true, tooglesGroupId),
    // stopOnHover: boolean('stopOnHover', true, tooglesGroupId),
    // emulateTouch: boolean('emulateTouch', true, tooglesGroupId),
    // thumbWidth: number('thumbWidth', 100, {}, valuesGroupId),
    // selectedItem: number('selectedItem', 0, {}, valuesGroupId),
    // transitionTime: number('transitionTime', 150, {}, valuesGroupId),
    // swipeScrollTolerance: number('swipeScrollTolerance', 5, {}, valuesGroupId),
  });

  const handleBuy = () => {
    setModalOpen({ ...modalOpen, open: true });
  };

  const accordionWidth = ResponsiveProperty(
    ["100%", "100%", "30vw"],
    breakpoints.large - 136,
    500
  );

  const iterateImages = () => {
    if (product) {
      return product.photos.map((image, index) => {
        // let display = "inline";
        return (
          <div key={index}>
            <img
              src={image ? image.link : LogoAdidas}
              alt="Foto do produto"
              /* The carousel and baseui don't "talk", very well. 
              So the photos were appearing first.  */
              width="100%"
              // style={
              //   image.loaded && imgsDidLoad
              //     ? { display: "inline" }
              //     : { display: "none" }
              // }
              onLoad={() => {
                setImage(image.link);
                image.loaded = true;
                setImgsLoadCounter(imgsLoadCounter + 1);
                if (imgsLoadCounter === product.photos.length - 1) {
                  /*Due to rerender, this counter is not reliable */
                  setImgsDidLoad(true);
                }
              }}
            />
          </div>
        );
      });
    } else {
      return <StyledSpinnerNext $size="large" />;
    }
  };

  const renderContent = () => {
    if (!product || isLoading) {
      return <StyledSpinnerNext $size="large" />;
    } else {
      return (
        <>
          <ModalAddItem />
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
                <H2 marginBottom="scale500">{product.title}</H2>
                <LabelLarge marginBottom="scale500">
                  R$ {product.price}
                </LabelLarge>
                {imgsDidLoad && (
                  // Conditional really necessary.
                  // Select was showing before the of the elements ready and
                  // even during loading screen

                  <>
                    {/* <H4>{JSON.stringify(product.amount)}</H4> */}
                    <div className={sizeShow}>
                      {product.amount.map((p, i) => (
                        <LabelLarge
                          key={i}
                          className={css({
                            paddingRight: theme.sizing.scale500,
                          })}
                          overrides={{
                            Block: {
                              style: {
                                textDecoration:
                                  p.amount <= 0 ? "line-through" : "none",
                              },
                            },
                          }}
                        >
                          {p.size}
                        </LabelLarge>
                      ))}
                    </div>
                  </>
                  // <FormControl
                  //   caption={() => {
                  //     if (quantity || quantity === 0) {
                  //       return `${quantity} unidade(s)`;
                  //     }
                  //   }}
                  //   positive={undefined}
                  //   error={undefined}
                  // >
                  //   <Select
                  //     backspaceRemoves
                  //     clearable={false}
                  //     closeOnSelect
                  //     error={false}
                  //     escapeClearsValue
                  //     size={SIZE.default}
                  //     options={product.amount.map((size, index) => {
                  //       return { label: size.size, id: `${index}` };
                  //     })}
                  //     value={size}
                  //     searchable={false}
                  //     type={TYPE.select}
                  //     placeholder="TAMANHO"
                  //     onChange={(params) => {
                  //       setSize(params.value);
                  //       setQuantity(product.amount[params.value[0].id].amount);
                  //     }}
                  //   />
                  // </FormControl>
                )}
              </div>

              <Paragraph1 className={isLarge ? detailsContainerStyes : null}>
                {product.description}
              </Paragraph1>

              {/* <Accordion className={css({})}>
                <Panel
                  title="DESCRIÇÃO"
                  // expanded="true"
                  overrides={{
                    Header: {
                      style: {
                        paddingLeft: "0px",
                      },
                    },
                    PanelContainer: {
                      style: ({ $theme }) => ({
                        // width: ResponsiveProperty(["100%", "100%", "30vw"]),
                        width: accordionWidth,
                      }),
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
              </Accordion> */}

              <Button
                onClick={() => handleBuy()}
                endEnhancer={() => (
                  <i height="10px" className="material-icons">
                    shopping_cart
                  </i>
                )}
                kind={KIND.primary}
                className={css({ marginTop: "10px", width: "100%" })}
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
      {renderContent()}
      {/* {imgsDidLoad ? renderContent() : <Loader />} */}
    </>
  );
}

export default Details;
