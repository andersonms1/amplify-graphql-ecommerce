import React, { useState, useEffect, useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import { Tabs, Tab } from "baseui/tabs-motion";

import AppContext from "../../context/AppContext";
import { Products } from "../index";
import {
  Display2,
  Display4,
  H2,
  H4,
  HeadingMedium,
  HeadingSmall,
  HeadingXSmall,
  LabelMedium,
  LabelSmall,
} from "baseui/typography";
import { Button, KIND, SIZE, SHAPE } from "baseui/button";
import { Block } from "baseui/block";
import Pages from "./Pages";
import { Cell, Grid } from "baseui/layout-grid";
import { useStyletron } from "baseui";
import {
  Watch,
  Bag,
  Hero1,
  Hero11,
  Home as Hero,
  BackPckWnm,
  HighHeels,
  LogoVitton,
  LogoBeats,
  LogoChannel,
  LogoAdidas,
} from "../../assets/imgs/home/";
import { FEMININO } from "../../utils/CATEGORYSUBCATEGORYS";
import Carousel from "./Carousel";

import Footer from "./Footer";

function Home() {
  const { page, setPage } = useContext(AppContext);
  const [admin, setAdmin] = useState(false);
  const [css, theme] = useStyletron();
  let history = useHistory();

  const container = css({
    // background: "#55DCE7",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    alignContent: "center",
    justifyItems: "center",
    justifyContent: "space-evenly",
    paddingTop: theme.sizing.scale400,
    paddingBottom: theme.sizing.scale400,
    boxShadow: theme.lighting.shadow700,
  });

  const ctImg = css({
    width: "auto",
    height: "auto",
    maxWidth: "100%",
    maxHeight: "80vh",
    display: "block",
    marginLeft: "auto",
    marginRight: "auto",
  });

  const ctImgBrnd = css({
    width: theme.sizing.scale1200,
    height: "auto",
    maxHeight: "80vh",
    display: "block",
    marginLeft: "auto",
    marginRight: "auto",
  });

  const brand = css({
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingTop: theme.sizing.scale400,
    paddingBottom: theme.sizing.scale400,
    // boxShadow: theme.lighting.shadow700,
  });

  return (
    <div>
      <Grid align="center">
        {/* <Cell span={[4, 8, 12]}>
          <Carousel />
        </Cell> */}
        <Cell span={[2, 4, 6]}>
          <HeadingXSmall>Veja os últimos lançamentos</HeadingXSmall>
          {/* <LabelMedium>Veja os últimos lançamentos</LabelMedium> */}
          <Button
            onClick={() => alert("click")}
            startEnhancer={undefined}
            endEnhancer={undefined}
            kind={KIND.default}
            size={SIZE.mini}
            shape={SHAPE.default}
          >
            Ir as compras
          </Button>
        </Cell>
        <Cell span={[2, 4, 6]}>
          <img alt="Hero" src={Hero1} className={ctImg} />
        </Cell>
      </Grid>

      {/* Second Page */}
      <Grid align="center" gridGaps={30}>
        <Cell span={[4, 8, 12]}>
          <HeadingMedium>Categorias em destaque</HeadingMedium>
        </Cell>
        <Cell span={[4, 4, 6]}>
          <div className={container}>
            <div>
              <HeadingSmall marginBottom={theme.sizing.scale600}>
                Bolsas
              </HeadingSmall>
              <LabelSmall>Ver categoria</LabelSmall>
            </div>
            <img
              alt="Bag category"
              src={BackPckWnm}
              height="100px"
              width="auto"
            />
          </div>
        </Cell>

        <Cell span={[4, 4, 6]}>
          <div className={container} onClick={() => history.push("/calçados")}>
            <img
              alt="Bag category"
              src={HighHeels}
              height="100px"
              width="auto"
            />
            <div>
              <HeadingSmall marginBottom={theme.sizing.scale600}>
                Calçados
              </HeadingSmall>
              <LabelSmall>Ver categoria</LabelSmall>
            </div>
          </div>
        </Cell>
      </Grid>

      <Grid>
        <Cell span={[4, 8, 12]}>
          <HeadingMedium>Produtos em destaque</HeadingMedium>
          <Products
            querie="productsByCategorySold"
            values={{
              category: FEMININO,
              sold: { ge: 0 },
              sortDirection: "DESC",
              limit: 4,
            }}
          />
        </Cell>
      </Grid>

      <Grid align="center">
        <Cell span={[4, 8, 12]}>
          <div
            className={css({
              borderTop: `1px solid ${theme.colors.contentSecondary}`,
              boxShadow: theme.lighting.shadow700,
              marginTop: theme.sizing.scale800,
            })}
          ></div>
          <div className={brand}>
            <img alt="brand" src={LogoAdidas} width="25px" />
            <img alt="brand" src={LogoBeats} width="25px" />
            <img alt="brand" src={LogoChannel} width="25px" />
            <img alt="brand" src={LogoVitton} width="25px" />
          </div>
        </Cell>
      </Grid>

      <Footer />
    </div>
  );
}

export { Home };
