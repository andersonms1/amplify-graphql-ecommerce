import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { Tabs, Tab } from "baseui/tabs-motion";

import AppContext from "../../context/AppContext";
import { Products } from "../index";
import Header from "./Header";

function Home() {
  const { page, setPage } = useContext(AppContext);
  const [admin, setAdmin] = useState(false);

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
            setPage(activeKey);
          }}
          activeKey={page}
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
            setPage(activeKey);
          }}
          activeKey={page}
          // fill={FILL.fixed}
        >
          <Tab title="HOME">
            <Products querie="listProducts" />
            {/* <p>ok</p> */}
          </Tab>
          <Tab title="MASCULINO">
            <Products
              querie="productsByCategorySubCategory"
              values={{
                category: "MASCULINO",
                subCategory: { eq: "CAMISA" },
                sort: "createdAt",
              }}
            />
          </Tab>
          <Tab title="FEMININO">
            <Products
              querie="productsByCategorySubCategoryBrand"
              values={{
                category: "FEMININO",
                subCategory: { eq: { brand: "ZARA", subCategory: "SHIRT" } },
                sort: "createdAt",
              }}
            />
          </Tab>
          <Tab title="INFANTIL">{/* <Products /> */}</Tab>
          <Tab title="PROMOÇÕES">{/* <Products /> */}</Tab>
        </Tabs>
      )}
    </div>
  );
}

export { Home };
