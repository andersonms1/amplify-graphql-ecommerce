import React, { useState, useEffect } from "react";
import { Tabs, Tab, ORIENTATION } from "baseui/tabs-motion";
import { RadioGroup, Radio, ALIGN } from "baseui/radio";
function History() {
  const [activeKey, setActiveKey] = useState("0");
  const [radio, setRadio] = useState("");
  return (
    <div>
      <Tabs
        onChange={({ activeKey }) => {
          setActiveKey(activeKey);
        }}
        orientation={ORIENTATION.horizontal}
        activeKey={activeKey}
        disabled={false}
        renderAll={false}
      >
        <Tab title="Pendentes">Content 1</Tab>
        <Tab title="Concluídos">Content 2</Tab>
      </Tabs>
    </div>
  );
}

export default History;
