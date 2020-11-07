```javascript
import * as React from "react";
import { List, arrayMove, arrayRemove } from "baseui/dnd-list";
export default () => {
  const [items, setItems] = React.useState([
    "Item 1",
    "Item 2 Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    "Item 3 asldkfjal;skjf;alskjdf;lakjsd;lfkjas;lkdjfalksjdflkjksajdfkjdkfjdkjfkdjkajslkfjdalskjf;alksjdlfkajsl;dkfja;lskjdflakjs;lfkja;lskjf;alksjdf"
  ]);
  return (
    <List
      items={items}
      onChange={({ oldIndex, newIndex }) =>
        setItems(
          newIndex === -1
            ? arrayRemove(items, oldIndex)
            : arrayMove(items, oldIndex, newIndex)
        )
      }
      overrides={{
        Label: {
          style: ({ $theme }) => {
            return {
              outline: `${$theme.colors.warning200} solid`,
              backgroundColor: $theme.colors.warning200,
              wordBreak: "break-all"
            };
          }
        }
      }}
    />
  );
};

```