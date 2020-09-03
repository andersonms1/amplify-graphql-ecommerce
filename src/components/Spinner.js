import { Spinner as S } from "baseui/spinner";
import { useStyletron } from "baseui";
import React from "react";

function Spinner() {
  const [css, theme] = useStyletron();
  const centralize = css({
    // height: "100%",
    paddingTop: "40vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  });

  return (
    <div className={centralize}>
      <S />
    </div>
  );
}

export { Spinner };
