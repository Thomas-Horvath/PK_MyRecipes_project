const $CONTAINER = document.querySelector('.js-container'); // kiválasztunk egy elemet a html elemek közül
const API_URL = "https://dummyjson.com/recipes?limit=100"; // elmentjuk az API url-jét


fetch(API_URL) // kérést küldünk az url-re
    .then(response => response.json()) //amint válaszolt azután kapunk egy választ amit json formátummá alakítjuk.
    .then((data) => render(data.recipes)); //aztán fogjuk a kapott adatot és csinálunk vele valamit. (átpasszoljuk a render függvénynek)


function createRecipeTemplate(recipe) {
    return `<div class="recipe">
        <div class="recipe-top">
            <img src="https://cdn.dummyjson.com/recipe-images/1.webp" alt="Pizza">
        </div>
        <div class="recipe-bottom">
            <h2>Pizza</h2>

            <div class="recipe-rating flex-around-center ">
                <div>
                    <i class="fa-solid fa-star"></i>
                    <i class="fa-solid fa-star"></i>
                    <i class="fa-solid fa-star"></i>
                    <i class="fa-solid fa-star-half-stroke"></i>
                    <i class="fa-regular fa-star"></i>
                </div>
                <p>4.9</p>
            </div>


            <div class="recipe-data flex-around-center ">
                <i class="fa-regular fa-clock"></i>
                <p>Prep: <span>15 min</span></p>
                <p>Cooking: <span>20 min</span></p>
            </div>


            <div class="recipe-text">
                <h3>Ingredients:</h3>
                <div class="recipe-grid">
                    <p>Pizza dough</p>
                    <p>Pizza dough</p>
                    <p>Pizza dough</p>
                    <p>Pizza dough</p>
                    <p>Pizza dough</p>
                    <p>Pizza dough</p>
                    <p>Pizza dough</p>
                </div>
            </div>
            <div class="recipe-text">
                <h3>Instruction:</h3>
                <p>Preheat the oven to 475°F (245°C).</p>
                <p>Roll out the pizza dough and spread tomato sauce evenly.</p>
                <p>Top with slices of fresh mozzarella and fresh basil leaves.</p>
            </div>
        </div>
    </div>`
};



function render(data) {
    const recipes = data.map((recipe) => createRecipeTemplate(recipe)).join("");
    $CONTAINER.innerHTML = recipes;
};

// Ezt csinálja a render függvény 
// 1. Megkapjuk az adatokat az api-tól. (data)
// 2. Map-el végig megyünk a kapott tömb összes elemén(objektumok vannak benne) és mindegyikre meghívjuk a 
//    createRecipeTamplate függvényt amivel egy tamplete stringet kapunk amiket öszzefűzünk a join metódussal. 
// 3. Ezután ezt elmentjük egy változóba.
// 4. Ennek a változónak az értékét kiíratjuk a már megkeresett container innerhtml-jébe.