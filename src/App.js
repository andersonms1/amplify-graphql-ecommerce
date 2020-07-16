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
import { H1, H2, H3, H4, H5, H6 } from "baseui/typography";
import {
  Label1,
  Label2,
  Label3,
  Label4,
  Paragraph1,
  Paragraph2,
  Paragraph3,
  Paragraph4,
} from "baseui/typography";

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
export default () => (
  <HeaderNavigation>
    <NavigationList $align={ALIGN.left}>
      <NavigationItem>Uber</NavigationItem>
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
      <NavigationItem>
        {/* <Link href="#search-link1">Tab Link One</Link> */}
      </NavigationItem>
    </NavigationList>
    <NavigationList $align={ALIGN.right}>
      <Avatar
        name="Jane Doe"
        size="scale1200"
        src="https://api.adorable.io/avatars/285/10@adorable.io.png"
      />
    </NavigationList>
  </HeaderNavigation>
);
