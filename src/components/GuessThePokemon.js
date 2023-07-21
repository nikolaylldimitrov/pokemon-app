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
  const [showInstructions, setShowInstructions] = useState(false);
  const [wins, setWins] = useState(0);
  const [losses, setLosses] = useState(0);

  const disabled = inputValue.length !== (pokemon?.name || "").length;

  useEffect(() => {
    loadHistoryFromLocalStorage();
    fetch("https://pokeapi.co/api/v2/pokemon?limit=100")
      .then((response) => response.json())
      .then((data) => {
        const randomIndex = Math.floor(Math.random() * data.results.length);
        const randomPokemon = data.results[randomIndex];
        setPokemon(randomPokemon);
        setDisplayedName("*".repeat(randomPokemon.name.length));
      });
  }, []);
  useEffect(() => {
    saveHistoryToLocalStorage();
  }, [wins, losses]);

  const loadHistoryFromLocalStorage = () => {
    const winsFromStorage = localStorage.getItem("pokemonGameWins");
    const lossesFromStorage = localStorage.getItem("pokemonGameLosses");

    setWins(winsFromStorage ? parseInt(winsFromStorage) : 0);
    setLosses(lossesFromStorage ? parseInt(lossesFromStorage) : 0);
  };

  const saveHistoryToLocalStorage = () => {
    localStorage.setItem("pokemonGameWins", wins);
    localStorage.setItem("pokemonGameLosses", losses);
  };
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
      setWins((prevWins) => prevWins + 1);
    } else {
      setInputValue("");
      if (guesses.length === 4) {
        setGameOver(true);
        setLosses((prevLosses) => prevLosses + 1);
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
  const handleKey = (event) => {
    const keyCode = event.keyCode;

    if ((keyCode >= 65 && keyCode <= 90) || keyCode === 8 || keyCode === 13) {
      return true;
    }
    event.preventDefault();
    return false;
  };

  const showIntructions = (event) => {
    setShowInstructions(!showInstructions);
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
    <div className="guess-flex">
      <div className="guess-container">
        <Link to={`/`}>
          <div className="backButton"> Back </div>
        </Link>
        <a className="backButton" onClick={showIntructions}>
          Instructions
        </a>
        <h3>History</h3>
        <div className="history">
          <p className="win">Wins:{wins} &nbsp;&nbsp;</p>
          <p></p>
          <p className="lose"> Losses: {losses}</p>
        </div>
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
              <div className="new-game">
                <p>Game Over! You did not guess correctly within 5 tries.</p>
                <button className="backButton small " onClick={handleNewGame}>
                  New Game
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <input
                  type="text"
                  onKeyDown={handleKey}
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
            {correctGuess && (
              <button className="backButton small " onClick={handleNewGame}>
                New Game
              </button>
            )}
          </div>
        )}
        <Keyboard
          userInput={inputValue}
          setUserInput={updateFromKeyboard}
          onEnter={handleSubmit}
          pokemonName={pokemon.name}
          disabled={disabled}
          guesses={guesses}
          setGuesses={setGuesses}
        />{" "}
        <HowToPlay
          showInstructions={showInstructions}
          updateShowIntructions={showIntructions}
        />
      </div>{" "}
    </div>
  );
}

export default GuessThePokemon;
