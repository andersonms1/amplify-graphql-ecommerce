import { StyledSpinnerNext } from "baseui/spinner";
import { useStyletron } from "baseui";
import React from "react";

function Spinner() {
  const [css] = useStyletron();
  const centralize = css({
    flexGrow: "1",
    flexShrink: "1",
    flexBasis: "100%",
    background: "yellow",
    width: "100vw",
    height: "100vh",
    // height: "100%",
    // paddingTop: "40vh",
    // display: "flex",
    // flexDirection: "column",
    // alignItems: "center",
    // justifyContent: "center",
  });

  return (
    <div style={{ display: "flex" }}>
      <div className={centralize}>
        <StyledSpinnerNext />
      </div>
    </div>
  );
}

export { Spinner };
