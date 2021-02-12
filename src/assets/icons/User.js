import React from "react";

const User = ({ ...props }) => {
  return (
    <svg
      width="32"
      height="32"
      viewBox="0 0 32 32"
      // fill="none"
      // xmlns="http://www.w3.org/2000/svg"
      // width="20"
      // height="22"
      // viewBox="0 0 20 22"
      fill="none"
      stroke="currentColor"
      {...props}
    >
      <path
        d="M16 20C18.7614 20 21 17.7614 21 15C21 12.2386 18.7614 10 16 10C13.2386 10 11 12.2386 11 15C11 17.7614 13.2386 20 16 20Z"
        stroke="black"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M26 5H6C5.44772 5 5 5.44772 5 6V26C5 26.5523 5.44772 27 6 27H26C26.5523 27 27 26.5523 27 26V6C27 5.44772 26.5523 5 26 5Z"
        stroke="black"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M7.22314 27C7.67684 25.0115 8.7923 23.236 10.3869 21.9643C11.9814 20.6926 13.9605 20 16.0001 20C18.0397 20 20.0188 20.6926 21.6134 21.9643C23.2079 23.236 24.3234 25.0115 24.7771 27"
        stroke="black"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default User;
