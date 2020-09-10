// https://www.pluralsight.com/guides/re-render-react-component-on-window-resize
// https://translate.googleusercontent.com/translate_c?depth=1&hl=pt-BR&prev=search&pto=aue&rurl=translate.google.com&sl=en&sp=nmt4&u=https://stackoverflow.com/questions/19014250/rerender-view-on-browser-resize-with-react&usg=ALkJrhgmaHvg4pWb56lWDlQaL14Ba0SPOA
// https://dev.to/andreiduca/practical-implementation-of-data-fetching-with-react-suspense-that-you-can-use-today-273m
// https://medium.com/frontend-digest/progressively-loading-images-in-react-107cb075417a
// https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API
// https://stackoverflow.com/questions/31366735/how-to-load-images-async-with-rxjs-and-perform-a-method-when-all-loaded
// https://blog.logrocket.com/rxjs-with-react-hooks-for-state-management/
// https://github.com/danilowoz/react-content-loader
import React, { useState, useContext, useEffect } from "react";
import { FlexGrid, FlexGridItem } from "baseui/flex-grid";
import {
  Card,
  StyledBody,
  StyledAction,
  StyledThumbnail,
  StyledHeaderImage,
} from "baseui/card";
import { Layer } from "baseui/layer";
import { useStyletron } from "baseui";
import { Link } from "react-router-dom";
import { Paragraph4, Paragraph3 } from "baseui/typography";
import { StatefulPopover } from "baseui/popover";
import { ProductContext } from "../../context/products";
import { Small, Medium, Large } from "../../mediaQueries";
import ContentLoader from "react-content-loader";
import { PHOTO_HILL } from "../../assets/imgs/";

import useIntersectionObserver from "../../hooks/useIntersectionObserver";

function Products() {
  const [css, theme] = useStyletron();
  const [content, setContent] = useState(0);
  const [ready, setReady] = useState(false);
  const { products, loading, didImgLoad } = useContext(ProductContext);

  const priceButtonStyles = css({
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  });

  useEffect(() => {
    console.log(products);
    // setPhotos(products)
  }, []);

  useEffect(() => {
    console.log(didImgLoad);
  }, [didImgLoad]);

  function Wrapper(props) {
    const [css, theme] = useStyletron();
    const { offset, color, children, forwardedRef } = props;
    return (
      <div
        className={css({
          position: "absolute",
          // top: offset || "46%",
          // left: offset || "46%",
          // width: '200px',
          paddingTop: `${theme.sizing.scale500}`,
          // paddingBottom: '2px',
          paddingLeft: `${theme.sizing.scale750}`,
          // paddingRight: "20px",
          backgroundColor: color,
          // textAlign: 'center',
        })}
      >
        {children}
      </div>
    );
  }

  function renderGrid() {
    return products.map((item, index) => {
      return <FlexGridItem key={item.id}>{renderCard(item)}</FlexGridItem>;
    });
  }

  function renderCard(item) {
    return (
      <div>
        <Wrapper>
          <StatefulPopover
            content={
              <Paragraph3 padding="scale500">
                Adicionado a lista de desejos!
              </Paragraph3>
            }
            accessibilityType={"tooltip"}
            triggerType={"click"}
            placement={"rightBottom"}
            returnFocus
            autoFocus
          >
            <i className="material-icons">loyalty</i>
          </StatefulPopover>
        </Wrapper>
        <Card
          // headerImage={}
          overrides={{
            // maxWidth: "15vw"
            Root: {
              style: {
                borderRightStyle: "none",
                borderBottomStyle: "none",
                borderLeftStyle: "none",
                borderTopStyle: "none",
              },
            },
            // Root: { style: { borderStyle: "none" } },
            // Thumbnail:
            // HeaderImage: {
            //   style: { maxWidth: "100%", height: "auto" },
            // },
          }}
        >
          <Link to={`/products/${item.id}`}>
            <div>
              {/* <StyledHeaderImage
                className={css({
                  borderStyle: "none",
                  // display: "none",
                  visibility: "hidden",
                  // maxWidth: "50px",
                  // height: "50px",
                })}
                src={PHOTO_HILL}
                onLoad={() => {
                  item.didImgLoad = true;
                  display = "visible";
                }}
                alt="Imagem do produto"
              /> */}
              {/* <img
                src={item.link}
                style={{ maxWidth: "100%", height: "auto" }}
                alt="sdf"
              /> */}
              <StyledHeaderImage
                className={css({
                  // borderStyle: "none",
                  // display: "none",
                  // visibility: "hidden",
                  // maxWidth: "50px",
                  // height: "50px",
                })}
                src={item.link}
                onLoad={() => {
                  setContent(content + 1);
                }}
                alt="Imagem do produto"
              />
            </div>
          </Link>
          <StyledBody>
            <Paragraph4>{item.title}</Paragraph4>
            <div className={priceButtonStyles}>
              <Paragraph4>
                {/* <b>R$19,99</b> */}
                <b>R${item.price.specie}</b>
              </Paragraph4>
            </div>
          </StyledBody>
        </Card>
      </div>
    );
  }

  const isAnyImageLoading = () => {
    let unfinished = false;
    products.map((i) => {
      if (i.didImgLoad === false) {
        unfinished = true;
      }
      return i;
    });
    return unfinished;
  };

  const renderContentLoader = () => {
    let arr = [];
    for (let aux = 0; aux < 10; aux++) {
      arr.push(
        <FlexGridItem key={aux}>
          <ContentLoader
            speed={2}
            width="20vw"
            height="auto"
            // height={500}
            viewBox="0 0 400 500"
            backgroundColor="#f2f2f2"
            foregroundColor="#d9d9d9"
            style={{ maxWidth: "100%", height: "auto" }}
            // {...props}
          >
            <rect x="-19" y="-69" rx="2" ry="2" width="400" height="400" />
            <rect x="-5" y="377" rx="0" ry="0" width="386" height="16" />
            <rect x="5" y="389" rx="0" ry="0" width="11" height="2" />
            <rect x="164" y="406" rx="0" ry="0" width="62" height="18" />
          </ContentLoader>
        </FlexGridItem>
      );
    }
    return <>{arr}</>;
  };

  const isLoading = () => {
    console.log(content);
    console.log(products.length);

    if (ready) {
      return <Layer>{handleLoad(renderGrid())}</Layer>;
    }

    if (loading === false && content !== products.length) {
      console.log("if");
      return (
        <>
          <Layer>
            <Wrapper>{handleLoad(renderContentLoader())}</Wrapper>
          </Layer>
          <Layer>{handleLoad(renderGrid())}</Layer>
        </>
      );
    } else if (loading === false && content === products.length) {
      console.log("else if");
      setReady(true);
      return <Layer>{handleLoad(renderGrid())}</Layer>;
    } else {
      console.log("else");
      return <Layer>{handleLoad(renderContentLoader())}</Layer>;
    }
  };

  const handleLoad = (item) => {
    return (
      <>
        <Small>
          <FlexGrid
            flexGridColumnCount={2}
            flexGridColumnGap="scale100"
            flexGridRowGap="scale100"
          >
            {item}
          </FlexGrid>
        </Small>
        <Medium>
          <FlexGrid
            flexGridColumnCount={3}
            flexGridColumnGap="scale200"
            flexGridRowGap="scale200"
          >
            {item}
          </FlexGrid>
        </Medium>
        <Large>
          <FlexGrid
            flexGridColumnCount={4}
            flexGridColumnGap="scale300"
            flexGridRowGap="scale300"
          >
            {item}
          </FlexGrid>
        </Large>
      </>
    );
  };

  return <div>{isLoading()}</div>;
}

export default Products;
