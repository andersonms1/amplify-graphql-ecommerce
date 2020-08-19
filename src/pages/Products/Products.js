// https://www.pluralsight.com/guides/re-render-react-component-on-window-resize
// https://translate.googleusercontent.com/translate_c?depth=1&hl=pt-BR&prev=search&pto=aue&rurl=translate.google.com&sl=en&sp=nmt4&u=https://stackoverflow.com/questions/19014250/rerender-view-on-browser-resize-with-react&usg=ALkJrhgmaHvg4pWb56lWDlQaL14Ba0SPOA
import React from "react";
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
import { useMediaQuery } from "react-responsive";
import { Paragraph4, Paragraph3 } from "baseui/typography";
import { StatefulPopover } from "baseui/popover";
import { Button } from "baseui/button";

import { StyledIcon, StyledButtonIcon, DATA, CARD_TYPES } from "../Home";
import { PHOTO_AHMED, PHOTO_HILL } from "../../assets/imgs";

function Products() {
  const [css, theme] = useStyletron();
  const { breakpoints } = theme;

  const priceButtonStyles = css({
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  });

  const card_config = {
    small: { height: "auto", width: "40vw" },
    medium: { height: "auto", width: "25vw" },
    large: { height: "auto", width: "20vw" },
  };

  function renderGrid(cardSize, style) {
    return DATA.map((item, index) => {
      return (
        <FlexGridItem key={item.id}>{renderCard(cardSize, style)}</FlexGridItem>
      );
    });
  }

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
        ref={forwardedRef}
      >
        {children}
      </div>
    );
  }

  function renderCard(cardSize, style) {
    return (
      <div>
        <Wrapper>
          {/* <Link to="/products/404"> */}
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
          {/* </Link> */}
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
          <Link to="/products/10">
            <StyledHeaderImage
              className={css({ borderStyle: "none" })}
              src={PHOTO_AHMED}
            ></StyledHeaderImage>
          </Link>
          <StyledBody>
            <Paragraph4>
              We ignite opportunity by setting the world in motion
            </Paragraph4>
            <div className={priceButtonStyles}>
              <Paragraph4>
                <b>R$19,99</b>
              </Paragraph4>
            </div>
          </StyledBody>
        </Card>
      </div>
    );
  }

  return (
    <div>
      <Layer>
        {useMediaQuery({
          query: `(max-width: ${breakpoints.small}px)`,
        }) && (
          <FlexGrid
            flexGridColumnCount={2}
            flexGridColumnGap="scale100"
            flexGridRowGap="scale100"
          >
            {renderGrid(CARD_TYPES.small, card_config.small)}
          </FlexGrid>
        )}

        {useMediaQuery({
          query: `(min-width: ${breakpoints.small + 1}px) and (max-width: ${
            breakpoints.large - 1
          }px) `,
        }) && (
          <FlexGrid
            flexGridColumnCount={3}
            flexGridColumnGap="scale200"
            flexGridRowGap="scale200"
          >
            {renderGrid(CARD_TYPES.medium, card_config.medium)}
          </FlexGrid>
        )}

        {useMediaQuery({
          query: `(min-width: ${breakpoints.large}px)`,
        }) && (
          <FlexGrid
            flexGridColumnCount={4}
            flexGridColumnGap="scale300"
            flexGridRowGap="scale300"
          >
            {renderGrid(CARD_TYPES.large, card_config.large)}
          </FlexGrid>
        )}
      </Layer>
    </div>
  );
}

export default Products;
