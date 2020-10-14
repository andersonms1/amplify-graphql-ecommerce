import React, { createContext } from "react";

const AppContext = createContext({
  items: [],
  updateItems: () => {},
});

export default AppContext;
