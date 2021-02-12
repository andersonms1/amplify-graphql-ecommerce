import React, { createContext } from "react";

const HeaderContext = createContext({
  isDrwCart: false,
  setIsDrwCart: () => {},
  isDrwMenu: false,
  setIsDrwMenu: () => {},
  isDrwOptions: false,
  setIsDrwOptions: () => {},
  querie: {},
  setQuerie: () => {},
});

export default HeaderContext;
