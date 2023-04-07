import React, { useState, useEffect } from "react";

import { Keyboard } from "./Keyboard";
import { Key } from "react";

function GuessThePokemon() {
  const [pokemon, setPokemon] = useState(null);
  const [displayedName, setDisplayedName] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [message, setMessage] = useState("");
  const [guesses, setGuesses] = useState([]);

  console.log(pokemon?.name);
  const disabled= inputValue.length!==(pokemon?.name||'').length;

  useEffect(() => {
    fetch("https://pokeapi.co/api/v2/pokemon?limit=100")
      .then((response) => response.json())
      .then((data) => {
        const randomIndex = Math.floor(Math.random() * data.results.length);
        const randomPokemon = data.results[randomIndex];
        setPokemon(randomPokemon);
        setDisplayedName("*".repeat(randomPokemon.name.length));
      });
  }, []);

  const handleChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleSubmit = (event) => {
    if (event) {
      event.preventDefault();
    }
    const currentGuess = Array.from(inputValue).map((letter, index) => ({
      letter,
      isCorrect: pokemon.name[index] === letter,
      isPresent: pokemon.name.indexOf(letter) !== -1,
    }));
    const allGuesses = guesses.concat([currentGuess]);
    setGuesses(allGuesses);
    if (inputValue.toLowerCase() === pokemon.name) {
      setMessage(
        "You guessed correctly! The Pokemon was " + pokemon.name + "."
      );

      setInputValue("");
    } else {
      setMessage("Incorrect guess. Try again!");
      setInputValue("");
    }
  };
  
  const updateFromKeyboard =(text)=>{
    let pokemonName=text;
    if(text.length > pokemon.name.length){
      pokemonName= pokemonName.slice(0, pokemon.name.length);
    }
    setInputValue(pokemonName);

  }
  if (!pokemon) {
    return <div> Loading </div>;
  }
  const myGuesses = guesses.map((g) => {
    return (
      <div className="guess-board">
        {g.map(({ letter, isCorrect, isPresent }) => {
          return (
            <span className={isCorrect ? "green" : isPresent ? "yellow" : ""}>
              {letter}
            </span>
          );
        })}
      </div>
    );
  });
  return (
    <div className="guess-container">
      <div>
        <h1>Guess the Pokemon!</h1>
        {myGuesses}

        {pokemon && (
          <div>
            <img
              src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${
                pokemon.url.split("/")[6]
              }.png`}
              alt={pokemon.name}
            />
            <form onSubmit={handleSubmit}></form>
            <h2>{displayedName}</h2>
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                value={inputValue}
                onChange={handleChange}
                minLength={pokemon.name.length}
                maxLength={pokemon.name.length}
              />
              <button type="submit" disabled={disabled}>Guess</button>
            </form>
            {message && <p>{message}</p>}
          </div>
        )}
      </div>{" "}
      <Keyboard
        userInput={inputValue}
        setUserInput={updateFromKeyboard}
        onEnter={handleSubmit}
        pokemonName={pokemon.name}
        disabled={disabled}
        
      />{" "}
    </div>
  );
}

export default GuessThePokemon;
