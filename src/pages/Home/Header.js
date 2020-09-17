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

import { Small, Medium, Large } from "../../mediaQueries";
import { FlexGrid } from "baseui/flex-grid";
import styled from "styled-components";

function Header() {
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
  const drawerStyles = css({
    display: "flex",
    flexDirection: "column",
  });

  const drawerItemStyles = css({
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    textDecoration: "none",
    ":visited": {
      textDecoration: "none",
    },
    // ":hover": {
    //   textDecoration: "none",
    // },
    // ":focus": {
    //   textDecoration: "none",
    // },
    // ":active": {
    //   textDecoration: "none",
    // },
    borderRightStyle: "none",
    borderBottomStyle: "none",
    borderLeftStyle: "none",
    borderTopStyle: "none",
  });

  const drawerIconStyles = css({
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    // justifycontent: "center",
    alignSelf: "center",
  });

  const redirect = (addr) => {
    return (
      <div>
        <Redirect push to={`${addr}`} />
      </div>
    );
  };
  const renderDrawerContent = () => {
    return (
      <div className={drawerStyles}>
        <div className={drawerIconStyles}>
          Olá, Anderson
          <Avatar
            name="Jane Doe"
            size="scale1200"
            src="https://api.adorable.io/avatars/285/10@adorable.io.png"
          />
        </div>
        {/* This link removes one weird bug, let this here for the love of god! */}
        <a href="www.google.com" />
        <Link to="/cart" className={drawerItemStyles}>
          <i className="material-icons">
            <StyledIcon theme={theme}>shopping_cart</StyledIcon>
          </i>
          <Block paddingLeft="5vw">
            <Paragraph2>Meu carrinho</Paragraph2>
          </Block>
        </Link>

        <Link to="/history" className={drawerItemStyles}>
          <i className="material-icons">
            <StyledIcon theme={theme}>loyalty</StyledIcon>
          </i>
          <Block paddingLeft="5vw">
            <Paragraph2>Lista de desejos</Paragraph2>
          </Block>
        </Link>

        <Link to="/wishes" className={drawerItemStyles}>
          <i className="material-icons">
            <StyledIcon theme={theme}>history</StyledIcon>
          </i>
          <Block paddingLeft="5vw">
            <Paragraph2>Historico de compras</Paragraph2>
          </Block>
        </Link>
      </div>
    );
  };

  return (
    <div>
      <Small>
        {/* <HeaderNavigation>
          <NavigationList $align={ALIGN.center}>
            
          </NavigationList>
        </HeaderNavigation> */}
        <HeaderNavigation>
          <NavigationList $align={ALIGN.left}>
            <NavigationItem>E-commerce</NavigationItem>
          </NavigationList>
          <NavigationList $align={ALIGN.center}></NavigationList>

          <NavigationList $align={ALIGN.right}>
            <Menu onClick={() => setDrawer(true)} />
            {drawer && (
              <Drawer
                isOpen={drawer}
                autoFocus
                onClose={() => setDrawer(false)}
              >
                {renderDrawerContent()}
              </Drawer>
            )}

            {/* <NavigationItem>
            </NavigationItem>
            <NavigationItem>
            </NavigationItem> */}
          </NavigationList>
        </HeaderNavigation>
      </Small>

      <Large>
        <HeaderNavigation>
          <NavigationList $align={ALIGN.left}>
            <NavigationItem ref={targetRef}>Miranda E-Commerce</NavigationItem>
          </NavigationList>
          <NavigationList $align={ALIGN.center}>
            <NavigationItem ref={targetRef0}>
              <div></div>
            </NavigationItem>
          </NavigationList>
          <NavigationList $align={ALIGN.right}>
            <div>
              <Link {...linkProps} to="/user">
                Olá, Anderson
                <Avatar
                  name="Jane Doe"
                  size="scale1200"
                  src="https://api.adorable.io/avatars/285/10@adorable.io.png"
                />
              </Link>
            </div>
          </NavigationList>
          <NavigationList $align={ALIGN.right}>
            <NavigationItem>
              <i className="material-icons">
                <StyledIcon theme={theme}>loyalty</StyledIcon>
              </i>
            </NavigationItem>
            <NavigationItem>
              <i className="material-icons">
                <StyledIcon theme={theme}>shopping_cart</StyledIcon>
              </i>
            </NavigationItem>
          </NavigationList>
        </HeaderNavigation>
      </Large>

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

export { Header };
