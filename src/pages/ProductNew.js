import React from "react";
import { FlexGrid, FlexGridItem } from "baseui/flex-grid";
import { Card, StyledBody, StyledAction, StyledThumbnail } from "baseui/card";
import { Button } from "baseui/button";
import { useStyletron } from "baseui";
import { AspectRatioBox, AspectRatioBoxBody } from "baseui/aspect-ratio-box";

import { PHOTO_AHMED } from "../assets/imgs";

function ProductNew() {
  const [css, theme] = useStyletron();
  const iconStyles = css({
    color: `${theme.colors.primary}`,
    fontSize: `${theme.sizing.scale800}`,
  });

  const backgroundImageStyled = css({
    width: "100%",
  });

  const itemProps = {
    backgroundColor: "mono300",
    height: "scale4800",
    // display: 'flex',
    // alignItems: 'center',
    // justifyContent: 'center',
  };

  const bodyProps = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    overrides: {
      Block: {
        style: {
          borderLeftStyle: "solid",
          borderRightStyle: "solid",
          borderTopStyle: "solid",
          borderBottomStyle: "solid",
          borderLeftWidth: "2px",
          borderTopWidth: "2px",
          borderRightWidth: "2px",
          borderBottomWidth: "2px",
          borderLeftColor: `grey`,
          borderTopColor: `grey`,
          borderRightColor: `grey`,
          borderBottomColor: `grey`,
        },
      },
    },
  };
  return (
    <FlexGrid
      flexGridColumnCount={4}
      flexGridColumnGap="scale800"
      flexGridRowGap="scale800"
    >
      <FlexGridItem {...itemProps}>
        <Card
          overrides={{
            Root: {
              style: {
                backgroundImage: `${PHOTO_AHMED}`,
              },
            },
          }}
          title=""
        >
          <StyledAction>
            <i className="material-icons">
              <div className={iconStyles}>loyalty</div>
            </i>
            <i className="material-icons">
              <div className={iconStyles}>shopping_cart</div>
            </i>
            <i className="material-icons">
              <div className={iconStyles}>visibility</div>
            </i>
          </StyledAction>
        </Card>
      </FlexGridItem>
      <FlexGridItem>
        <AspectRatioBox aspectRatio={16 / 9}>
          <AspectRatioBoxBody {...bodyProps}>
            16:9 aspect ratio
          </AspectRatioBoxBody>
        </AspectRatioBox>
      </FlexGridItem>
      <FlexGridItem>
        <AspectRatioBox aspectRatio={4 / 5}>
          <AspectRatioBoxBody>
            <Card
              overrides={{
                Root: {
                  style: {
                    backgroundImage: `url(${PHOTO_AHMED})`,
                  },
                },
              }}
              title=""
            >
              <StyledAction>
                <i className="material-icons">
                  <div className={iconStyles}>loyalty</div>
                </i>
                <i className="material-icons">
                  <div className={iconStyles}>shopping_cart</div>
                </i>
                <i className="material-icons">
                  <div className={iconStyles}>visibility</div>
                </i>
              </StyledAction>
            </Card>
          </AspectRatioBoxBody>
        </AspectRatioBox>
      </FlexGridItem>

      <FlexGridItem>
        <FlexGridItem>
          <AspectRatioBox aspectRatio={4 / 5}>
            <AspectRatioBoxBody>
              <img className={backgroundImageStyled} src={PHOTO_AHMED} />
            </AspectRatioBoxBody>
          </AspectRatioBox>
        </FlexGridItem>
      </FlexGridItem>
      <FlexGridItem>
        <FlexGridItem>
          <AspectRatioBox aspectRatio={5 / 4}>
            <AspectRatioBoxBody {...bodyProps}>
              5:4 aspect ratio
            </AspectRatioBoxBody>
          </AspectRatioBox>
        </FlexGridItem>
      </FlexGridItem>
      <FlexGridItem>6</FlexGridItem>
    </FlexGrid>
  );
}

export default ProductNew;
