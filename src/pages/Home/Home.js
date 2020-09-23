import React, { useRef, useLayoutEffect, useState, useEffect } from "react";
import {
  HeaderNavigation,
  ALIGN,
  StyledNavigationItem as NavigationItem,
  StyledNavigationList as NavigationList,
} from "baseui/header-navigation";

import { Avatar } from "baseui/avatar";
import { useStyletron } from "baseui";
import { Link, Redirect } from "react-router-dom";
import { StyledLink as L } from "baseui/link";
// import { Tabs, Tab } from "baseui/tabs";
import { Tabs, Tab, FILL, ORIENTATION } from "baseui/tabs-motion";
import { useMediaQuery } from "react-responsive";
import Menu from "baseui/icon/menu";
import { StatefulMenu } from "baseui/menu";
import { Drawer } from "baseui/drawer";
import { Block } from "baseui/block";
import { Paragraph2 } from "baseui/typography";
import { Accordion, Panel } from "baseui/accordion";

import { linkProps, StyledIcon } from "./index";
import { Products, CreateUpdate } from "../index";

import { Small, Large } from "../../mediaQueries";
import { FlexGrid } from "baseui/flex-grid";
import styled from "styled-components";
import Header from "./Header";

function Home() {
  const [css, theme] = useStyletron();
  const [activeKey, setActiveKey] = React.useState("0");
  const [keySide, setKeySide] = React.useState(0);
  const [admin, setAdmin] = useState(false);
  const [modal, setModal] = useState(false);
  // const [redirect, setRedirect] = useState(false);
  const { breakpoints } = theme;
  const [drawer, setDrawer] = useState(false);

  const targetRef = useRef();
  const targetRef0 = useRef();

  React.useEffect(() => {
    console.log("Teste");
    setAdmin(false);
    // console.log(theme);
  }, []);

  // https://stackoverflow.com/questions/49058890/how-to-get-a-react-components-size-height-width-before-render
  // useLayoutEffect(() => {
  //   console.log(targetRef.current.offsetWidth);
  //   console.log(targetRef0.current.offsetWidth);
  // }, []);

  return (
    <div>
      <Header />

      {admin ? (
        <Tabs
          onChange={({ activeKey }) => {
            setActiveKey(activeKey);
          }}
          activeKey={activeKey}
          // fill={FILL.fixed}
        >
          <Tab title="PRODUTOS">
            <div onClick={() => setModal(true)}>
              <Link to="/products/10">
                <p>Novo produto</p>
              </Link>
            </div>
          </Tab>
          <Tab title="AGENDAMENTOS">
            <p>Agendamentos</p>
          </Tab>
          <Tab title="COMPRAS">
            <p>Compras</p>
          </Tab>
        </Tabs>
      ) : (
        <Tabs
          onChange={({ activeKey }) => {
            setActiveKey(activeKey);
          }}
          activeKey={activeKey}
          // fill={FILL.fixed}
        >
          <Tab title="HOME">
            <Products />
            {/* <div> Working on Header responsitivity</div> */}
          </Tab>
          <Tab title="MASCULINO">{/* <Products /> */}</Tab>
          <Tab title="FEMININO">{/* <Products /> */}</Tab>
          <Tab title="INFANTIL">{/* <Products /> */}</Tab>
          <Tab title="PROMOÇÕES">{/* <Products /> */}</Tab>
        </Tabs>
      )}
    </div>
  );
}

export { Home };
