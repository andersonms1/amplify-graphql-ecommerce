import React from "react";
import { Wrapper } from "../components";
import { Layer } from "baseui/layer";

function handleLoad(content, contentLoader, imgsDidLoad) {
  if (imgsDidLoad === false) {
    return (
      <>
        <Layer>
          <Wrapper>{contentLoader}</Wrapper>
          {content}
        </Layer>
      </>
    );
  } else {
    return content;
  }
}

export default handleLoad;
