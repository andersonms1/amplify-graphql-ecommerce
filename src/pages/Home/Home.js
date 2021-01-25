import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { Tabs, Tab } from "baseui/tabs-motion";

import AppContext from "../../context/AppContext";
import { Products } from "../index";
import { Display4, H2 } from "baseui/typography";

import Pages from "./Pages";
import { Cell, Grid } from "baseui/layout-grid";
import { useStyletron } from "baseui";

import Categorys from "./Categorys";
function Home() {
  const { page, setPage } = useContext(AppContext);
  const [admin, setAdmin] = useState(false);
  const [css, theme] = useStyletron();

  return (
    <div>
      <Display4 paddingTop={theme.sizing.scale850}>Calçados</Display4>
      <Products querie="listProducts" />
      <p>Footer</p>
    </div>
  );
}

export { Home };
