import React, { useState, useContext } from "react";
import { FormControl } from "baseui/form-control";
import { Textarea } from "baseui/textarea";
import { Input } from "baseui/input";
import { Tabs, Tab } from "baseui/tabs-motion";

import { Button, KIND } from "baseui/button";
import { Block } from "baseui/block";
import AppContext from "../../../context/CheckoutContext";

function Cart() {
  const { current, setCurrentStep, cart } = useContext(AppContext);
  const [deliverTo, setDeliverTo] = useState(""); //name
  const [ZIP, setZIP] = useState(""); //cep
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [neighborhood, setNeighborhood] = useState(""); //bairro
  const [street, setStreet] = useState("");
  const [number, setNumber] = useState("");
  const [haveNumber, setHaveNumber] = useState(false); //not obrigatory
  const [aditionalInformation, setAditionalInformation] = useState(""); //not obrigatory
  const [homeOrWork, setHomeOrWork] = useState("");
  const [address, setAddress] = useState({});
  const [activeKey, setActiveKey] = useState("1");
  return (
    <div>
      <Tabs
        activeKey={activeKey}
        onChange={({ activeKey }) => {
          setActiveKey(activeKey);
        }}
        activateOnFocus
      >
        <Tab title="Endereço primário">
          <FormControl
            label="Nome e Sobrenome"
            caption={"Pessoa que deve receber o pacote"}
          >
            <Input
              id="name"
              // value={`${address.deliverTo ? address.deliverTo : ""}`}
              value={address.deliverTo ? address.deliverTo : ""}
              onChange={(e) => {
                setAddress({ ...address, deliverTo: e.target.value });
              }}
            />
          </FormControl>
        </Tab>
        <Tab title="Adicionar endereço"></Tab>
      </Tabs>
      <Button
        kind={KIND.secondary}
        size="compact"
        onClick={() => setCurrentStep(0)}
      >
        Anterior
      </Button>
      <Button
        kind={KIND.primary}
        size="compact"
        onClick={() => console.log("Anderson")}
      >
        Próximo
      </Button>
    </div>
  );
}

export default Cart;
