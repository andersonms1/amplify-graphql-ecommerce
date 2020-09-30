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
import { ProductsContext } from "../../context/products";
import { Small, Medium, Large } from "./MediaQueriesContainers";
import ContentLoader from "react-content-loader";
import { PHOTO_HILL } from "../../assets/imgs/";
import { Wrapper, WrapperLoayalty } from "../../components/Wrapper";

function Products() {
  const [css, theme] = useStyletron();
  const [imgsLoadCounter, setImgsLoadCounter] = useState(0);
  const [imgsDidLoad, setImgsDidLoad] = useState(false);

  const { products, loading } = useContext(ProductsContext);

  const priceButtonStyles = css({
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  });

  const centerRow = css({
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  });

  function renderGrid() {
    return products.map((item, index) => {
      return <FlexGridItem key={item.id}>{renderCard(item)}</FlexGridItem>;
    });
  }

  function renderCard(item) {
    return (
      <div>
        {imgsDidLoad ? (
          <WrapperLoayalty>
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
          </WrapperLoayalty>
        ) : null}
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
                  setImgsLoadCounter(imgsLoadCounter + 1);

                  if (imgsLoadCounter === products.length - 1) {
                    setImgsDidLoad(true);
                  }
                }}
                alt="Imagem do produto"
              />
            </div>
          </Link>

          <StyledBody>
            <Paragraph4 margin="0" padding="0">
              {item.title}
            </Paragraph4>
            <div className={priceButtonStyles}>
              <Paragraph4 margin="0" padding="0">
                <b>R${item.price.specie}</b>
              </Paragraph4>
            </div>
          </StyledBody>
        </Card>
      </div>
    );
  }

  const renderContentLoader = () => {
    let arr = [];
    for (let aux = 0; aux < 10; aux++) {
      arr.push(
        <FlexGridItem key={aux}>
          <ContentLoader
            speed={2}
            width="100%"
            height="100%"
            viewBox="0 0 400 500"
            backgroundColor="#f2f2f2"
            foregroundColor="#d9d9d9"
            style={{ maxWidth: "100%", height: "auto" }}
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

  const handleLoading = () => {
    if (!products || loading) {
      return handleGrid(renderContentLoader());
    }

    if (!imgsDidLoad) {
      return (
        <>
          <Layer>
            <Wrapper>
              <div
                className={css({
                  backgroundColor: `${theme.colors.backgroundPrimary}`,
                  width: "100%",
                })}
              >
                {handleGrid(renderContentLoader())}
              </div>
            </Wrapper>

            {handleGrid(renderGrid())}
          </Layer>
        </>
      );
    } else {
      return handleGrid(renderGrid());
    }
  };

  const handleGrid = (item) => {
    return (
      <div className={centerRow}>
        <Small>
          <FlexGrid
            flexGridColumnCount={2}
            // flexGridColumnGap="scale100"
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
      </div>
    );
  };

  return <div>{handleLoading()}</div>;
}

export default Products;
