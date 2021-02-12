import React, { useState, useContext } from "react";
import { useStyletron } from "baseui";
import {
  HeaderNavigation,
  ALIGN,
  StyledNavigationItem as NavigationItem,
  StyledNavigationList as NavigationList,
} from "baseui/header-navigation";

import { StyledLink } from "baseui/link";

import { ListItem, ListItemLabel, ARTWORK_SIZES } from "baseui/list";
import { Check } from "baseui/icon";
import { ChevronRight } from "baseui/icon";
import Cart from "../../pages/Payment/Checkout/Cart";
import { ChevronLeft } from "baseui/icon";

import { Link } from "react-router-dom";
import { Drawer } from "baseui/drawer";
import { Block } from "baseui/block";
import {
  Display4,
  H2,
  H4,
  H5,
  H6,
  Paragraph2,
  LabelSmall,
  LabelMedium,
  LabelLarge,
} from "baseui/typography";
import { Button, KIND, SIZE, SHAPE } from "baseui/button";
import { linkProps, StyledIcon } from "./index";
import { Small, Large } from "../../mediaQueries";

import { User, Archive, Receipt, Storefront } from "phosphor-react";
import { ShoppingBagOpen, List } from "phosphor-react";
import logo from "../../assets/imgs/logo_black.svg";
import { useHistory } from "react-router-dom";

import HeaderContext from "../../context/HeaderContext";

function HeaderSmallMedium() {
  const [css, theme] = useStyletron();
  const { isDrwCart, isDrwMenu, setIsDrwCart, setIsDrwMenu } = useContext(
    HeaderContext
  );

  let history = useHistory();

  const ProductItem = ({ children, link }) => {
    return (
      <ListItem
        artwork={() => null}
        // artworkSize={ARTWORK_SIZES.MEDIUM}
        endEnhancer={() => {
          return (
            <StyledLink
              onClick={() => {
                history.push(link);
                setIsDrwMenu(false);
              }}
            >
              {children}
            </StyledLink>
          );
        }}
        sublist
      >
        <ListItemLabel></ListItemLabel>
      </ListItem>
    );
  };

  const renderDrawerMenu = () => {
    return (
      <div>
        <Drawer
          isOpen={isDrwMenu}
          onClose={() => setIsDrwMenu(false)}
          size={SIZE.default}
          // anchor={ANCHOR.default}
        >
          <ul
            className={css({
              paddingLeft: 0,
              paddingRight: 0,
            })}
          >
            <ListItem
              // artwork={(props) => <User {...props} />}
              // artworkSize={ARTWORK_SIZES.MEDIUM}
              endEnhancer={() => <ChevronRight />}
              // sublist
            >
              <ListItemLabel>Login/Logout</ListItemLabel>
            </ListItem>

            <ListItem
              // artwork={(props) => <Receipt {...props} />}
              // artworkSize={ARTWORK_SIZES.MEDIUM}
              endEnhancer={() => <ChevronRight />}
              // sublist
            >
              <ListItemLabel>Meus pedidos </ListItemLabel>
            </ListItem>

            <ListItem
              // artwork={(props) => <Storefront {...props} />}
              // artworkSize={ARTWORK_SIZES.MEDIUM}
              endEnhancer={() => <ChevronRight />}
              // sublist
            >
              <ListItemLabel>Produtos</ListItemLabel>
            </ListItem>

            <ProductItem>Academia</ProductItem>
            <ProductItem link="/acessórios">Acessórios</ProductItem>
            <ProductItem link="/praia">Praia</ProductItem>
            <ProductItem link="/calçados">Calçados</ProductItem>
          </ul>
        </Drawer>
      </div>
    );
  };

  return (
    <div>
      <HeaderNavigation>
        <NavigationList $align={ALIGN.left}>
          <NavigationItem>
            <img alt="logo" src={logo} onClick={() => history.push("/")} />
          </NavigationItem>
        </NavigationList>
        <NavigationList $align={ALIGN.center}>
          <Button
            onClick={() => setIsDrwMenu(true)}
            kind={KIND.secondary}
            size={SIZE.default}
            shape={SHAPE.circle}
          >
            <List size={22} />
          </Button>
          {isDrwMenu && renderDrawerMenu()}
        </NavigationList>
        <NavigationList $align={ALIGN.right}>
          <Button
            onClick={() => setIsDrwCart(!isDrwCart)}
            startEnhancer={undefined}
            endEnhancer={undefined}
            kind={KIND.primary}
            size={SIZE.MEDIUM}
            shape={SHAPE.circle}
            // className={css({
            //   marginRight: theme.sizing.scale600,
            //   marginLeft: theme.sizing.scale600,
            // })}
          >
            <ShoppingBagOpen size={22} />
            {/* {isDrwCart && renderDrawerCart()} */}
          </Button>
          {isDrwCart && (
            <Drawer
              isOpen={isDrwCart}
              onClose={() => setIsDrwCart(false)}
              size={SIZE.default}
              // anchor={ANCHOR.default}
            >
              <H4 className={css({ paddingLeft: theme.sizing.scale600 })}>
                Meu carrinho
              </H4>

              <Cart />
            </Drawer>
          )}
        </NavigationList>
      </HeaderNavigation>
    </div>
  );
}

export default HeaderSmallMedium;
