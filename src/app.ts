// | => type d'union => permet d'avoir types alternatifs
// si container n'est pas type HTMLElement -> TS va vérifier si valeur = type any ici etc ...
const container: HTMLElement | any=document.getElementById("app")
const pokemons: number = 100

//Interface qui définit forme d'un objet pokemon -> sera utilisé dans fonction chargée d'affiché contenu
interface IPokemon{
      id: number;
      name: string;
      image: string;
      type: string;
}

//Fonction fetchData permet de parcourir nombre de pokemon à récupérer
//Pour chaque objet=> appel à getPokemon avec le numéro du pokemon
const fetchData = ():void => {
      for (let i=1; i<= pokemons; i++){
            getPokemon(i)
      }
}

//Récupération des données peut prendre du temps -> fonction asynchrone qui retourne une Promise de type void
//void = fonction ne retournera pas de valeur
const getPokemon = async (id:number): Promise<void> =>{
      const data: Response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
      const pokemon: any = await data.json()
      const pokemonType: string = pokemon.types
            .map((poke: any) => poke.type.name)
            .join(", ")

      //Une fois données récupérées -> création nouvel objet 'transformedPokemon' => reflète l'interface IPokemon
      const transformedPokemon = {
            id: pokemon.id,
            name: pokemon.name,
            image: `${pokemon.sprites.front_default}`,
            type: pokemonType
      }

      showPokemon(transformedPokemon)
}

//Fonction qui reçoit en param l'objet pokemon de type IPokemon et ne retourne aucune valeur
const showPokemon = (pokemon: IPokemon): void => {
      //Ajoutera simplement contenu html au fichier à l'aide de  l'id container <div id="container>
      let output: string = `
            <div class="card">
            <span class="card--id">#${pokemon.id}</span>
            <img class="card--image" src=${pokemon.image} alt=${pokemon.name} />
            <h1 class="card--name">${pokemon.name}</h1>
            <span class="card--details">${pokemon.type}</span>
        </div>
      `
      container.innerHTML += output
}

fetchData()