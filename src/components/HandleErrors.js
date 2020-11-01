import React, { useState, useContext } from "react";
import { useStyletron } from "baseui";
import { Paragraph1, Paragraph2 } from "baseui/typography";

import { FormControl } from "baseui/form-control";

function HandleErrors(error, errorDescription, errorMsg) {
  const [css, theme] = useStyletron();

  const arr2Text = (arr) => {
    return arr.map((e, index) => {
      return (
        <Paragraph2 key={index}>
          {index + 1}_ {e.message ? e.message : e}
        </Paragraph2>
      );
    });
  };
  return (
    <>
      {error ? (
        <FormControl label="Erros">
          <div
            className={css({
              paddingRight: "1em",
              paddingLeft: "1em",
              paddingBottom: "1em",
              paddingTop: "1em",
              backgroundColor: theme.colors.negative200,
            })}
          >
            <Paragraph1>{errorDescription}</Paragraph1>
            {Array.isArray(errorMsg) ? (
              arr2Text(errorMsg)
            ) : (
              <Paragraph2>{errorMsg}</Paragraph2>
            )}
          </div>
        </FormControl>
      ) : null}
    </>
  );
}

export default HandleErrors;
