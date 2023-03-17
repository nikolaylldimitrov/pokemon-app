import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { PokemonThumb } from "./components/PokemonThumnail";
import { Link } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroll-component";

export function App() {
  const [allPokemons, setAllPokemons] = useState([]);
  const [page, setPage] = useState(0);
  const url = `https://pokeapi.co/api/v2/pokemon?limit=24`;
  const getAllPokemons = async () => {
    const res = await fetch(url + `&offset=${page * 24}`);
    const data = await res.json();
    setPage(page + 1);
    console.log(data);

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

  return (
    <div className="main-container">
      <div className="pokemon-container">
        <h1>Pokemon Deck</h1>

        <div className="all-container">
          <div
            id="scrollableDiv"
            style={{
              height: 500,
              overflow: "auto",
              display: "flex",
              flexDirection: "column-reverse", 
            }}
          >
            <InfiniteScroll
              dataLength={allPokemons.lenght || 24}
              next={getAllPokemons}
              //style={{ display: "flex", }} //To put endMessage and loader to the top.
              inverse={true} //
              hasMore={true}
              loader={<h4>Loading...</h4>}
              scrollableTarget="scrollableDiv"
            >
              {allPokemons.map((pokemonStats, index) => (
                <Link to={`/pokemon/${pokemonStats.id}`}>
                  <PokemonThumb
                    key={index}
                    id={pokemonStats.id}
                    image={pokemonStats.sprites.other.dream_world.front_default}
                    name={pokemonStats.name}
                    type={pokemonStats.types[0].type.name}
                  />{" "}
                </Link>
              ))}{" "}
            </InfiniteScroll>
          </div>
        </div>
      </div>
    </div>
  );
}
export default App;
