import React from "react";
import { useStyletron } from "baseui";

const Wrapper = (props) => {
  const [css, theme] = useStyletron();
  const { offset, color, children, forwardedRef, type } = props;

  return (
    <div
      className={css({
        position: "absolute",
        // top: offset || "46%",
        // left: offset || "46%",
        // width: '200px',
        // paddingBottom: '2px',
        // paddingRight: "20px",
        // textAlign: 'center',
        backgroundColor: `${theme.colors.backgroundPrimary}`,
      })}
      ref={forwardedRef}
    >
      {children}
    </div>
  );
};

const WrapperLoayalty = ({ children }) => {
  const [css, theme] = useStyletron();
  // const { offset, color, children, forwardedRef, type } = props;

  return (
    <div
      className={css({
        position: "absolute",
        // top: offset || "46%",
        // left: offset || "46%",
        // width: '200px',
        // paddingBottom: '2px',
        // paddingRight: "20px",
        // textAlign: 'center',
        // backgroundColor: color,
        paddingTop: `${theme.sizing.scale500}`,
        paddingLeft: `${theme.sizing.scale750}`,
      })}
    >
      {children}
    </div>
  );
};

export { Wrapper, WrapperLoayalty };
