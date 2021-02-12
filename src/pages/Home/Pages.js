import React from "react";
import Categorys from "./Categorys";
import {
  H2,
  H5,
  H6,
  LabelLarge,
  LabelMedium,
  LabelSmall,
  LabelXSmall,
  Paragraph3,
  Paragraph4,
} from "baseui/typography";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";

function Pages() {
  const getConfigurableProps = () => ({
    autoPlay: true,
    infiniteLoop: true,
    swipeable: true,
    showThumbs: false,
    showIndicators: true,
    showStatus: false,
    // interval: 3000,
    // showArrows: boolean('showArrows', true, tooglesGroupId),
    // useKeyboardArrows: boolean('useKeyboardArrows', true, tooglesGroupId),
    // stopOnHover: boolean('stopOnHover', true, tooglesGroupId),
    // dynamicHeight: boolean('dynamicHeight', true, tooglesGroupId),
    // emulateTouch: boolean('emulateTouch', true, tooglesGroupId),
    // thumbWidth: number('thumbWidth', 100, {}, valuesGroupId),
    // selectedItem: number('selectedItem', 0, {}, valuesGroupId),
    // transitionTime: number('transitionTime', 150, {}, valuesGroupId),
    // swipeScrollTolerance: number('swipeScrollTolerance', 5, {}, valuesGroupId),
  });
  return (
    <div>
      <Categorys />
    </div>
  );
}

export default Pages;
