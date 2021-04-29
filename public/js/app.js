"use strict";
// | => type d'union => permet d'avoir types alternatifs
// si container n'est pas type HTMLElement -> TS va vérifier si valeur = type any ici etc ...
const container = document.getElementById("app");
const pokemons = 100;
//Fonction fetchData permet de parcourir nombre de pokemon à récupérer
//Pour chaque objet=> appel à getPokemon avec le numéro du pokemon
const fetchData = () => {
    for (let i = 1; i <= pokemons; i++) {
        getPokemon(i);
    }
};
//Récupération des données peut prendre du temps -> fonction asynchrone qui retourne une Promise de type void
//void = fonction ne retournera pas de valeur
const getPokemon = async (id) => {
    const data = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
    const pokemon = await data.json();
    const pokemonType = pokemon.types
        .map((poke) => poke.type.name)
        .join(", ");
    //Une fois données récupérées -> création nouvel objet 'transformedPokemon' => reflète l'interface IPokemon
    const transformedPokemon = {
        id: pokemon.id,
        name: pokemon.name,
        image: `${pokemon.sprites.front_default}`,
        type: pokemonType
    };
    showPokemon(transformedPokemon);
};
//Fonction qui reçoit en param l'objet pokemon de type IPokemon et ne retourne aucune valeur
const showPokemon = (pokemon) => {
    //Ajoutera simplement contenu html au fichier à l'aide de  l'id container <div id="container>
    let output = `
            <div class="card">
            <span class="card--id">#${pokemon.id}</span>
            <img class="card--image" src=${pokemon.image} alt=${pokemon.name} />
            <h1 class="card--name">${pokemon.name}</h1>
            <span class="card--details">${pokemon.type}</span>
        </div>
      `;
    container.innerHTML += output;
};
fetchData();
