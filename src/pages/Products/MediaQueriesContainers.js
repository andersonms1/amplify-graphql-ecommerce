import React, { useState } from "react";
import { useMediaQuery } from "react-responsive";
import { useStyletron } from "baseui";

const OFFSET = 300;

const Small = ({ children }) => {
  const [css, theme] = useStyletron();
  const { breakpoints } = theme;

  return (
    useMediaQuery({
      query: `(max-width: ${breakpoints.small + OFFSET}px)`,
    }) && <div>{children}</div>
  );
};

const Medium = ({ children }) => {
  const [css, theme] = useStyletron();
  const { breakpoints } = theme;

  return (
    useMediaQuery({
      query: `(min-width: ${
        breakpoints.small + 1 + OFFSET
      }px) and (max-width: ${breakpoints.large - 1}px)`,
    }) && <div>{children}</div>
  );
};
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

export { Small, Medium, Large };
