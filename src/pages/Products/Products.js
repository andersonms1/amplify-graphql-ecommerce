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
import Storage from "@aws-amplify/storage";
import API, { graphqlOperation } from "@aws-amplify/api";
import { listProducts } from "../../graphql/queries";
import { ProductContext } from "../../context/products";
import { StyledIcon, StyledButtonIcon, CARD_TYPES, DATA } from "../Home";
import { PHOTO_AHMED, PHOTO_HILL } from "../../assets/imgs";

function Products() {
  const [css, theme] = useStyletron();
  const { breakpoints } = theme;
  const [photos, setPhotos] = React.useState();
  const { products } = React.useContext(ProductContext);
  const priceButtonStyles = css({
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  });

  React.useEffect(() => {
    console.log(products);
  }, [products]);

  const loadPhotos = async (key) => {
    const image = await Storage.get(key, { level: "public" });
    console.log(image);
    return image;
  };

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

  function renderGrid() {
    return products.map((item, index) => {
      return <FlexGridItem key={item.id}>{renderCard(item)}</FlexGridItem>;
    });
  }

  function renderCard(item) {
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
            {console.log(item.photos[0].key)}
            <StyledHeaderImage
              className={css({ borderStyle: "none" })}
              src={require(loadPhotos(item.photos[0].key))}

              // src={`${loadPhotos(item.photos[0].key)}`}
              // src="https://ecommerce-images-product101337-dev.s3.amazonaws.com/public/images/6247fc76-f4bd-4cd0-a09c-560b03d8c7d8crop-ahmed-carter.jpg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIA4WLJ6QFFEA54VXF2%2F20200901%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20200901T160049Z&X-Amz-Expires=900&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEID%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLWVhc3QtMSJGMEQCIAnh78XRqnV8Iort2XLO3qwf6yudAJQbph7t1%2BKMfM8lAiBDOGvQQeQtPdty6J0t2gzb2YSmiedRWEq8v9yyOHtaSCrEBAh5EAEaDDg3MjYzNzQzMjEzOCIME0Uu%2FuflU75geo3TKqEE%2FGnyLTuCxsBQE4bKu5zA8za7M0E9xHYyIbo3eHtEQnD6AMh7x1T8m6r3wIvpu8ePFqVbB3V4ycHFLIfKjHvyAxo5BQlDFf9Q%2FDv0SJcj6zSNZB5yVfIhjRbNMxAQTr9pw%2BFqB%2BhsglF%2B1%2FP0wTnTaMpH%2FEhCjwjbxIXo1il5GtabC%2F7usr07SbHT6LluCkUdO1cISKM4PZapb3YIa75UWKKyUDm5HOSx4ciTDIau2KIZnmzRnHwpSaHygwBTL3TCULNmD7zdG4YORG7%2BZRmStZSroZHJpuBtIRSDeOxAJ68L8u4x%2F1v0n6Wk64CLbkSw1nua3amX9WZ3Sls7GcC4hZwx0yT6XowH7GKlJE1Qx7g1pvl4xgaLhJmGl86SljkhS5Os3KA50qjTv%2Ba3lphZB748vO687%2BidZ74Z0a6fzPKly28IZlvJOg1y2ZWKit15WCz%2FLB3EPMcDVEVxJ77FhvzSFB8oaXqUHLEbt44%2F2eY3gNaVyuoAAQ2hwh1Lm%2BU7PNDk6zFgvGrX7VdMXR1AXke3D3CCO01BFagrXraEQceiCR87vtQ%2BlAWqBs4IV0F3vL%2FR8DIxceDKLNWXrsK0sbo%2F80vu%2FSz38R8DfIA3XeXeUv8%2FQSSj2jjn3zKSdmK3J96iIPacfMPNgRK7b9V%2FNUS6lEd54qET6wPHk9z3%2Fc2bLZvByq%2Fu8E3%2B8XXbS63p44XuFrFdIw6N2%2FxY1KRo7tkwsOC5%2BgU6hgLHHY3bulXXOm46DZHmdTbWalrkck2I3x2OrDXIFrI38JXy2nDu074ik1HwpZbc%2B5pv6fcVhfLagYmCqHh6zQZw2t4fuLPBGNu72RLJROEz5mZiBYCMRHulM%2FS3WNsjIHDjj8e6RxuPal1oJbSQftPzzUt9ouDYJtXY70btSoB%2B20yfTNq5WkdYjSaiwGQSUJ%2FFvdAXcGoZzl7Rn7PcsumGlYbYpoDxYmc8CHag64K3S%2FV%2F9%2FklEMSaIjsR87X8H%2FygUAT4Mx7P%2BJWo9uoXy0mZspUfrAn8OQlhMBzWfg87X27acihBazGNGXzCBg5XIsxDrlpZPBObIhtY0zlrwt7tnnmW8ejc&X-Amz-Signature=6d31479a96fd0c52fbf2dfac40109ce8f1f70b46ecf095c4bd6d3a1fbdf4137e&X-Amz-SignedHeaders=host&x-amz-user-agent=aws-sdk-js-v3-%40aws-sdk%2Fclient-s3%2F1.0.0-gamma.4%20Mozilla%2F5.0%20%28X11%3B%20Linux%20x86_64%29%20AppleWebKit%2F537.36%20%28KHTML%2C%20like%20Gecko%29%20Chrome%2F85.0.4183.83%20Safari%2F537.36%20aws-amplify%2F3.4.5%20js&x-id=GetObject"
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
            {renderGrid()}
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
            {renderGrid()}
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
            {renderGrid()}
          </FlexGrid>
        )}
      </Layer>
    </div>
  );
}

export default Products;
