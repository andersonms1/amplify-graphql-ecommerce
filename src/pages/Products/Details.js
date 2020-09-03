import React, { useState, useContext, useEffect } from "react";
import { useStyletron } from "baseui";
import { Button, KIND } from "baseui/button";
import { Block } from "baseui/block";
import { Link, useParams } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
import { Breadcrumbs } from "baseui/breadcrumbs";
import { Paragraph1, Display4 } from "baseui/typography";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import _ from "lodash";
import Auth from "@aws-amplify/auth";
import { ProductContext } from "../../context/products";
import { Spinner } from "../../components/Spinner";

function Details() {
  let { id } = useParams();
  const [css, theme] = useStyletron();

  const { getById, product } = useContext(ProductContext);

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

  useEffect(() => {
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

  useEffect(() => {
    const get = async () => {
      await getById(id);
    };
    get();
    console.log(product);
  }, []);

  const iterateImages = () => {
    return product.photos.map((i) => {
      return (
        <div>
          <img src={i.link}></img>
        </div>
      );
    });
  };

  return (
    <div style={{}}>
      {/* <Breadcrumbs>
        <Link to="/">Feminino</Link>
        <span>Calças</span>
      </Breadcrumbs> 
       <Block marginBottom="scale750" /> */}
      {/* id && product && */}
      {(id && product && (
        <div className={container}>
          <Carousel width="25vw" {...getConfigurableProps()}>
            {iterateImages()}
          </Carousel>

          <div className={details}>
            <>
              <Display4 marginBottom="scale500">{product.title}</Display4>
              <Paragraph1 width="25vw" marginBottom="scale500">
                {product.description}
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
          </div>
        </div>
      )) || <Spinner />}
    </div>
  );
}

export default Details;
