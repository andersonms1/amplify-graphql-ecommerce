import React, { useState, useEffect } from "react";
import { Tabs, Tab, ORIENTATION } from "baseui/tabs-motion";
import { RadioGroup, Radio, ALIGN } from "baseui/radio";
import { ListItem, ListItemLabel, ARTWORK_SIZES } from "baseui/list";
import { Check } from "baseui/icon";

function History() {
  const [activeKey, setActiveKey] = useState("0");
  const [radio, setRadio] = useState("");
  const [value, setValue] = useState("1");

  const [fakeData, setFakeData] = useState([
    { id: 0, price: 100.0, product: [{}] },
  ]);

  const renderList = () => {
    return fakeData.map((item, index) => {
      return (
        <ListItem
          artwork={(props) => <Check {...props} />}
          artworkSize={ARTWORK_SIZES.SMALL}
          endEnhancer={() => <ListItemLabel>Detalhes</ListItemLabel>}
          sublist
        >
          <ListItemLabel>Label</ListItemLabel>
        </ListItem>
      );
    });
  };

  return (
    <div>
      <RadioGroup
        value={value}
        onChange={(e) => setValue(e.target.value)}
        name="Status"
        align={ALIGN.vertical}
        disabled={false}
        // error
      >
        <Radio value="1">Todos</Radio>
        <Radio value="2">Em aberto</Radio>
        <Radio value="3">Concluídos</Radio>
      </RadioGroup>
      {renderList()}
    </div>
  );
}

export default History;
