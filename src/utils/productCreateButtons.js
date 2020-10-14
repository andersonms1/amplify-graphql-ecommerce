import React from "react";
import { Button, KIND } from "baseui/button";
import { Block } from "baseui/block";

const productCreateButtons = (current = 0, isValid = true, actionClick) => {
  return (
    <>
      {isValid && (
        <>
          <Block paddingTop="50px" />

          {current === 0 ? null : (
            <Button kind={KIND.secondary} size="compact" onClick={actionClick}>
              Anterior
            </Button>
          )}
          <Button kind={KIND.primary} size="compact" onClick={actionClick}>
            Próximo
          </Button>
        </>
      )}
    </>
  );
};

export default productCreateButtons;
