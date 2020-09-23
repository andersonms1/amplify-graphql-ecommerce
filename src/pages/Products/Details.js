import React, { useState, useContext, useEffect } from "react";
import { useStyletron } from "baseui";
import { Button, KIND } from "baseui/button";
import { Block } from "baseui/block";
import { Link, useParams } from "react-router-dom";
import { Breadcrumbs } from "baseui/breadcrumbs";
import { Paragraph1, Display4 } from "baseui/typography";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import _ from "lodash";
import { ProductContext } from "../../context/products";
import ContentLoader from "react-content-loader";
import { Accordion, Panel } from "baseui/accordion";
import { Small, Large } from "../../mediaQueries";
import { useMediaQuery } from "react-responsive";
import Header from "../Home/Header";

function Details() {
  const [css, theme] = useStyletron();
  const { breakpoints } = theme;
  let { id } = useParams();
  const { getById, product } = useContext(ProductContext);

  const isLarge = useMediaQuery({
    query: `(min-width: ${breakpoints.large}px)`,
  });

  const itemWidth = {
    width: "25vw",
  };

  const centralize = css({
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    // width: "100%",

    // alignSelf: "center",
  });

  // LargeScreen
  const container = css({
    display: "flex",
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-evenly",
    // marginRight: "20vw",
    // marginLeft: "20vw",

    // "@media(min-width: `${breakpoints.small + 1}px)` and (max-width: `${breakpoints.large - 1}px)`": {
    //   display: "flex",
    //   flexDirection: "column",
    //   alignItems: "center",
    //   justifyContent: "center",
    // },
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

  const iterateImages = () => {
    return product.photos.map((i, index) => {
      return (
        <div key={index}>
          <img src={i.link}></img>
          <div className="legend">
            {/* <>Adicionar ao carrinho</>
            <p>Adicionar a lista de desejos</p> */}
            <i
              onClick={() => alert("Shopping Cart")}
              height="10px"
              className="material-icons"
            >
              shopping_cart
            </i>
            <i
              onClick={() => alert("Loyalty")}
              height="10px"
              className="material-icons"
            >
              loyalty
            </i>
          </div>
          {/* <div className="legend">Adicionar a lista de desejos</div> */}
        </div>
      );
    });
  };

  const contentLoader = () => {
    return (
      <>
        <Small>
          <ContentLoader
            speed={2}
            width={150}
            height={500}
            viewBox="0 0 150 500"
            backgroundColor="#f3f3f3"
            foregroundColor="#ecebeb"
          >
            <rect x="0" y="131" rx="0" ry="0" width="139" height="26" />
            <rect x="0" y="0" rx="0" ry="0" width="141" height="122" />
            <rect x="0" y="165" rx="0" ry="0" width="139" height="77" />
          </ContentLoader>
        </Small>
        <Large>
          <div
            className={css({
              display: "flex",
              flex: 1,
              // height: "100vw",
              paddingTop: "10%",
              paddingLeft: "25%",
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              // backgroundColor: "gray",
            })}
          >
            <ContentLoader
              speed={2}
              width={1000}
              height={460}
              // width="100%"
              // height="100%"
              viewBox="0 0 1000 460"
              backgroundColor="#f3f3f3"
              foregroundColor="#ecebeb"
              style={{ maxWidth: "100%", height: "auto", alignSelf: "center" }}
            >
              <rect x="5" y="1" rx="2" ry="2" width="272" height="396" />
              <rect x="321" y="5" rx="0" ry="0" width="260" height="60" />
              <rect x="323" y="96" rx="0" ry="0" width="261" height="160" />
              <rect x="495" y="175" rx="0" ry="0" width="21" height="4" />
              <rect x="325" y="301" rx="0" ry="0" width="261" height="31" />
              <rect x="324" y="357" rx="0" ry="0" width="261" height="31" />
            </ContentLoader>
            {/* <div
          className={css({
            width: "10px",
            height: "10px",
            background: "red",
            // backgroundColor: "yellow",
            alignSelf: "center",
          })}
        ></div> */}
          </div>
        </Large>
      </>
    );
  };

  const renderButton = (icon, kind, text) => {
    return (
      <Button
        endEnhancer={() => (
          <i height="10px" className="material-icons">
            {icon}
          </i>
        )}
        kind={kind}
        className={css({ width: "100%" })}
      >
        {text}
      </Button>
    );
  };

  const renderContent = () => {
    return (
      <>
        <div
          // style={{ flexGrow: "1" }}
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
                })
              : null
          }
          // style={{ flexGrow: "1" }}
        >
          <Display4 marginBottom="scale500">{product.title}</Display4>
          <Accordion>
            <Panel
              title="Detalhes"
              overrides={{
                Header: {
                  style: { paddingLeft: "0px", paddingRight: "0px" },
                },
              }}
            >
              Preço: R${product.price.specie},{product.price.cents}
              <p>Categoria: {product.category}, Tamanho: M</p>
            </Panel>
            <Panel
              title="Descrição"
              overrides={{
                Root: {
                  style: { maxWidth: "100%" },
                },
                Header: {
                  style: { paddingLeft: "0px", paddingRight: "0px" },
                },
              }}
            >
              <Paragraph1
                className={css({ maxWidth: "100%" })}
                marginBottom="scale500"
              >
                {product.description}
              </Paragraph1>
            </Panel>
          </Accordion>

          {renderButton("shopping_cart", KIND.primary, "Adicionar ao carrinho")}

          <Block marginBottom="scale300" />

          {renderButton(
            "loyalty",
            KIND.secondary,
            "Adicionar a lista de desejos"
          )}
        </div>
      </>
    );
  };

  const handleLoading = () => {
    if (!id || !product) {
      // if (true) {
      return contentLoader();
    } else {
      return (
        <>
          <Small>{renderContent()}</Small>
          <Large>
            <div
              className={css({
                display: "flex",
                flexDirection: "row",
                alignItems: "flex-start",
                justifyContent: "flex-end",
                alignContent: "flex-end",
                // maxWidth: "800px",
                // background: "gray",
                // width: "500px",
              })}
            >
              {renderContent()}
            </div>
          </Large>
        </>
      );
    }
  };

  const get = async () => {
    await getById(id);
  };

  useEffect(() => {
    get();
    // console.log(product);
  }, [id]);

  return (
    <>
      <>
        <Header />
        <Block paddingBottom="10px" />
      </>
      {handleLoading()}
    </>
  );
}

export default Details;
