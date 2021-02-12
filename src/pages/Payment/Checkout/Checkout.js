import React, { useState, useContext, useEffect } from "react";
import { ProgressSteps, NumberedStep } from "baseui/progress-steps";
import { Grid, Cell, ALIGNMENT } from "baseui/layout-grid";

import AppContext from "../../../context/CheckoutContext";
import Cart from "./Cart";
import Address from "./Address";
import Pay from "./Pay";
import Payment from "./Payment";
import { currentCheckoutPage } from "../../../context/types";
import { getItem } from "../../../utils/localStorage";

import { useStyletron } from "baseui";
function Checkout() {
  const { current, setCurrentStep } = useContext(AppContext);
  const [css, theme] = useStyletron();

  useEffect(() => {
    const _currentCheckoutPage = parseInt(getItem(currentCheckoutPage));
    console.log(_currentCheckoutPage);
    if (_currentCheckoutPage) {
      setCurrentStep(_currentCheckoutPage);
    }
    // setCurrentStep(1);
  }, [current]);

  // console.log(theme);

  return (
    // <div
    //   className={css({
    //     display: "flex",
    //     flexDirection: "row",
    //     // alignItems: "center",
    //     // alignContent: "center",
    //     // alignSelf: "center",
    //   })}
    // >
    //   <Grid
    //     className={css({
    //       flexGrow: 1,
    //     })}
    //   >
    // <Cell span={[6, 8, 12]}>
    <ProgressSteps current={current}>
      <NumberedStep title="Verificar compras">
        <Cart />
      </NumberedStep>
      <NumberedStep title="Verificar endereço ">
        <Address />
      </NumberedStep>
      <NumberedStep title="Verificar pagamento">
        {/* <Pay /> */}
        <Payment />
      </NumberedStep>
    </ProgressSteps>
    // </Cell>
    //   </Grid>
    // </div>
    // </div>
  );
}

export default Checkout;
