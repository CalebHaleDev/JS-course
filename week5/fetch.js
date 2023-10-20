const url = "https://pokeapi.co/api/v2/pokemon/ditto";
let results = null;
async function getPokemon(url, thenDo) {
  const response = await fetch(url);
  if (response.ok) {
    // .json() also returns a promise...so we await it as well.
    const data = await response.json(); //json(), text(), or blob() are used
    thenDo(data);
  }
} 

function doStuff(data) {
  results = data;
  console.log("first: ", results);
  document.querySelector("#output").innerHTML = 
    `Name:${results.name}
    Id:${results.id}
    Type:${results.type}
    height:${results.height}
    weight:${results.weight}
    Stats:${results.stats}`;
}

getPokemon(url, doStuff);
console.log("second: ", results);


function doStuffList(data) {
  const outList = document.querySelector("#outputList");
  console.log(data);
  pokeList = data.results;

  pokeEntry = document.createElement("li").innerText = `${pokeList.name}`;
  outList.innerHTML += pokeEntry; //or .appendChild? but inside the ul?

//   for each of the pokemon in the list: create a line of html to output it
// <li>${pokeList.name}</li>
// Add the new list to what was already in our output element.
// Run the new getPokemonList function, passing in urlList.
}



const urlList = "https://pokeapi.co/api/v2/pokemon";

// https://byui-cit.github.io/learning-modules/modules/js/fetch-basics/ponder1/

function sortPokemon(list){
  //Array.sort

  //example:
  //function compare(a, b) {
  // if (a is less than b by some ordering criterion) {
  //   return -1;
  // }
  // if (a is greater than b by the ordering criterion) {
  //   return 1;
  // }
  // // a must be equal to b
  // return 0;
}
}