import React, { useState } from "react";
import { useStyletron } from "baseui";
import {
  HeaderNavigation,
  ALIGN,
  StyledNavigationItem as NavigationItem,
  StyledNavigationList as NavigationList,
} from "baseui/header-navigation";

import { Avatar } from "baseui/avatar";
import { Link } from "react-router-dom";
import Menu from "baseui/icon/menu";
import { Drawer } from "baseui/drawer";
import { Block } from "baseui/block";
import { Paragraph2 } from "baseui/typography";

import { linkProps, StyledIcon } from "./index";

import { Small, Large } from "../../mediaQueries";

function Header() {
  const [css, theme] = useStyletron();
  const [drawer, setDrawer] = useState(false);

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

  const renderDrawerContent = () => {
    return (
      <div className={drawerStyles}>
        <div className={drawerIconStyles}>
          Olá, Anderson
          {/* <Avatar
            name="Anderson Silva"
            size="scale1200"
            src="https://api.adorable.io/avatars/285/10@adorable.io.png"
          /> */}
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

  const renderHeader = () => {
    return (
      <>
        <Small>
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
            </NavigationList>
          </HeaderNavigation>
        </Small>

        <Large>
          <HeaderNavigation>
            <NavigationList $align={ALIGN.left}>
              <NavigationItem>Miranda E-Commerce</NavigationItem>
            </NavigationList>
            <NavigationList $align={ALIGN.center}>
              <NavigationItem>
                <div></div>
              </NavigationItem>
            </NavigationList>
            <NavigationList $align={ALIGN.right}>
              <div>
                <Link {...linkProps} to="/user">
                  Olá, Anderson
                  {/* <Avatar
                    name="Anderson Silva"
                    size="scale1200"
                    src="https://api.adorable.io/avatars/285/10@adorable.io.png"
                  /> */}
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
      </>
    );
  };

  return renderHeader();
}

export default Header;
