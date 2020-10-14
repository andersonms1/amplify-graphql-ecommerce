import React, { useState } from "react";

import { Link } from "react-router-dom";

import { Tabs, Tab } from "baseui/tabs-motion";

import { Products } from "../index";

import Header from "./Header";

function Home() {
  const [activeKey, setActiveKey] = React.useState("0");

  const [admin, setAdmin] = useState(false);

  React.useEffect(() => {
    console.log("Teste");
    setAdmin(false);
    // console.log(theme);
  }, []);

  // https://stackoverflow.com/questions/49058890/how-to-get-a-react-components-size-height-width-before-render
  // useLayoutEffect(() => {
  //   console.log(targetRef.current.offsetWidth);
  //   console.log(targetRef0.current.offsetWidth);
  // }, []);

  return (
    <div>
      <Header />

      {admin ? (
        <Tabs
          onChange={({ activeKey }) => {
            setActiveKey(activeKey);
          }}
          activeKey={activeKey}
          // fill={FILL.fixed}
        >
          <Tab title="PRODUTOS">
            <div>
              <Link to="/products/10">
                <p>Novo produto</p>
              </Link>
            </div>
          </Tab>
          <Tab title="AGENDAMENTOS">
            <p>Agendamentos</p>
          </Tab>
          <Tab title="COMPRAS">
            <p>Compras</p>
          </Tab>
        </Tabs>
      ) : (
        <Tabs
          onChange={({ activeKey }) => {
            setActiveKey(activeKey);
          }}
          activeKey={activeKey}
          // fill={FILL.fixed}
        >
          <Tab title="HOME">
            <Products />
            {/* <div> Working on Header responsitivity</div> */}
          </Tab>
          <Tab title="MASCULINO">{/* <Products /> */}</Tab>
          <Tab title="FEMININO">{/* <Products /> */}</Tab>
          <Tab title="INFANTIL">{/* <Products /> */}</Tab>
          <Tab title="PROMOÇÕES">{/* <Products /> */}</Tab>
        </Tabs>
      )}
    </div>
  );
}

export { Home };
