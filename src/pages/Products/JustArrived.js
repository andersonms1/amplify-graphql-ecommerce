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
import { useStyletron } from "baseui";
import { Link } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
import { Paragraph4, Paragraph3 } from "baseui/typography";

import { StyledIcon, StyledButtonIcon, DATA, CARD_TYPES } from "../Home";
import { PHOTO_AHMED, PHOTO_HILL } from "../../assets/imgs";

function ProductNew() {
  const [css, theme] = useStyletron();
  const { breakpoints } = theme;

  const priceButtonStyles = css({
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
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

  function renderCard(cardSize, style) {
    return (
      <Card
        // headerImage={}
        overrides={{
          // maxWidth: "15vw"
          Root: { style },
          // HeaderImage: {
          //   style: { maxWidth: "100%", height: "auto" },
          // },
        }}
      >
        <Link to="/products/10">
          <StyledHeaderImage src={PHOTO_AHMED}></StyledHeaderImage>
        </Link>
        <StyledBody>
          <Paragraph4>
            We ignite opportunity by setting the world in motion
          </Paragraph4>
          <div className={priceButtonStyles}>
            <Paragraph4>
              <b>R$19,99</b>
            </Paragraph4>
            <i className="material-icons">loyalty</i>
            <i className="material-icons">visibility</i>
          </div>
        </StyledBody>
      </Card>
    );
  }

  return (
    <div>
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
    </div>
  );
}

export default ProductNew;
