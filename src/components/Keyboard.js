import React from "react";
import { useState } from "react";
export function Keyboard() {
  const keys = [
    { name: "q", status: "" },
    { name: "w", status: "" },
    { name: "e", status: "" },
  ];
  const [selectedKeys, setSelectedKeys] = useState(keys);
  const keyword = selectedKeys.map((k) => {
    return <VisualKey key={k} elemt={k} />;
  });
 
  return <div>{keyword}</div>;
}
function VisualKey({ elemt }) {
  return <div className="keyboard-key"> {elemt.name}</div>;
}

export default Keyboard;
