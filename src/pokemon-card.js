import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { PokemonThumb } from "./components/PokemonThumnail";
import { Link } from "react-router-dom";
import NavBar from "./components/pokemonNavHeader";

export function App() {
  const [allPokemons, setAllPokemons] = useState([]);
  const [page, setPage] = useState(0);

  const url = `https://pokeapi.co/api/v2/pokemon?limit=24`;
  const getAllPokemons = async () => {
    const res = await fetch(url + `&offset=${page * 24}`);
    const data = await res.json();
    setPage(page + 1);

    function createPokemonObject(results) {
      results.forEach(async (pokemon) => {
        const res = await fetch(
          `https://pokeapi.co/api/v2/pokemon/${pokemon.name}`
        );
        const data = await res.json();
        setAllPokemons((currentList) => [...currentList, data]);
      });
    }
    createPokemonObject(data.results);
  };
  useEffect(() => {
    getAllPokemons();
  }, []);

  const handleScroll = () => {
    const { scrollTop, clientHeight, scrollHeight } = document.documentElement;
    if (scrollTop + clientHeight >= scrollHeight - 100) {
      getAllPokemons();
    }
  };
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [page]);

  return (
    <>
      <NavBar />

      <div className="main-container" onScroll={handleScroll}>
        <div className="pokemon-container" onScroll={handleScroll}>
          <h1>Pokemon Deck</h1>

          <div className="all-container" onScroll={handleScroll}>
            {allPokemons.map((pokemonStats, index) => (
              <Link to={`/pokemon/${pokemonStats.id}`} key={index}>
                <PokemonThumb
                  id={pokemonStats.id}
                  image={pokemonStats.sprites.other.dream_world.front_default}
                  name={pokemonStats.name}
                  type={pokemonStats.types[0].type.name}
                />{" "}
              </Link>
            ))}{" "}
          </div>
        </div>
      </div>
    </>
  );
}
export default App;
