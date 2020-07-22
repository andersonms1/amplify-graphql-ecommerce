import * as React from "react";
import {
  HeaderNavigation,
  ALIGN,
  StyledNavigationItem as NavigationItem,
  StyledNavigationList as NavigationList,
} from "baseui/header-navigation";
import { StatefulSelect as Search, TYPE } from "baseui/select";
import { Avatar } from "baseui/avatar";
import { useStyletron } from "baseui";
import { Link } from "react-router-dom";
import { Tabs, Tab } from "baseui/tabs";

import { linkProps, StyledIcon } from "./index";
import { ProductNew } from "../index";

const options = {
  options: [
    { id: "AliceBlue", color: "#F0F8FF" },
    { id: "AntiqueWhite", color: "#FAEBD7" },
    { id: "Aqua", color: "#00FFFF" },
    { id: "Aquamarine", color: "#7FFFD4" },
    { id: "Azure", color: "#F0FFFF" },
    { id: "Beige", color: "#F5F5DC" },
    { id: "Bisque", color: "#FFE4C4" },
    { id: "Black", color: "#000000" },
  ],
  labelKey: "id",
  valueKey: "color",
  placeholder: "Search colors",
  maxDropdownHeight: "300px",
};
function Home() {
  const [, theme] = useStyletron();
  const [activeKey, setActiveKey] = React.useState("0");
  React.useEffect(() => {
    console.log("Teste");
    // console.log(theme);
  }, []);

  return (
    <div>
      <HeaderNavigation>
        <NavigationList $align={ALIGN.left}>
          <NavigationItem>Miranda E-Commerce</NavigationItem>
        </NavigationList>
        <NavigationList $align={ALIGN.center}>
          <NavigationItem style={{ width: "200px" }}>
            <Search
              {...options}
              type={TYPE.search}
              getOptionLabel={(props) => props.option.id || null}
              onChange={() => {}}
            />
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

      <Tabs
        onChange={({ activeKey }) => {
          setActiveKey(activeKey);
        }}
        activeKey={activeKey}
      >
        <Tab title="NOVIDADES">
          <ProductNew />
        </Tab>
        <Tab title="MASCULINO">
          <div>Anderson</div>
        </Tab>
        <Tab title="FEMININO">Content 3</Tab>
        <Tab title="INFANTIL">Content 3</Tab>
        <Tab title="PROMOÇÕES">Content 3</Tab>
      </Tabs>
    </div>
  );
}

export { Home };
