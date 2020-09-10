import React from "react";
import { useMediaQuery } from "react-responsive";
import { useStyletron } from "baseui";
const Small = ({ children }) => {
  const [css, theme] = useStyletron();
  const { breakpoints } = theme;

  return (
    <>
      {useMediaQuery({
        query: `(max-width: ${breakpoints.small}px)`,
      }) && <div>{children}</div>}
    </>
  );
};

const Medium = ({ children }) => {
  const [css, theme] = useStyletron();
  const { breakpoints } = theme;

  return (
    <>
      {useMediaQuery({
        query: `(min-width: ${breakpoints.small + 1}px) and (max-width: ${
          breakpoints.large - 1
        }px) `,
      }) && <div>{children}</div>}
    </>
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
