import styled, { css } from "styled-components";

/*  Props */

export const linkProps = {
  style: {
    textDecoration: "none",
    color: "inherit",
  },
};

/*  Styles */

export const StyledIcon = styled.div`
  ${(props) => css`
    color: ${props.theme.colors.primary};
    fontsize: ${props.theme.sizing.scale800};
  `}
`;

export const StyledButtonIcon = styled(StyledIcon)`
  ${(props) => css`
    color: ${props.theme.colors.primaryB};
    fontsize: ${props.theme.sizing.scale800};
  `}
`;

/*  Constants */

export const POSITION = {
  horizontal: "horizontal",
  vertical: "vertical",
};

export const KIND = {
  primary: "primary",
  secondary: "secondary",
};

export const DATA = [
  {
    id: 1,
  },
  {
    id: 2,
  },
  {
    id: 3,
  },
  {
    id: 4,
  },
  {
    id: 5,
  },
  {
    id: 6,
  },
  {
    id: 7,
  },
  {
    id: 8,
  },
];
