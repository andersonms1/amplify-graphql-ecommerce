import React from "react";
import { useStyletron } from "baseui";
export const useStyles = () => {
  const [css, theme] = useStyletron();

  // return [
  //   {
  //     containerStyles: css({
  //       display: "flex",
  //       flexDirection: "row",
  //       alignItems: "flex-start", // heigh of details
  //       justifyContent: "center",
  //       alignContent: "center",
  //     }),
  //   },
  //   {
  //     itemStyles: css({
  //       flexGrow: "0",
  //       flexBasis: "auto",
  //       paddingRight: "5px",
  //       paddingLeft: "5px",
  //     }),
  //   },
  //   {
  //     detailsContainerStyes: css({
  //       width: "30vw",
  //       height: "auto",
  //     }),
  //   },
  //   {
  //     imgStyles: css({
  //       width: "30vw",
  //       height: "auto",
  //     }),
  //   },
  // ];
  return {
    containerStyles: css({
      display: "flex",
      flexDirection: "row",
      alignItems: "flex-start", // heigh of details
      justifyContent: "center",
      alignContent: "center",
    }),
    itemStyles: css({
      flexGrow: "0",
      flexBasis: "auto",
      paddingRight: "5px",
      paddingLeft: "5px",
    }),
    detailsContainerStyes: css({
      width: "30vw",
      height: "auto",
    }),
    imgStyles: css({
      width: "40vw",
      height: "auto",
    }),
  };
};
