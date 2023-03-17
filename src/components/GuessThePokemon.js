import React, { useState, useEffect } from "react";
import Confetti from 'react-confetti'
import {
    useWindowSize,
    useWindowWidth,
    useWindowHeight,
  } from '@react-hook/window-size'
function GuessThePokemon() {
    const { width, height } = useWindowSize()
  const [pokemon, setPokemon] = useState(null);
  const [displayedName, setDisplayedName] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [message, setMessage] = useState("");

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
    event.preventDefault();
    if (inputValue.toLowerCase() === pokemon.name) {
      setMessage("You guessed correctly! The Pokemon was " + pokemon.name + ".");
      setInputValue("");
    } else {
      setMessage("Incorrect guess. Try again!");
      setInputValue("");
    }
  };

  return (
    <div className="guess-container">
    <div>
      <h1>Guess the Pokemon!</h1>
      {pokemon && (
        <div>
            <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.url.split("/")[6]}.png`} alt={pokemon.name} />
          <form onSubmit={handleSubmit}></form>
          <h2>{displayedName}</h2>
          <form onSubmit={handleSubmit}>
            <input type="text" value={inputValue} onChange={handleChange} />
            <button type="submit">Guess</button>
          </form>
          {message  && <p>{message}<Confetti
      width={width}
      height={height}
    /></p>}
        </div>
      )}
    </div>
    </div>
  );
  
}

export default GuessThePokemon;
