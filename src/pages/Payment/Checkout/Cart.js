import React, { useContext } from "react";
import { Card, StyledBody, StyledAction, StyledThumbnail } from "baseui/card";
import { Accordion, Panel } from "baseui/accordion";
import AppContext from "../../../context/CheckoutContext";

function Cart() {
  const { current, setCurrentStep, cart } = useContext(AppContext);

  return (
    <div>
      <Accordion>
        <Panel title="Panel 1">
          <div>
            <img src={"https://source.unsplash.com/user/erondu/300x300"}></img>
          </div>
        </Panel>
        <Panel title="Panel 2">Content 2</Panel>
        <Panel title="Panel 3">Content 3</Panel>
      </Accordion>
      <Card
        // overrides={{ Root: { style: { width: "328px" } } }}
        title="Example card"
      >
        <StyledThumbnail
          src={"https://source.unsplash.com/user/erondu/300x300"}
        />
        <StyledBody>
          Proin ut dui sed metus pharetra hend rerit vel non mi. Nulla ornare
          faucibus ex, non facilisis nisl.
        </StyledBody>
      </Card>
    </div>
  );
}

export default Cart;
