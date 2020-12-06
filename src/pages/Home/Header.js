import React, { useState } from "react";
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

import { Avatar } from "baseui/avatar";
import { Link } from "react-router-dom";
import { StyledLink } from "baseui/link";
import { StatefulMenu } from "baseui/menu";
import Menu from "baseui/icon/menu";
import { Drawer } from "baseui/drawer";
import { Block } from "baseui/block";
import { H4, H5, H6, Paragraph2 } from "baseui/typography";

import { linkProps, StyledIcon } from "./index";

import { Small, Large } from "../../mediaQueries";

function Header() {
  const [css, theme] = useStyletron();
  const [debug, setDebugger] = useState(false);
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

  const renderDrawerContent = () => {
    return (
      <div>
        <H5>Olá, Anderson</H5>
        {/* <Link to="/checkout" className={drawerItemStyles}>
          <DrawerItem text="Carrinho" icon="shopping_cart" />
        </Link>
        <Link to="/user" className={drawerItemStyles}>
          <DrawerItem text="Meu perfil" icon="face" />
        </Link>

        <Link to="/admin" className={drawerItemStyles}>
          <DrawerItem text="Administrativo" icon="dashboard" />
        </Link>

        <Link to="/history" className={drawerItemStyles}>
          <DrawerItem text="Histórico de compras" icon="history" />
        </Link>

        <Link to="/" className={drawerItemStyles}>
          <DrawerItem text="Home" icon="home" />
        </Link> */}

        <ul
          className={css({
            paddingLeft: 0,
            paddingRight: 0,
          })}
        >
          <ListItem sublist>
            <ListItemLabel sublist>Label One</ListItemLabel>
          </ListItem>
          <ListItem
            artwork={(props) => <Check {...props} />}
            artworkSize={ARTWORK_SIZES.SMALL}
            endEnhancer={() => <ListItemLabel>End Enhancer</ListItemLabel>}
            sublist
          >
            <ListItemLabel>Label</ListItemLabel>
          </ListItem>

          <ListItem
            artwork={() => {
              return (
                <i className="material-icons">
                  <StyledIcon theme={theme}>shopping_cart</StyledIcon>
                </i>
              );
            }}
            endEnhancer={() => <ChevronRight />}
            sublist
          >
            <ListItemLabel sublist>Label Three</ListItemLabel>
          </ListItem>
        </ul>
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
                  autoFocus={false}
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
