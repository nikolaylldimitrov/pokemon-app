import React from "react";
import { useState } from "react";
import Key from "../Key";
import { keyConfig } from "./Keyboard-keys-config";
export function Keyboard({
  userInput,
  pokemonName,
  setUserInput,
  onEnter,
  disabled,
}) {
  const handleClick = (event) => {
    setUserInput(userInput + event);
  };
  const handleEnter = (event) => {
    onEnter();
  };

  return (
    <div className="keyboard">
      <div className="key-line">
        {keyConfig.slice(0, 10).map((key) => {
          return <Key keyVal={key} onClick={handleClick} />;
        })}
      </div>
      <div className="key-line">
        {keyConfig.slice(10, 19).map((key) => {
          return <Key keyVal={key} onClick={handleClick} />;
        })}
      </div>
      <div className="key-line">
        {keyConfig.slice(19, 20).map((key) => {
          return <Key keyVal={key} disabled={disabled} onClick={handleEnter} />;
        })}
        {keyConfig.slice(20, 27).map((key) => {
          return <Key keyVal={key} onClick={handleClick} />;
        })}
      </div>
    </div>
  );
}

export default Keyboard;
