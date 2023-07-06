import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Keyboard } from "./Keyboard";
import Confetti from "react-confetti";
import { HowToPlay } from "./gameinstructions";

function GuessThePokemon() {
  const [pokemon, setPokemon] = useState(null);
  const [displayedName, setDisplayedName] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [message, setMessage] = useState("");
  const [guesses, setGuesses] = useState([]);
  const [gameOver, setGameOver] = useState(false);
  const [correctGuess, setCorrectGuess] = useState(false);

  const disabled = inputValue.length !== (pokemon?.name || "").length;

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
      isCorrect: pokemon.name[index].toLowerCase() === letter.toLowerCase(),
      isPresent: pokemon.name.indexOf(letter.toLowerCase()) !== -1,
    }));
    const allGuesses = guesses.concat([currentGuess]);
    setGuesses(allGuesses);
    if (inputValue.toLowerCase() === pokemon.name) {
      setMessage(
        "You guessed correctly! The Pokemon was " + pokemon.name + "."
      );
      setInputValue("");
      setCorrectGuess(true);
    } else {
      setInputValue("");
      if (guesses.length === 4) {
        setGameOver(true);
      } else {
        setMessage("Incorrect guess. Try again!");
      }
    }
  };

  const updateFromKeyboard = (text) => {
    let pokemonName = text;
    if (text.length > pokemon.name.length) {
      pokemonName = pokemonName.slice(0, pokemon.name.length);
    }
    setInputValue(pokemonName);
  };
  if (!pokemon) {
    return <div> Loading </div>;
  }
  const handleNewGame = () => {
    setPokemon(null);
    setDisplayedName("");
    setInputValue("");
    setMessage("");
    setGuesses([]);
    setGameOver(false);
    setCorrectGuess(false);

    fetch("https://pokeapi.co/api/v2/pokemon?limit=100")
      .then((response) => response.json())
      .then((data) => {
        const randomIndex = Math.floor(Math.random() * data.results.length);
        const randomPokemon = data.results[randomIndex];
        setPokemon(randomPokemon);
        setDisplayedName("*".repeat(randomPokemon.name.length));
      });
  };

  const myGuesses = guesses.map((g, i) => {
    return (
      <div className="guess-board" key={i}>
        {g.map(({ letter, isCorrect, isPresent }, index) => {
          return (
            <span
              className={isCorrect ? "green" : isPresent ? "yellow" : ""}
              key={index}
            >
              {letter}
            </span>
          );
        })}
      </div>
    );
  });
  return (
    <div className="guess-container">
      <Link to={`/`}>
        <div className="backButton"> Back </div>
      </Link>
      <div>
        <h1>Guess the Pokemon!</h1>
        {myGuesses}

        {pokemon && (
          <div>
            {correctGuess && <Confetti />}
            <img
              src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${
                pokemon.url.split("/")[6]
              }.png`}
              alt={pokemon.name}
            />

            <form onSubmit={handleSubmit}></form>
            <h2>{displayedName}</h2>
            {gameOver ? (
              <div>
                <p>Game Over! You did not guess correctly within 5 tries.</p>
                <button onClick={handleNewGame}>New Game</button>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <input
                  type="text"
                  value={inputValue}
                  onChange={handleChange}
                  minLength={pokemon.name.length}
                  maxLength={pokemon.name.length}
                />
                <button type="submit" disabled={disabled}>
                  Guess
                </button>
              </form>
            )}
            {message && <p>{message}</p>}
            {correctGuess && <button onClick={handleNewGame}>New Game</button>}
          </div>
        )}
      </div>{" "}
      <Keyboard
        userInput={inputValue}
        setUserInput={updateFromKeyboard}
        onEnter={handleSubmit}
        pokemonName={pokemon.name}
        disabled={disabled}
        guesses={guesses}
        setGuesses={setGuesses}
      />{" "}
      <HowToPlay />
    </div>
  );
}

export default GuessThePokemon;
