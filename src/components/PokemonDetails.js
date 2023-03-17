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
        
      <table>
        <tr>
          <td>Height</td>
          <td>{height / 10}meters</td>
        </tr>
        <tr>
          <td>Weight:</td>
          <td>{weight / 10}kilograms</td>
        </tr>
        <tr>
          <td> HP:</td>
          <td>{hp}</td>
        </tr>
        <td>Attack:</td>
        <td>{attack}</td>
        <tr>
       <td> Defense:</td>
       <td>{defense}</td>
        </tr>
        <tr>
        <td>Speed:</td>
        <td>{speed}</td>
        </tr>
      </table>
      
    </div>
  );
};
