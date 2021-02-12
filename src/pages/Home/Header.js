import React, { useState, useContext } from "react";
import { useStyletron } from "baseui";
import {
  HeaderNavigation,
  ALIGN,
  StyledNavigationItem as NavigationItem,
  StyledNavigationList as NavigationList,
} from "baseui/header-navigation";

import { ListItem, ListItemLabel, ARTWORK_SIZES } from "baseui/list";
import { Check } from "baseui/icon";
import { ChevronRight } from "baseui/icon";
import Cart from "../../pages/Payment/Checkout/Cart";
import { ChevronLeft } from "baseui/icon";

import { Link } from "react-router-dom";
import { ShoppingBagOpen, List } from "phosphor-react";
import { Drawer } from "baseui/drawer";
import { Block } from "baseui/block";
import { Display4, H2, H4, H5, H6, Paragraph2 } from "baseui/typography";
import { Button, KIND, SIZE, SHAPE } from "baseui/button";
import { linkProps, StyledIcon } from "./index";
import { Small, Large } from "../../mediaQueries";

import HeaderContext from "../../context/HeaderContext";
import HeaderSmallMedium from "./HeaderSmallMedium";

function Header() {
  const [css, theme] = useStyletron();
  const { isDrwCart, isDrwMenu, setIsDrwCart, setIsDrwMenu } = useContext(
    HeaderContext
  );

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

  const renderDebugger = () => {};

  const DrawerItem = ({ icon, text }) => {
    return (
      <div
        className={css({
          display: "flex",
          flexDirection: "row",
          flexWrap: "wrap",
        })}
      >
        <i className="material-icons">
          <StyledIcon theme={theme}>{icon}</StyledIcon>
        </i>

        <Paragraph2 marginTop="0px" marginLeft="5vw">
          {text}
        </Paragraph2>
      </div>
    );
  };

  const renderDrawerCart = () => {
    return (
      <div>
        <Drawer
          isOpen={isDrwCart}
          onClose={() => setIsDrwCart(false)}
          size={SIZE.default}
          // anchor={ANCHOR.default}
        >
          <H4>Finalizar compras?</H4>

          <Button
            onClick={() => {
              setIsDrwCart(false);
              console.log(isDrwCart);
            }}
            startEnhancer={() => <ChevronLeft />}
            endEnhancer={undefined}
            kind={KIND.primary}
            size={SIZE.default}
            shape={SHAPE.default}
          >
            Não
          </Button>
          {/* <Cart /> */}
        </Drawer>
      </div>
    );
  };

  const renderHeader = () => {
    return (
      <>
        <Small>
          <HeaderSmallMedium />
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
