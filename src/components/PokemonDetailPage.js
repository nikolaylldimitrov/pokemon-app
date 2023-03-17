import React from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { PokemonThumb } from "./PokemonThumnail";
import { Link } from "react-router-dom";
import { PokemonDetails } from "./PokemonDetails";


export const PokemonDetailPage = () => {
  const { id } = useParams();
  const [detailPokemon, setDetailPokemon] = useState(null);

  const url = `https://pokeapi.co/api/v2/pokemon/${id}`;

  const getPokemonDetails = async () => {
    const res = await fetch(url);
    const data = await res.json();
    setDetailPokemon(data);
    console.log(data);
  };

  useEffect(() => {
    getPokemonDetails();
  }, []);
  console.log(detailPokemon);
  if (!detailPokemon) {
    return null;
  }
  return (
    <div>
      <Link to={`/`}>
        <div className="backButton"> Back </div>
      </Link>
      <div className='detailsPage-content'>
        <div className="pokeDetail-container">
          <PokemonThumb
            id={id}
            image={detailPokemon.sprites.other.dream_world.front_default}
            name={detailPokemon.name}
            type={detailPokemon.types[0].type.name}
          />
        </div>
        <PokemonDetails
          height={detailPokemon.height}
          weight={detailPokemon.weight}
          hp={detailPokemon.stats[0].base_stat}
          attack={detailPokemon.stats[1].base_stat}
          defense={detailPokemon.stats[2].base_stat}
          speed={detailPokemon.stats[5].base_stat}
        />
      </div>
    </div>
  );
};
