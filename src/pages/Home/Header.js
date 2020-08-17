import React, { useRef, useLayoutEffect, useState } from "react";
import {
  HeaderNavigation,
  ALIGN,
  StyledNavigationItem as NavigationItem,
  StyledNavigationList as NavigationList,
} from "baseui/header-navigation";

import { Avatar } from "baseui/avatar";
import { useStyletron } from "baseui";
import { Link } from "react-router-dom";
// import { Tabs, Tab } from "baseui/tabs";
import { Tabs, Tab, FILL } from "baseui/tabs-motion";
import { useMediaQuery } from "react-responsive";

import { linkProps, StyledIcon } from "./index";
import { Products, CreateUpdate } from "../index";

function Header() {
  const [css, theme] = useStyletron();
  const [activeKey, setActiveKey] = React.useState("0");
  const [admin, setAdmin] = useState(false);
  const [modal, setModal] = useState(false);

  React.useEffect(() => {
    console.log("Teste");
    setAdmin(false);
    // console.log(theme);
  }, []);
  const { breakpoints } = theme;

  const targetRef = useRef();
  const targetRef0 = useRef();
  // https://stackoverflow.com/questions/49058890/how-to-get-a-react-components-size-height-width-before-render
  // useLayoutEffect(() => {
  //   console.log(targetRef.current.offsetWidth);
  //   console.log(targetRef0.current.offsetWidth);
  // }, []);

  return (
    <div>
      {useMediaQuery({
        query: `(max-width: ${breakpoints.small}px)`,
      }) && <div></div>}

      {useMediaQuery({
        query: `(min-width: ${breakpoints.small + 1}px) and (max-width: ${
          breakpoints.large - 1
        }px) `,
      }) && (
        <div
          className={css({
            width: "100%",
          })}
        >
          <HeaderNavigation>
            <NavigationList $align={ALIGN.left}>
              <NavigationItem>Miranda E-Commerce</NavigationItem>
            </NavigationList>
            {/* <NavigationList $align={ALIGN.center}>
            <NavigationItem ref={targetRef0} style={{ width: "200px" }}>
              <div></div>
            </NavigationItem>
          </NavigationList> */}
            <NavigationList $align={ALIGN.center}></NavigationList>

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
        </div>
      )}

      {useMediaQuery({
        query: `(min-width: ${breakpoints.large}px )`,
      }) && (
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
      )}
      {admin ? (
        <Tabs
          onChange={({ activeKey }) => {
            setActiveKey(activeKey);
          }}
          activeKey={activeKey}
          // fill={FILL.fixed}
        >
          {console.log()}
          {console.log("***")}
          {console.log(admin)}
          <Tab title="HOME">
            <Products />
          </Tab>
          <Tab title="MASCULINO">
            <Products />
          </Tab>
          <Tab title="FEMININO">
            <Products />
          </Tab>
          <Tab title="INFANTIL">
            <Products />
          </Tab>
          <Tab title="PROMOÇÕES">
            <Products />
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
          <Tab title="PRODUTOS">
            <div onClick={() => setModal(true)}>
              <p>Novo produto</p>
              <CreateUpdate modal={modal}></CreateUpdate>
            </div>
          </Tab>
          <Tab title="AGENDAMENTOS">
            <p>Agendamentos</p>
          </Tab>
          <Tab title="COMPRAS">
            <p>Compras</p>
          </Tab>
        </Tabs>
      )}
    </div>
  );
}

export { Header };
