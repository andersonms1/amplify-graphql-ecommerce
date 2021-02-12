import React from "react";

// import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import { img1, img2, img3 } from "../../assets/imgs/home";
import { useStyletron } from "baseui";

function CarouselHome() {
  const getConfigurableProps = () => ({
    autoPlay: true,
    infiniteLoop: true,
    swipeable: true,
    showThumbs: false,
    showIndicators: true,
    showStatus: false,
    dynamicHeight: true,
    // interval: 3000,
    // showArrows: boolean('showArrows', true, tooglesGroupId),
    // useKeyboardArrows: boolean('useKeyboardArrows', true, tooglesGroupId),
    // stopOnHover: boolean('stopOnHover', true, tooglesGroupId),
    // emulateTouch: boolean('emulateTouch', true, tooglesGroupId),
    // thumbWidth: number('thumbWidth', 100, {}, valuesGroupId),
    // selectedItem: number('selectedItem', 0, {}, valuesGroupId),
    // transitionTime: number('transitionTime', 150, {}, valuesGroupId),
    // swipeScrollTolerance: number('swipeScrollTolerance', 5, {}, valuesGroupId),
  });
  const [css, theme] = useStyletron();
  const imgStl = css({
    // width: "auto",
    width: "100%",
    height: "auto",
    maxWidth: "100%",
    maxHeight: "80vh",
    display: "block",
    marginLeft: "auto",
    marginRight: "auto",
  });

  const iterateImages = () => {
    return (
      <>
        <div className={imgStl}>
          <img src={img1} />
        </div>
        <div className={imgStl}>
          <img src={img2} />
        </div>
        <div className={imgStl}>
          <img src={img3} />
        </div>
      </>
    );
  };

  return (
    <Carousel {...getConfigurableProps()}>
      <div className={imgStl}>
        <img src={img1} />
      </div>
      <div className={imgStl}>
        <img src={img2} />
      </div>
      <div className={imgStl}>
        <img src={img3} />
      </div>
    </Carousel>
  );
}

export default CarouselHome;
