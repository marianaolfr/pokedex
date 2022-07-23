const pokemonName = document.querySelector('.pokemonName');
const pokemonNumber = document.querySelector('.pokemonNumber');
const pokemonImg = document.querySelector('.pokemonImg');

const form = document.querySelector('.form');
const input = document.querySelector('.inputSearch');

const buttonPrev = document.querySelector('.btnPrev');
const buttonNext = document.querySelector('.btnNext');

let searchPokemon = 1;

const fetchPokemon = async (pokemon) => {
    
    const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);
    //await faz esperar o resultado da busca no fetch para retornar
    //apenas em funções assincronas (async)
    //evitar o erro 404 ao buscar um input que nao existe na API
    if (APIResponse.ok) {
        const dataPokemon = await APIResponse.json();
        console.log(APIResponse);
        return dataPokemon;

    }

}

//renderizar os dados na tela
const renderPokemon = async (pokemon) => {
    
    pokemonName.innerHTML = 'Loading...';
    pokemonNumber.innerHTML = '';

    const dataPokemon = await fetchPokemon(pokemon);
    //Informações da API
    if (dataPokemon) {
        pokemonImg.style.display = 'block';
    pokemonName.innerHTML = dataPokemon.name;
    pokemonNumber.innerHTML = dataPokemon.id
    pokemonImg.src = dataPokemon['sprites']['versions']['generation-v']['black-white']
    ['animated']['front_default'];
    //limpar o input
    input.value = '';
    searchPokemon = dataPokemon.id;
    } else {
        pokemonImg.style.display = 'none';
        pokemonName.innerHTML = 'Not Found :(';
        pokemonNumber.innerHTML = '';
    }
}

//pegar o input do formulario
form.addEventListener('submit', (e) => {
    //bloqueando o evento padrão dos formularios
    e.preventDefault();
    //obtendo valor do input 
    renderPokemon(input.value.toLowerCase());
});

buttonPrev.addEventListener('click', () => {
    if (searchPokemon > 1) {
        searchPokemon-=1;
        renderPokemon(searchPokemon);
    }
});

buttonNext.addEventListener('click', () => {
    searchPokemon+=1;
    renderPokemon(searchPokemon);
});

renderPokemon(searchPokemon);