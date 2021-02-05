import React, { createContext } from "react";

const HeaderContext = createContext({
  isDrwCart: false,
  setIsDrwCart: () => {},
  isDrwMenu: false,
  setIsDrwMenu: () => {},
});

export default HeaderContext;
