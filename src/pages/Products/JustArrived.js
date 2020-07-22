import React, { Fragment } from "react";
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

import { StyledIcon, StyledButtonIcon } from "../Home";
import { PHOTO_AHMED } from "../../assets/imgs";
import { ASPECT_RATIO } from "../../assets/util";

function ProductNew() {
  const [css, theme] = useStyletron();
  const { breakpoints } = theme;

  const priceButtonStyles = css({
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  });

  function renderCard() {
    return (
      <Card
        headerImage={PHOTO_AHMED}
        overrides={{
          Root: { style: {} },
          HeaderImage: { style: { height: "30vh" } },
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
          <p>
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
                    <StyledButtonIcon theme={theme}>
                      visibility
                    </StyledButtonIcon>
                  </i>
                )}
              />
            </div>
          </p>
        </StyledBody>
      </Card>
    );
  }

  return (
    <FlexGrid
      flexGridColumnCount={4}
      flexGridColumnGap="scale800"
      flexGridRowGap="scale800"
    >
      <FlexGridItem>
        <AspectRatioBox aspectRatio={ASPECT_RATIO}>
          <AspectRatioBoxBody>
            <div>{renderCard()}</div>
          </AspectRatioBoxBody>
        </AspectRatioBox>
      </FlexGridItem>
      <FlexGridItem>
        <AspectRatioBox aspectRatio={ASPECT_RATIO}>
          <AspectRatioBoxBody>{renderCard()}</AspectRatioBoxBody>
        </AspectRatioBox>
      </FlexGridItem>
      <FlexGridItem>
        <AspectRatioBox aspectRatio={ASPECT_RATIO}>
          <AspectRatioBoxBody>{renderCard()}</AspectRatioBoxBody>
        </AspectRatioBox>
      </FlexGridItem>

      <FlexGridItem>
        <AspectRatioBox aspectRatio={ASPECT_RATIO}>
          <AspectRatioBoxBody>{renderCard()}</AspectRatioBoxBody>
        </AspectRatioBox>
      </FlexGridItem>
      <FlexGridItem>
        <AspectRatioBox aspectRatio={ASPECT_RATIO}>
          <AspectRatioBoxBody>{renderCard()}</AspectRatioBoxBody>
        </AspectRatioBox>
      </FlexGridItem>
      <FlexGridItem>
        <AspectRatioBox aspectRatio={ASPECT_RATIO}>
          <AspectRatioBoxBody>{renderCard()}</AspectRatioBoxBody>
        </AspectRatioBox>
      </FlexGridItem>
    </FlexGrid>
  );
}

export default ProductNew;
