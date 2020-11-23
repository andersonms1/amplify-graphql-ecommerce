import React from "react";
import { KIND as ButtonKind } from "baseui/button";
import { Button } from "baseui/button";
import { getObj, removeItem } from "../../utils/localStorage";
import CheckoutContext from "../../context/CheckoutContext";
// https://stackoverflow.com/questions/280389/how-do-you-find-out-the-caller-function-in-javascript
function Debugger() {
  const { current, setCurrentStep, cart, setCart, removeCartItem } = useContext(
    CheckoutContext
  );

  return (
    <div>
      <Button
        onClick={() => {
          console.log(cart);
          console.log(getObj("cart"));
        }}
      >
        Print states
      </Button>
      <Button>Clear cart</Button>
      <Button onClick={() => removeItem("cart")}>Clear local cart</Button>
    </div>
  );
}

export default Debugger;
