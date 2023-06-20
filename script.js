let currentPokemon;
let offset = 1;
let pokemonLimit = 21;
let allPokemon = [];
let isLoading = false;
let allLoadedPokemons = [];


// Load all Pokemons for the NextCard Function
async function loadAllPokemon() {
    for (let i = 1; i < 898; i++) {
        let url = `https://pokeapi.co/api/v2/pokemon/${i}`;
        let response = await fetch(url);
        currentPokemon = await response.json();
        allLoadedPokemons.push(currentPokemon);
    }
}


// Load the first 20 Pokemons
async function loadPokemon() {
    for (let i = 1; i < pokemonLimit; i++) {
        let url = `https://pokeapi.co/api/v2/pokemon/${i}`;
        let response = await fetch(url);
        currentPokemon = await response.json();
        allPokemon.push(currentPokemon);

        renderPokemon(i);
    }
    window.addEventListener('scroll', ScrollForMorePokemon);
}


// Function to load the next 20 Pokemons
const ScrollForMorePokemon = async () => {
    if (!isLoading && (window.scrollY + window.innerHeight + 1000 > document.body.clientHeight)) {
        isLoading = true;
        for (let i = pokemonLimit; i < pokemonLimit + 20; i++) {

            let url = `https://pokeapi.co/api/v2/pokemon/${i}`;
            let res = await fetch(url);
            currentPokemon = await res.json();
            allPokemon.push(currentPokemon);
            renderPokemon(i);
        }
        pokemonLimit += 20;
        offset += 20;
        isLoading = false;
    }
}


// show the little Pokemon Cards
function renderPokemon(i) {
    let content = document.getElementById('showCards');
    content.innerHTML += showLittleCard(i),
        showLittleCardInfo(i),
        changeBackgroundColor(i);
}


// Function to reduce the renderPokemon Function
function showLittleCardInfo(i) {
    showName(i),
        showNumber(i),
        showImage(i),
        showType(i)
}


// Functions to show the little card information
function showName(i) {
    document.getElementById(`pokemonName${i}`).innerHTML = currentPokemon['name'];
}


function showNumber(i) {
    document.getElementById(`pokemonNumber${i}`).innerHTML = currentPokemon['id'];
}


function showImage(i) {
    document.getElementById(`pokemonImage${i}`).src = currentPokemon['sprites']['other']['home']['front_default'];
}


function showType(i) {
    for (let j = 0; j < currentPokemon['types'].length; j++) {
        let type = currentPokemon['types'][j]['type']['name'];
        document.getElementById(`pokemonTypes1${i}`).innerHTML += ` <p>${type}</p>`;
    }
}


// Load the Pokemoninformation again for the BigPokemon cards
async function loadBigPokemonCards(i) {
    let url = `https://pokeapi.co/api/v2/pokemon/${i}`;
    await fetch(url);
    renderBigPokemonCards(i);
}


// Show the BigPokemon cards if clicked on the little cards
function renderBigPokemonCards(i) {
    let info = document.getElementById(`showBigCard`);
    info.innerHTML = '';
    currentPokemon = allPokemon[i - 1];
    info.innerHTML += showBigCard(i), showBigCardInfo(i), changeProgressBarColor();
}


// Function to reduce the renderBigPokemonCards
function showBigCardInfo(i) {
    showBigName(i),
        showBigNumber(i),
        showBigType(i),
        showHeight(i),
        showWeight(i),
        loadPokeStats(i),
        showBigImage(i)
}


// Functions to show the big card information
function showBigName(i) {
    document.getElementById(`pokemonBigName${i}`).innerHTML = currentPokemon['name'];
}


function showBigNumber(i) {
    document.getElementById(`pokemonBigNumber${i}`).innerHTML = currentPokemon['id'];
}


function showBigType(i) {
    for (let j = 0; j < currentPokemon['types'].length; j++) {
        let type = currentPokemon['types'][j]['type']['name'];
        document.getElementById(`pokemonBigTypes1${i}`).innerHTML += `<p>${type}</p>`;
    }
}


function showHeight(i) {
    let height = currentPokemon['height'];
    document.getElementById(`pokemonBigTypes1${i}`).innerHTML += `<p>Height: ${height}</p>`;
}


function showWeight(i) {
    let weight = currentPokemon['weight'];
    document.getElementById(`pokemonBigTypes1${i}`).innerHTML += `<p>Weight: ${weight}</p>`;
}


function showBigImage(i) {
    document.getElementById(`pokemonBigImage${i}`).src = currentPokemon['sprites']['other']['home']['front_default'];
}


function loadPokeStats(i) {
    let content = document.getElementById(`info-container${i}`);
    for (let i = 0; i < currentPokemon['stats'].length; i++) {
        let stat = currentPokemon['stats'][i]['base_stat'];
        let statName = currentPokemon['stats'][i]['stat']['name'];
        content.innerHTML += showStats(i, stat, statName);
    }
}


// Function to show the BigPokemon cards when click on the little cards
function openBigCard(i) {
    document.getElementById('showBigCard').classList.remove('d-none');
    document.getElementById('closeDivBtn').classList.remove('d-none');
    document.getElementById('showBigCard').innerHTML += showBigCard(i);
    document.getElementById('showBigCard').style = 'z-index: 1';
    document.getElementById('closeDivBtn').style = 'z-index: 1';
    loadBigPokemonCards(i);
}


// Function to close the BigPokemon cards, when click on the cross
function closeBigCard() {
    document.getElementById('showBigCard').classList.add('d-none');
    document.getElementById('showBigCard').innerHTML = '';
    document.getElementById('showBigCard').style = 'z-index: -1';
    document.getElementById('closeDivBtn').classList.add('d-none');
    document.getElementById('closeDivBtn').style = 'z-index: -1';
}


//Function to close the BigPokemon cards, when click outside the bigCard
function closeDivBtn() {
    document.getElementById('showBigCard').classList.add('d-none');
    document.getElementById('showBigCard').innerHTML = '';
    document.getElementById('showBigCard').style = 'z-index: -1';
    document.getElementById('closeDivBtn').classList.add('d-none');
    document.getElementById('closeDivBtn').style = 'z-index: -1';
}


// Show the next bigCard without closing, right arrow
function nextCard(i) {
    if (i == 898) {
        loadBigPokemonCards(898);
    } else {
        let nextPokemon = i + 1;
        document.getElementById(`bigCard${nextPokemon}`);
        document.getElementById('showBigCard').style = 'z-index: 2';
        loadBigPokemonCards(nextPokemon);
    }
}


//Show the previous bigCard without closing, left arrow
function previousCard(i) {
    if (i == 1) {
        loadBigPokemonCards(1);
    } else {
        let previousPokemon = i - 1;
        document.getElementById(`bigCard${previousPokemon}`);
        document.getElementById('showBigCard').style = 'z-index: 2';
        loadBigPokemonCards(previousPokemon);
    }
}


function searchPokemon() {
    let search = document.getElementById('search').value;
    search = search.toLowerCase();
    let content = document.getElementById('showCards');
    content.innerHTML = '';
    for (let i = 0; i < allPokemon.length; i++) {
        let name = allPokemon[i]['name'];
        if (name.toLowerCase().includes(search)) {
            currentPokemon = allPokemon[i];
            renderPokemon(i + 1);
        }
    }
}


//Templates and Background Color


function showLittleCard(i) {
    let type = currentPokemon['types']['0']['type']['name'];
    return `<div id="card${i}" class="card ${type}" onclick="openBigCard(${i})">
                <div class="card-name">
                    <h2 id="pokemonName${i}"></h2>
                    <h2 id="pokemonNumber${i}"></h2>
                </div>
                <div class="card-image">
                    <img id="pokemonImage${i}">
                </div>
                <div id="pokemonTypes1${i}" class="card-types">
                </div>
            </div>`;
}


function showStats(i, stat, statName) {
    return `
    <div class="info-container-name">
        <p>${statName}</p>
        <div class="w3-border">
            <div id="processBarValue${i}" class="w3-grey" style="width: ${stat}%"><p>${stat}</p></div>
        </div>
    </div>`;
}


function showBigCard(i) {
    currentPokemon = allPokemon[i - 1];
    let type = currentPokemon['types']['0']['type']['name'];
    return `
        <div id="bigCard${i}" class="big-card ${type}">
        <div class="big-card-head">
            <div class="big-card-header-arrow"> 
                <img onclick="previousCard(${i})" src="img/left.png">
            </div>
            <div class="big-card-header">
                <h1 id="pokemonBigName${i}"></h1>
                <div class="close-btn">
                    <img onclick="closeBigCard(${i})" src="img/cross.png">
                </div>
            </div>
            <div class="big-card-header-arrow"> 
                <img onclick="nextCard(${i})" src="img/right.png">
            </div>
        </div>
        <div class="big-card-info">
            <div id="pokemonBigTypes1${i}" class="big-card-info-content">
                <p id="pokemonBigNumber${i}"></p>
            </div>
            <div class="big-card-info-image">
                <img id="pokemonBigImage${i}">
            </div>
        </div>
        <div id="info-container${i}" class="info-container"></div>
    </div>`;
}


// Change the background color of the little and big Pokemon card. According the to the type
function changeBackgroundColor(i) {
    let type = currentPokemon['types']['0']['type']['name'];
    document.getElementById(`card${i}`).classList.add = type;
};


// Change progressbar color to red, when the value is above 100
function changeProgressBarColor() {
    for (let i = 0; i < currentPokemon['stats'].length; i++) {
        let stat = currentPokemon['stats'][i]['base_stat'];
        if (stat > 100) {
            document.getElementById(`processBarValue${i}`).style = 'background-color: #ff4500ab';
        }
    }
}