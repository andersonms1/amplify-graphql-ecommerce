// https://www.pluralsight.com/guides/re-render-react-component-on-window-resize
// https://translate.googleusercontent.com/translate_c?depth=1&hl=pt-BR&prev=search&pto=aue&rurl=translate.google.com&sl=en&sp=nmt4&u=https://stackoverflow.com/questions/19014250/rerender-view-on-browser-resize-with-react&usg=ALkJrhgmaHvg4pWb56lWDlQaL14Ba0SPOA
import React, { Fragment, useLayoutEffect, useState } from "react";
import { FlexGrid, FlexGridItem } from "baseui/flex-grid";
import {
  Card,
  StyledBody,
  StyledAction,
  StyledThumbnail,
  StyledHeaderImage,
} from "baseui/card";
import { Button } from "baseui/button";
import { useStyletron } from "baseui";
import { AspectRatioBox, AspectRatioBoxBody } from "baseui/aspect-ratio-box";
import { Link } from "react-router-dom";
import { useMediaQuery } from "react-responsive";

import { StyledIcon, StyledButtonIcon, DATA } from "../Home";
import { PHOTO_AHMED, PHOTO_HILL } from "../../assets/imgs";
import { ASPECT_RATIO } from "../../assets/util";

function ProductNew() {
  const [css, theme] = useStyletron();
  const { breakpoints } = theme;

  const [size, setSize] = useState([0, 0]);
  const [isScreenSmall, setIsScreenSmall] = useState(false);
  const [isScreenMedium, setIsScreenMedium] = useState(false);
  const [isScreenBig, setIsScreenBig] = useState(false);

  useLayoutEffect(() => {
    function updateSize() {
      setSize([window.innerWidth, window.innerHeight]);
    }
    window.addEventListener("resize", updateSize);
    updateSize();
  }, []);

  // const isBigScreen = useMediaQuery({ query: '(min-device-width: 1824px)' })
  // const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1224px)' })
  // const isTabletOrMobileDevice = useMediaQuery({
  //   query: '(max-device-width: 1224px)'
  // })
  const priceButtonStyles = css({
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  });
  const renderGrid = DATA.map((item, index) => {
    return (
      <FlexGridItem key={item.id}>
        <AspectRatioBox aspectRatio={ASPECT_RATIO}>
          <AspectRatioBoxBody>
            <div>{renderCard()}</div>
          </AspectRatioBoxBody>
        </AspectRatioBox>
      </FlexGridItem>
    );
  });

  function renderCard() {
    return (
      <Card
        headerImage={PHOTO_AHMED}
        overrides={{
          Root: { style: { maxWidth: "15vw", height: "auto" } },
          HeaderImage: { style: { maxWidth: "100%", height: "auto" } },
        }}
        title=""
      >
        {/* <Link to="/items/10">
          <StyledHeaderImage
            height="200vh"
            src={PHOTO_AHMED}
          ></StyledHeaderImage>
        </Link> */}
        {/* <div>
          <img src={PHOTO_AHMED} width="100%" />
        </div> */}
        <StyledBody>
          PIJAMA MANGA CURTA ESTAMPA URSO COM TAPA OLHO CALÇA XADREZ EM
          VISCOLYCRA
          <div className={priceButtonStyles}>
            R$ 19,99
            <Button
              startEnhancer={() => (
                <i className="material-icons">
                  <StyledButtonIcon theme={theme}>loyalty</StyledButtonIcon>
                </i>
              )}
            />
            <Button
              startEnhancer={() => (
                <i className="material-icons">
                  <StyledButtonIcon theme={theme}>visibility</StyledButtonIcon>
                </i>
              )}
            />
          </div>
        </StyledBody>
      </Card>
    );
  }

  return (
    <div>
      {useMediaQuery({
        query: `(max-width: ${breakpoints.small}px)`,
      }) && <p>Small Screen</p>}

      {useMediaQuery({
        query: `(max-width: ${breakpoints.large - 1}px) and (min-width: ${
          breakpoints.small + 1
        }px)`,
      }) && <p>Medium</p>}

      {useMediaQuery({
        query: `(min-width: ${breakpoints.large}px)`,
      }) && <p>Large Screen</p>}
    </div>
  );
}

export default ProductNew;
