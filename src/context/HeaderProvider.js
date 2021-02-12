import React, { useState } from "react";
import HeaderContext from "./HeaderContext";

const HeaderProvider = ({ children }) => {
  const setIsDrwCart = (isDrwCart) => {
    setAppContext((prevState) => {
      return {
        ...prevState,
        isDrwCart,
      };
    });
  };

  const setIsDrwMenu = (isDrwMenu) => {
    setAppContext((prevState) => {
      return {
        ...prevState,
        isDrwMenu,
      };
    });
  };

  const setIsDrwOptions = (isDrwOptions) => {
    setAppContext((prevState) => {
      return {
        ...prevState,
        isDrwOptions,
      };
    });
  };

  const setQuerie = (querie) => {
    setAppContext((prevState) => {
      return {
        ...prevState,
        querie,
      };
    });
  };

  const appState = {
    isDrwCart: false,
    setIsDrwCart,
    isDrwMenu: false,
    setIsDrwMenu,
    isDrwOptions: false,
    setIsDrwOptions,
    querie: {},
    setQuerie,
  };

  const [appContext, setAppContext] = useState(appState);
  return (
    <HeaderContext.Provider value={appContext}>
      {children}
    </HeaderContext.Provider>
  );
};

export default HeaderProvider;
