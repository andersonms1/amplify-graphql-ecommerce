import React from "react";

const Hamburguer = ({ ...props }) => {
  return (
    <svg
      width="32"
      height="32"
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M21 18H3V16H21V18ZM21 13H3V11H21V13ZM21 8H3V6H21V8Z"
        fill="black"
        // stroke="black"
        // strokeWidth="1.5"
        // strokeLinecap="round"
        // strokeLinejoin="round"
      />
    </svg>
  );
};

export default Hamburguer;
