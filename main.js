// konstansok létrehozása:
const $CONTAINER = document.querySelector('.js-container'); // kiválasztunk egy elemet a html elemek közül
const limit = 100;  // a lekérni kívánt elemek száma
const API_URL = `https://dummyjson.com/recipes?limit=${limit}`; // elmentjuk az API url-jét
const INPUT = document.querySelector('.js-input');
const FORM = document.querySelector('.js-form');


const RECIPES = await fetchData(API_URL);
console.log(RECIPES)
async function fetchData(url) {
    const response = await fetch(url);
    const data = await response.json();
    return data.recipes;
};





/*
// kérés küldése az API-nak:
fetch(API_URL) // kérést küldünk az url-re
    .then(response => response.json()) //amint válaszolt azután kapunk egy választ amit json formátummá alakítjuk.
    .then((data) => render(data.recipes)); //aztán fogjuk a kapott adatot és csinálunk vele valamit. (átpasszoljuk a render függvénynek)
// ----------------------------------------------------------------


*/




// rating csillagok renderelése:
//1. Az adtok közül megkapja a rating értéket.
function createStars(recipeRating) {
    let rating = Math.floor(recipeRating); // Megkapjuk a reating egész értékét.  Ennyi teljes csillagot biztos meg kell jeleníteni.
    let rest = Math.round((recipeRating - rating) * 10); // Megkapjuk a rating tizedees értékét. 
    console.log(recipeRating, rating, rest);

    let starsHTML = '';

    //half star =  <i class="fa-solid fa-star-half-stroke"></i>

    for (let i = 0; i < 5; i++) {
        if (rating > 0) {
            starsHTML += `<i class="fa-solid fa-star"></i>`
            rating--
        } else if (rest > 0) {
            if (rest < 3) { // ha kissebb mint három a tizeds akkor egy üres csillagit kap
                starsHTML += ` <i class="fa-regular fa-star"></i>`
            } else if (rest < 7) { // ha nagyobb mint 3 de kissebb mint akkor egy fél csillaot kap
                starsHTML += `<i class="fa-solid fa-star-half-stroke"></i>`
            } else { // különben ha nagyobb int 7 akkor egy egész csillagot kap
                starsHTML += `<i class="fa-solid fa-star"></i>`
            }

        } else {
            starsHTML += ` <i class="fa-regular fa-star"></i>`
        }

    };

    return starsHTML;
};

//---------------------------------------------------------------------

function createParagraphList(list) {
    return list.map((item) => `<p>${item}</p>`).join("");
};


// ----------------------------------------------------------------
// a recept kártyák létrehozása:
function createRecipeTemplate(recipe) {
    const starsHTML = createStars(recipe.rating);
    const ingredients = createParagraphList(recipe.ingredients);
    const instructions = createParagraphList(recipe.instructions);
    return `<div class="recipe">
        <div class="recipe-top">
            <img src=${recipe.image} alt="${recipe.name}">
        </div>
        <div class="recipe-bottom">
            <h2>${recipe.name}</h2>

            <div class="recipe-rating flex-around-center ">
                <div>
                ${starsHTML}
                </div>
                <p>${recipe.rating}</p>
            </div>


            <div class="recipe-data flex-around-center ">
                <i class="fa-regular fa-clock"></i>
                <p>Prep: <span>${recipe.prepTimeMinutes} min</span></p>
                <p>Cooking: <span>${recipe.cookTimeMinutes} min</span></p>
            </div>


            <div class="recipe-text">
                <h3>Ingredients:</h3>
                <div class="recipe-grid">
                   ${ingredients}
                </div>
            </div>
            <div class="recipe-text">
                <h3>Instruction:</h3>
                ${instructions}
            </div>
        </div>
    </div>`
};






// ----------------------------------------------------------------
// Ezt csinálja a render függvény:
// 1. Megkapjuk az adatokat az api-tól. (data) - (fetch kérésben használjuk fel ezt a függvény)
// 2. Map-el végig megyünk a kapott tömb összes elemén(objektumok vannak benne) és mindegyikre meghívjuk a 
//    createRecipeTamplate függvényt amivel egy tamplete stringet kapunk amiket öszzefűzünk a join metódussal. 
// 3. Ezután ezt elmentjük egy változóba.
// 4. Ennek a változónak az értékét kiíratjuk a már megkeresett container innerhtml-jébe.

function render(data) {
    const recipes = data.map((recipe) => createRecipeTemplate(recipe)).join("");
    $CONTAINER.innerHTML = recipes;
    //console.log(recipes);
};



// ----------------------------------------------------------------
function inputEventHandler(e) {
    const filterValue = e.target.value.toLowerCase();
    console.log(filterValue);
    const filterData = RECIPES.filter( recipe => {
        return (
            recipe.name.toLowerCase().includes(filterValue)  || recipe.ingredients.join(' ').toLowerCase().includes(filterValue)
        );
    });
    
    render(filterData);
};

INPUT.addEventListener('input', inputEventHandler);
FORM.addEventListener('submit', e => e.preventDefault());


render(RECIPES);