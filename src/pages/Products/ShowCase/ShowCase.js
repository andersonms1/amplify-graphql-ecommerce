import React, { useState, useEffect, useRef } from "react";
import { Products } from "../index";
import { useStyletron } from "baseui";
import { Display4, H4 } from "baseui/typography";
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
import { Accordion, Panel } from "baseui/accordion";
import { ResponsiveProperty } from "../../../mediaQueries/mediaQueries";
import { Card, StyledBody, StyledAction, StyledHeaderImage } from "baseui/card";
import { FlexGrid, FlexGridItem } from "baseui/flex-grid";
import img1 from "../../../assets/imgs/praia/jehpraiaefitness_138559108_3642980572463544_1983380386058123719_n.jpg";
import img2 from "../../../assets/imgs/praia/jehpraiaefitness_138951739_715442999365405_7705630361538637222_n.jpg";

function ShowCase({ item, query }) {
  const [css, theme] = useStyletron();
  const [isOpen, setIsOpen] = useState(true);
  const [value, setValue] = useState(true);
  const [calcHeight, setCalcHeight] = useState(100);
  const cardRef = useRef();

  console.log(subCategorys.CALCADOS);

  const fkData = [
    { size: "G", amount: 100 },
    { size: "M", amount: 1 },
    { size: "P", amount: 15 },
  ];

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

  const accordionWidth = ResponsiveProperty(
    ["100%", "100%", "30vw"],
    1000,
    500
  );

  useEffect(() => {
    console.log(cardRef?.current?.offsetWidth);
    setCalcHeight(cardRef?.current?.offsetWidth / 0.8);
  }, [cardRef]);

  return (
    <div>
      <Display4 paddingTop={theme.sizing.scale850}>{item}</Display4>

      {console.log(query)}

      {/* <Products querie="listProducts" /> */}
      {/* <Products
        querie="productsByCategorySubCategory"
        values={{
          category: FEMININO,
          subCategory: { eq: subCategorys.CALCADOS },
          sort: "createdAt",
        }}
      /> */}
      <Products
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
      />
    </div>
  );
}

export default ShowCase;
