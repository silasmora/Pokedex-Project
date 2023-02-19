import React, { useState, useEffect } from "react";
import './App.css'

const App = () => {
  const [pokemon, setPokemon] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchType, setSearchType] = useState("");
  const [searchWeakness, setSearchWeakness] = useState("");

  useEffect(() => {
    fetch("https://raw.githubusercontent.com/Biuni/PokemonGO-Pokedex/master/pokedex.json")
      .then(res => res.json())
      .then(data => setPokemon(data.pokemon))
      .catch(error => console.error(error));
  }, []);

  const handleSearchTermChange = event => {
    setSearchTerm(event.target.value);
  };

  const handleSearchTypeChange = event => {
    setSearchType(event.target.value);
  };

  const handleSearchWeaknessChange = event => {
    setSearchWeakness(event.target.value);
  };

  const filteredPokemon = pokemon
    .filter(
      pokemon =>
        pokemon.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
        (searchType === "" || pokemon.type.includes(searchType)) &&
        (searchWeakness === "" || pokemon.weaknesses.includes(searchWeakness))
    )
    .sort((a, b) => (a.num > b.num ? 1 : -1));

  return (
    <div className="App-header">
      <h1>Pokemon List</h1>
      <input
        type="text"
        placeholder="Search by name"
        value={searchTerm}
        onChange={handleSearchTermChange}
      />
      <select value={searchType} onChange={handleSearchTypeChange}>
        <option value="">All Types</option>
        <option value="Grass">Grass</option>
        <option value="Fire">Fire</option>
        <option value="Water">Water</option>
        <option value="Electric">Electric</option>
      </select>
      <select value={searchWeakness} onChange={handleSearchWeaknessChange}>
        <option value="">All Weaknesses</option>
        <option value="Fire">Fire</option>
        <option value="Water">Water</option>
        <option value="Electric">Electric</option>
        <option value="Grass">Grass</option>
      </select>
      <ul>
        {filteredPokemon.map(pokemon => (
          <li key={pokemon.id}>
            <h2>{pokemon.name}</h2>
            <p>Num: {pokemon.num}</p>
            <p>Type: {pokemon.type.join(", ")}</p>
            <p>Weaknesses: {pokemon.weaknesses.join(", ")}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;

