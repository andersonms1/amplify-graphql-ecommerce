import React from "react";
import ContentLoader from "react-content-loader";
import { useMediaQuery } from "react-responsive";
import { useStyletron } from "baseui";

function Loader() {
  const [, theme] = useStyletron();
  const isLarge = useMediaQuery({
    query: `(min-width: ${theme.breakpoints.large - 136}px)`,
  });
  return (
    <div style={{ display: "flex" }}>
      {!isLarge ? (
        <ContentLoader
          speed={2}
          width="100vw"
          height="100%"
          viewBox="0 0 150 500"
          backgroundColor="#f3f3f3"
          foregroundColor="#ecebeb"
        >
          <rect x="0" y="131" rx="0" ry="0" width="139" height="26" />
          <rect x="0" y="0" rx="0" ry="0" width="141" height="122" />
          <rect x="0" y="165" rx="0" ry="0" width="139" height="77" />
        </ContentLoader>
      ) : (
        <ContentLoader
          speed={2}
          width="100vw"
          height="100%"
          viewBox="0 0 1000 460"
          backgroundColor="#f3f3f3"
          foregroundColor="#ecebeb"
          style={{
            width: "100vw",
            maxWidth: "100%",
            height: "auto",
            flexGrow: "1",
            flexShrink: "1",
          }}
          className={{ flexGrow: "1", flexShrink: "1" }}
        >
          <rect x="5" y="1" rx="2" ry="2" width="272" height="396" />
          <rect x="321" y="5" rx="0" ry="0" width="260" height="60" />
          <rect x="323" y="96" rx="0" ry="0" width="261" height="160" />
          <rect x="495" y="175" rx="0" ry="0" width="21" height="4" />
          <rect x="325" y="301" rx="0" ry="0" width="261" height="31" />
          <rect x="324" y="357" rx="0" ry="0" width="261" height="31" />
        </ContentLoader>
      )}
    </div>
  );
}

export default Loader;
