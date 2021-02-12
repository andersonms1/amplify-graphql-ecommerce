import React from "react";
import { useMediaQuery } from "react-responsive";
import { useStyletron } from "baseui";

export const useIsMediaLarge = () => {};

export const IsMediaLarge = () => {
  const [css, theme] = useStyletron();
  return useMediaQuery({
    query: `(min-width: ${theme.breakpoints.large}px)`,
  });
};

export const MediaQuerie = (all, small, medium, large) => {
  const [css, theme] = useStyletron();
  const isLarge = useMediaQuery({
    query: `(min-width: ${theme.breakpoints.large}px)`,
  });
  const isSmall = useMediaQuery({
    query: `(max-width: ${theme.breakpoints.small}px)`,
  });

  if (isSmall) {
    return all + " " + small;
  } else if (!isLarge) {
    return all + " " + medium;
  } else {
    return all + " " + large;
  }
};

export const ResponsiveProperty = (responsive, large, small) => {
  const isLarge = useMediaQuery({
    query: `(min-width: ${large}px)`,
  });
  const isSmall = useMediaQuery({
    query: `(max-width: ${small}px)`,
  });

  if (isSmall) {
    return responsive[0];
  } else if (!isLarge) {
    return responsive[1];
  } else {
    return responsive[2];
  }
};

export const Large = ({ children }) => {
  const [css, theme] = useStyletron();
  return <div>{children}</div>;
};
