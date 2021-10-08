const BASE_URL = 'https://pokeapi.co/api/v2/'
const IMG_TAG = 'img'
const POKEMON_NAME_INPUT = 'name-input'
const POKEMON_IMG_PLACE = 'pokemon-img'
const POKEMON_DETAILS_PLACE = 'pokemon-details'

async function getPokemonByName(name){
    const pokemonURL = `${BASE_URL}pokemon/${name}`
    let pokemonData = null

    try{
        const response = await fetch(pokemonURL)
        pokemonData = await response.json()
        showPokemonImg(pokemonData)
        showPokemonInfo(pokemonData)
    } catch (error) {
        console.log(`Algo ha fallado: ${error.message}`)
    }
}

function showPokemonImg(pokemonData){
    const { sprites } = pokemonData
    const imgLink = sprites.front_default
    const img = document.createElement(IMG_TAG)
    img.src = imgLink
    const imgPlace = document.getElementById(POKEMON_IMG_PLACE)
    clear(imgPlace)
    imgPlace.appendChild(img)
}

function showPokemonInfo(pokemonData){
    const { abilities, name, height, weight, order } = pokemonData;
    let content = `Pokemon: ${name} <br/>`
    content += `Id: ${order} <br/>`
    content += `Height: ${height} <br/>`
    content += `Weight: ${weight} <br/>`
    content += `Abilities: '` + '<br/>'

    for(let index in abilities){
        content += `${index}) ${abilities[index].ability.name} <br/>`
    }

    const pokemonDetails = document.getElementById(POKEMON_DETAILS_PLACE)
    clear(pokemonDetails)
    pokemonDetails.innerHTML = content
}

const clear = section => section.innerHTML=''

function findPokemon(){
    let pokemonName = document.getElementById("name-input").value
    pokemonName = pokemonName.toLowerCase()
    if (pokemonName != ""){
        getPokemonByName(pokemonName)
    }
}