import React, { useState } from "react";
import { useMediaQuery } from "react-responsive";
import { useStyletron } from "baseui";

const Small = ({ children }) => {
  const [css, theme] = useStyletron();
  const { breakpoints } = theme;
  const small = useMediaQuery({
    query: `(max-width: ${breakpoints.small}px)`,
  });
  const handheld = useMediaQuery({
    query: `(min-width: 1px) and (max-width: ${breakpoints.large - 1}px) `,
    type: `(handheld)`,
  });

  const handleSmallHand = () => {
    if (small) {
      return children;
    } else if (handheld) {
      return children;
    }
  };
  return <div>{handleSmallHand()}</div>;
};

// const Medium = ({ children }) => {
//   const [css, theme] = useStyletron();
//   const { breakpoints } = theme;

//   const medium = useMediaQuery({
//     query: `(min-width: ${breakpoints.small + 1}px) and (max-width: ${
//       breakpoints.large - 1
//     }px)`,
//   });

//   const handheld = useMediaQuery({
//     query: `(min-width: 1px) and (max-width: ${breakpoints.large - 1}px) `,
//     type: `(handheld)`,
//   });

//   const handleMedium = () => {
//     if (handheld) {
//       return;
//     } else if (medium) {
//       return children;
//     }
//   };

//   return <div>{handleMedium()}</div>;
// };

const Large = ({ children }) => {
  const [css, theme] = useStyletron();
  const { breakpoints } = theme;

  return (
    <>
      {useMediaQuery({
        query: `(min-width: ${breakpoints.large}px)`,
      }) && <div>{children}</div>}
    </>
  );
};

export { Small, Large };
