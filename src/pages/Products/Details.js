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
import { Small, Large } from "../../mediaQueries";

function Details() {
  const [css, theme] = useStyletron();
  const { breakpoints } = theme;
  let { id } = useParams();
  const { getById, product } = useContext(ProductContext);

  const centralize = css({
    display: "flex",
    // alignItems: "center",
    justifyContent: "center",
  });

  const ItemsOrietation = ({ children }) => {
    return (
      <>
        <Small></Small>
        <Large></Large>
      </>
    );
  };

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

  const Component = ({ children }) => {
    return <b>{children}</b>;
  };

  const LARGE_WIDTH = "25vw";

  const item_large = css({
    width: "25vw",
  });

  const carousel = css({
    width: "25vw",
  });

  const button = css({
    width: "25vw",
  });

  const details = css({
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
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
        </div>
      );
    });
  };

  const contentLoader = () => {
    return (
      <ContentLoader
        speed={2}
        width={1000}
        height={460}
        viewBox="0 0 1000 460"
        backgroundColor="#f3f3f3"
        foregroundColor="#ecebeb"
        // {...props}
      >
        <rect x="5" y="1" rx="2" ry="2" width="272" height="396" />
        <rect x="321" y="5" rx="0" ry="0" width="260" height="60" />
        <rect x="323" y="96" rx="0" ry="0" width="261" height="160" />
        <rect x="495" y="175" rx="0" ry="0" width="21" height="4" />
        <rect x="325" y="301" rx="0" ry="0" width="261" height="31" />
        <rect x="324" y="357" rx="0" ry="0" width="261" height="31" />
      </ContentLoader>
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
        className={item_large}
      >
        {text}
      </Button>
    );
  };

  const get = async () => {
    await getById(id);
  };

  useEffect(() => {
    get();
    // console.log(product);
  }, [id]);

  return (
    <div className={centralize}>
      {/* <Breadcrumbs>
        <Link to="/">Feminino</Link>
        <span>Calças</span>
      </Breadcrumbs> 
       <Block marginBottom="scale750" /> */}
      {/* id && product && */}

      {(id && product && (
        <div className={container}>
          <div className={carousel}>
            <Carousel {...getConfigurableProps()}>{iterateImages()}</Carousel>
          </div>

          <div className={details}>
            <>
              <Display4 marginBottom="scale500">{product.title}</Display4>

              <Paragraph1 width="25vw" marginBottom="scale500">
                {product.description}
              </Paragraph1>

              {renderButton(
                "shopping_cart",
                KIND.primary,
                "Adicionar ao carrinho"
              )}

              <Block marginBottom="scale300" />

              {renderButton(
                "loyalty",
                KIND.secondary,
                "Adicionar a lista de desejos"
              )}
            </>
          </div>
        </div>
      )) ||
        contentLoader()}
    </div>
  );
}

export default Details;
