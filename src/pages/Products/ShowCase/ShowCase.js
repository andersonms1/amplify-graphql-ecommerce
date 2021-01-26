import React, { useState, useEffect } from "react";
import { Products } from "../index";
import { useStyletron } from "baseui";
import { Display4 } from "baseui/typography";
import { FEMININO, subCategorys } from "../../../utils/CATEGORYSUBCATEGORYS";

import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalButton,
  ROLE,
} from "baseui/modal";
import { KIND as ButtonKind } from "baseui/button";
import { Select, TYPE } from "baseui/select";
import { FormControl } from "baseui/form-control";
import { Input } from "baseui/input";
import { Button, KIND, SIZE, SHAPE } from "baseui/button";
import { Block } from "baseui/block";

function ShowCase({ item }) {
  const [css, theme] = useStyletron();
  const [isOpen, setIsOpen] = useState(true);
  const [value, setValue] = useState(true);
  console.log(subCategorys.CALCADOS);

  const inputStyles = css({
    width: "30vw",
  });

  const container = css({
    display: "flex",
    flexDirection: "row",
    alignItems: "stretch",
    alignContent: "space-between",
    justifyContent: "space-between",
  });
  return (
    <div>
      <Display4 paddingTop={theme.sizing.scale850}>{item}</Display4>
      {/* <Products querie="listProducts" /> */}
      {/* <Products
        querie="productsByCategorySubCategory"
        values={{
          category: FEMININO,
          subCategory: { eq: subCategorys.CALCADOS },
          sort: "createdAt",
        }}
      /> */}
      {/* <Products
        querie="productsByCategorySubCategoryCreatedAt"
        values={{
          category: FEMININO,
          subCategoryCreatedAt: {
            le: {
              subCategory: subCategorys.CALCADOS,
              // createdAt: "2021-01-23T15:25:14.159Z",
              createdAt: "2021-01-23T15:19:20.005Z",
            },
          },
        }}
      /> */}
      <Modal
        onClose={() => setIsOpen(false)}
        closeable
        isOpen
        role={ROLE.dialog}
      >
        <ModalHeader>Hello world</ModalHeader>
        <ModalBody>
          Form Proin ut dui sed metus pharetra hend rerit vel non mi. Nulla
          ornare faucibus ex, non facilisis nisl. Maecenas aliquet mauris ut
          tempus.
        </ModalBody>
        <div className={container}>
          <FormControl className={inputStyles}>
            <Select
              width="100px"
              backspaceRemoves
              clearable
              closeOnSelect
              creatable
              deleteRemoves
              disabled
              escapeClearsValue
              options={[
                { label: "AliceBlue", id: "#F0F8FF" },
                { label: "AntiqueWhite", id: "#FAEBD7" },
                { label: "Aqua", id: "#00FFFF" },
                { label: "Aquamarine", id: "#7FFFD4" },
                { label: "Azure", id: "#F0FFFF" },
                { label: "Beige", id: "#F5F5DC" },
              ]}
              value={[]}
              getOptionLabel={undefined}
              getValueLabel={undefined}
              labelKey={undefined}
              valueKey={undefined}
              filterOutSelected
              isLoading
              multi
              onBlurResetsInput
              onCloseResetsInput
              onSelectResetsInput
              openOnClick
              required
              searchable
              type={TYPE.select}
              placeholder="Select color"
              onChange={(params) => setValue(params.value)}
              filterOptions={undefined}
              onInputChange={undefined}
              onOpen={undefined}
              onClose={undefined}
            />
          </FormControl>
          <Block padding="5vw" />
          <FormControl>
            <Button
              onClick={() => alert("click")}
              startEnhancer={undefined}
              endEnhancer={undefined}
              disabled
              kind={KIND.primary}
              size={SIZE.default}
              shape={SHAPE.default}
              disabled={false}
            >
              Hello
            </Button>
          </FormControl>
        </div>
        <ModalFooter>
          <ModalButton kind={ButtonKind.tertiary}>Cancel</ModalButton>
          <ModalButton>Okay</ModalButton>
        </ModalFooter>
      </Modal>
    </div>
  );
}

export default ShowCase;
