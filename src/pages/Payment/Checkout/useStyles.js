import React from "react";
import { useStyletron } from "baseui";
export const useStyles = () => {
  const [css, theme] = useStyletron();

  return {
    containerStyles: css({
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
    }),
  };
};
