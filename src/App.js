import * as React from "react";
import {
  HeaderNavigation,
  ALIGN,
  StyledNavigationItem as NavigationItem,
  StyledNavigationList as NavigationList,
} from "baseui/header-navigation";

import { StyledLink as Link } from "baseui/link";
import { StatefulSelect as Search, TYPE } from "baseui/select";
import { Avatar } from "baseui/avatar";
import { useStyletron } from "baseui";

import { ProductNew } from "./pages";

// import { H1, H2, H3, H4, H5, H6 } from "baseui/typography";
// import {
//   Label1,
//   Label2,
//   Label3,
//   Label4,
//   Paragraph1,
//   Paragraph2,
//   Paragraph3,
//   Paragraph4,
// } from "baseui/typography";

import { Tabs, Tab } from "baseui/tabs";

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
export default () => {
  const [css, theme] = useStyletron();
  const [activeKey, setActiveKey] = React.useState("0");
  React.useEffect(() => {
    console.log("Teste");
    // console.log(theme);
  }, []);

  const iconStyles = css({
    color: `${theme.colors.primary}`,
    fontSize: `${theme.sizing.scale800}`,
  });

  const backgroundImageStyled = css({
    width: "100%",
  });

  const itemProps = {
    backgroundColor: "mono300",
    height: "scale4800",
    // display: 'flex',
    // alignItems: 'center',
    // justifyContent: 'center',
  };

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
            <Link href="#search-link1">Olá, Anderson</Link>
            <Avatar
              name="Jane Doe"
              size="scale1200"
              src="https://api.adorable.io/avatars/285/10@adorable.io.png"
            />
          </div>
        </NavigationList>
        <NavigationList $align={ALIGN.right}>
          <NavigationItem>
            <i className="material-icons">
              <div className={iconStyles}>loyalty</div>
            </i>
          </NavigationItem>
          <NavigationItem>
            <i className="material-icons">
              <div className={iconStyles}>shopping_cart</div>
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
};
