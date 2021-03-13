// https://www.pluralsight.com/guides/re-render-react-component-on-window-resize
// https://translate.googleusercontent.com/translate_c?depth=1&hl=pt-BR&prev=search&pto=aue&rurl=translate.google.com&sl=en&sp=nmt4&u=https://stackoverflow.com/questions/19014250/rerender-view-on-browser-resize-with-react&usg=ALkJrhgmaHvg4pWb56lWDlQaL14Ba0SPOA
// https://dev.to/andreiduca/practical-implementation-of-data-fetching-with-react-suspense-that-you-can-use-today-273m
// https://medium.com/frontend-digest/progressively-loading-images-in-react-107cb075417a
// https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API
// https://stackoverflow.com/questions/31366735/how-to-load-images-async-with-rxjs-and-perform-a-method-when-all-loaded
// https://blog.logrocket.com/rxjs-with-react-hooks-for-state-management/
// https://github.com/danilowoz/react-content-loader
import React, {
  useState,
  useContext,
  useEffect,
  useRef,
  useLayoutEffect,
} from "react";
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
import { Link, useHistory } from "react-router-dom";
import { Paragraph4, Paragraph3 } from "baseui/typography";
import { StatefulPopover } from "baseui/popover";
import AppContext from "../../context/AppContext";
import HeaderContext from "../../context/HeaderContext";
import { Small, Medium, Large } from "./MediaQueriesContainers";
import ContentLoader from "react-content-loader";
import { LogoAdidas } from "../../assets/imgs/home";
import { HandleLoad, Wrapper, WrapperLoayalty } from "../../components";
import { handleLoad } from "../../utils";
import useResizeObserver from "use-resize-observer";
import { Button } from "baseui/button";
import { StyledSpinnerNext } from "baseui/spinner";

function Products(props) {
  const [css, theme] = useStyletron();
  let history = useHistory();
  const [handleImg, setHandleImg] = useState();
  const [imgsLoadCounter, setImgsLoadCounter] = useState(0);
  const [imgsDidLoad, setImgsDidLoad] = useState(false);
  const [cardHeight, setCardHeight] = useState();

  const {
    products,
    loading,
    setLoading,
    getProducts,
    page,
    getProductsImgs,
  } = useContext(AppContext);

  const { querie, setQuerie } = useContext(HeaderContext);

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
  const aspect_ratio = 1;

  const itemCardRef = useRef();

  useEffect(() => {
    // console.log(querie);
    // console.log(products);
    setImgsDidLoad(false);
    setLoading(true);
    getProducts({ querie });

    // setImgsDidLoad(true);
  }, [page, querie]);

  const { ref } = useResizeObserver({
    onResize: ({ width, height }) => {
      // do something here.
      setCardHeight(width / aspect_ratio);
    },
  });

  function renderGrid() {
    // alert("here");

    // console.log(querie);
    // console.log(products);
    if (querie?.querie && products[`${querie.querie}`]) {
      return products[`${querie.querie}`].map((item, index) => {
        return (
          <FlexGridItem key={item.id}>{renderCard(item, index)}</FlexGridItem>
        );
      });
    } else {
      return (
        <FlexGridItem>
          <StyledSpinnerNext $size="large" />
        </FlexGridItem>
      );
    }
  }

  function renderCard(item) {
    return (
      <div ref={ref}>
        {/* {imgsDidLoad ? (
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
        ) : null} */}
        <Card
          // headerImage={}
          // headerImage={

          // }
          className={css({
            marginLeft: "0px",
            paddingLeft: "0px",
          })}
          overrides={{
            // maxWidth: "15vw"
            Root: {
              style: {
                // borderRightStyle: "none",
                // borderBottomStyle: "none",
                // borderLeftStyle: "none",
                // borderTopStyle: "none",
              },
            },
            // Thumbnail:
            HeaderImage: {
              // style: { maxWidth: "100%", height: "auto" },

              style: { height: "100%", objectFit: "cover" },
            },
          }}
        >
          <Link to={`/products/${item.id}`}>
            <div>
              <StyledHeaderImage
                src={item.link}
                // src={loading ? LogoAdidas : item.link}

                // src={item.isLoading ? LogoAdidas : item.link}
                // height={`${cardHeight}px`}
                // width="100%"
                style={{
                  objectFit: "cover",
                  width: "100%",
                  height: `${cardHeight}px`,
                }}
                onLoad={() => {
                  console.log("Counter");
                  console.log(imgsLoadCounter);
                  console.log(products[`${querie.querie}`].length - 1);
                  console.log(item);
                  console.log();

                  /* New Method */

                  /* Old method */
                  // setImgsLoadCounter(imgsLoadCounter + 1);
                  // if (
                  //   imgsLoadCounter ===
                  //   products[`${querie.querie}`].length - 1
                  // ) {
                  //   setImgsDidLoad(true);
                  // }
                }}
                alt="Imagem do produto"
              />
            </div>
          </Link>

          <StyledBody>
            <Paragraph4
              className={css({
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
                overflow: "hidden",
                width: "auto",
              })}
              margin="0"
              padding="0"
            >
              {item.title}
            </Paragraph4>
            <div className={priceButtonStyles}>
              <Paragraph4 margin="0" padding="0">
                <b>R${item.price}</b>
              </Paragraph4>
            </div>
          </StyledBody>

          <StyledAction>
            <Button
              onClick={() => history.push(`products/${item.id}`)}
              overrides={{
                BaseButton: { style: { width: "100%" } },
              }}
            >
              OPÇÕES
            </Button>
          </StyledAction>
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

  const handleGrid = (item) => {
    return (
      <div>
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
      </div>
    );
  };

  return (
    <div>
      {querie?.querie ? (
        handleGrid(renderGrid())
      ) : (
        // handleLoad(
        //   handleGrid(renderGrid(querie)),
        //   handleGrid(renderContentLoader()),
        //   imgsDidLoad
        // )
        // renderGrid(querie)
        <p>Querie not seted</p>
      )}
    </div>
  );
}

export default Products;
