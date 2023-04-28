import React from "react";

export const PokemonDetails = ({
  height,
  weight,
  hp,
  attack,
  defense,
  speed,
}) => {
  return (
    <div className="stats">
      <h1>Stats:</h1>
      Height: <div className="stats-height">
                {height / 10}meters
        </div>
        Weight: <div className="stats-weight">
       {weight / 10}kilograms
        </div>
      HP:<div className="stats-hp">
         {hp}
      </div>
      Attack:<div className="stats-attack">
        {attack}
      </div>
      Defense: <div className="stats-deffense">
        {defense}
      </div>
      Speed: <div className="stats-speed">
        {speed}
      </div>

    </div>
  );
};
