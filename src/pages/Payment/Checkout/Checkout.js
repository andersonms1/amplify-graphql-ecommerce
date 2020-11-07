import React, { useState, useContext } from "react";
import { ProgressSteps, NumberedStep } from "baseui/progress-steps";
import { Grid, Cell, ALIGNMENT } from "baseui/layout-grid";
import Header from "../../Home/Header";

import AppContext from "../../../context/CheckoutContext";
import Cart from "./Cart";
import Address from "./Address";
function Checkout() {
  const { current, setCurrentStep } = useContext(AppContext);

  return (
    <Grid>
      <Cell span={[6, 8, 8]}>
        <Header />
        <ProgressSteps current={current}>
          <NumberedStep title="Verificar compras">
            <Cart />
          </NumberedStep>
          <NumberedStep title="Verificar endereço ">
            <Address />
          </NumberedStep>
          <NumberedStep title="Verificar pagamento">
            <p>3</p>
          </NumberedStep>
        </ProgressSteps>
        {/* </div> */}
      </Cell>
    </Grid>
  );
}

export default Checkout;
