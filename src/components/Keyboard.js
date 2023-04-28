import React from "react";
import Key from "../Key";
import { keyConfig } from "./Keyboard-keys-config";

export function Keyboard({
  userInput,
  pokemonName,
  setUserInput,
  onEnter,
  disabled,
  guesses,
  setGuesses,
}) {
  const handleClick = (event) => {
    setUserInput(userInput + event);
  };
  const handleEnter = (event) => {
    onEnter();
  };

  
  guesses.forEach((g) => {
    g.forEach((guess) => {
      keyConfig.filter((key) => {
       
        return key.name === guess.letter.toUpperCase();
     
      })[0].state=guess.isCorrect && "green" || guess.isPresent && "yellow" || ""
      ;
    });
  });

  return (
    <div className="keyboard">
      <div className="key-line">
        {keyConfig.slice(0, 10).map((key) => {
          return <Key keyVal={key} onClick={handleClick} key={key.name} />;
        })}
      </div>
      <div className="key-line">
        {keyConfig.slice(10, 19).map((key) => {
          return <Key keyVal={key} onClick={handleClick} key={key.name} />;
        })}
      </div>
      <div className="key-line">
        {keyConfig.slice(19, 20).map((key) => {
          return <Key keyVal={key} disabled={disabled} onClick={handleEnter} key={key.name} />;
        })}
        {keyConfig.slice(20, 27).map((key) => {
          return <Key keyVal={key} onClick={handleClick} key={key.name} />;
        })}
      </div>
    </div>
  );
}

export default Keyboard;
