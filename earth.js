const loadCategories = () => {
    fetch('https://openapi.programming-hero.com/api/categories')
        .then(response => response.json())
        .then(data => {
            displayCategories(data.categories)
            allPlanets();
        })
}

const allPlanets = () => {
    fetch('https://openapi.programming-hero.com/api/plants')
        .then(res => res.json())
        .then(planets => {
            removeActive();
            const allBtn = document.getElementById("all-planets");
            allBtn.classList.add("active");
            displayAllPlanets(planets.plants)
        })
}

const displayAllPlanets = (planets) => {
    const planetsContainer = document.getElementById('trees-container');
    planetsContainer.innerHTML = "";

    planets.forEach(planet => {
        const btnDiv = document.createElement("div");
        btnDiv.innerHTML = `
          <div class="bg-white p-4 rounded-xl shadow hover:shadow-md transition">
                        <img src="${planet.image}" alt="" class="w-full h-44 object-cover rounded-md mb-4">
                        <h3 onclick="loadPlanetsDetails(${planet.id})" class="font-semibold mb-4 cursor-pointer">${planet.name}</h3>
                        <p class="text-sm text-gray-600 mb-4">${planet.description}</p>
                        <div class="flex justify-between items-center mb-2">
                            <button
                                class="px-3 py-1 text-sm bg-green-100 text-green-800 font-semibold rounded-full mb-2">${planet.category}</button>
                            <p class="font-bold">৳${planet.price}</p>
                        </div>
                        <button
                            class=" w-full px-4 py-2 bg-green-600 text-white text-sm font-semibold rounded-full hover:bg-green-800 cursor-pointer transition">Add
                            to
                            Cart</button>
                    </div>
        `;
        planetsContainer.appendChild(btnDiv);
    })
}

const removeActive = () => {
    const planetsBtn = document.querySelectorAll('.planets-btn');
    planetsBtn.forEach((btn) => btn.classList.remove("active"));
}

const leadTrees = (id) => {
    const url = `https://openapi.programming-hero.com/api/category/${id}`;
    fetch(url)
        .then(response => response.json())
        .then(tree => {
            removeActive();
            const ClickBtn = document.getElementById(`categories-btn-${id}`);
            ClickBtn.classList.add("active");
            displayPlants(tree.plants)
        })
}

const displayPlants = (trees) => {
    const treesContainer = document.getElementById('trees-container');
    treesContainer.innerHTML = "";

    trees.forEach(tree => {
        const createDiv = document.createElement('div')
        createDiv.innerHTML = `
         <div class="bg-white p-4 rounded-xl shadow hover:shadow-md transition">
                        <img src="${tree.image}" alt="" class="w-full h-44 object-cover rounded-md mb-4">
                        <h3 onclick="loadPlanetsDetails(${tree.id})" class="font-semibold mb-4 cursor-pointer">${tree.name}</h3>
                        <p class="text-sm text-gray-600 mb-4">${tree.description}</p>
                        <div class="flex justify-between items-center mb-2">
                            <button
                                class="px-3 py-1 text-sm bg-green-100 text-green-800 font-semibold rounded-full mb-2">${tree.category}</button>
                            <p class="font-bold">৳${tree.price}</p>
                        </div>
                        <button
                            class=" w-full px-4 py-2 bg-green-600 text-white text-sm font-semibold rounded-full hover:bg-green-800 cursor-pointer transition">Add
                            to
                            Cart</button>
                    </div>
        `;
        treesContainer.appendChild(createDiv);
    })
}

const loadPlanetsDetails = (id) => {
    fetch(`https://openapi.programming-hero.com/api/plant/${id}`)
        .then(rec => rec.json())
        .then(plant => displayPlantsDetails(plant.plants))
}

const displayPlantsDetails = (trees) => {
    const detailsContainer = document.getElementById('details-container');
    detailsContainer.innerHTML = `
     <div>
                    <h2 class="text-2xl font-bold">${trees.name}</h2>
                </div>
                <div>
                    <img src="${trees.image}" alt="" class="w-full h-44 object-cover rounded-md mb-4">
                </div>
                <div>
                    <p><span class="font-semibold">category:</span> ${trees.category}</p>
                </div>
                <div>
                    <p><span class="font-semibold">price:</span> ৳${trees.price}</p>
                </div>
                <div>
                    <p><span class="font-semibold">description:</span> ${trees.description}</p>
                </div>
    `;
    document.getElementById('tree_model').showModal();
}

const displayCategories = (categories) => {
    const categoriesContainer = document.getElementById('categories-container');
    categoriesContainer.innerHTML = "";

    const allBtnDiv = document.createElement("div");
    allBtnDiv.innerHTML = `
    <button 
      id="all-planets" 
      onclick="allPlanets()"
      class="w-full text-left px-3 py-2 mb-3 rounded-md hover:bg-green-200 cursor-pointer planets-btn">
      All Trees
    </button>
  `;
    categoriesContainer.appendChild(allBtnDiv);

    categories.forEach(categorie => {
        const btnDiv = document.createElement('div');
        btnDiv.innerHTML = `
        <button id="categories-btn-${categorie.id}"  onclick="leadTrees('${categorie.id}')" class="w-full text-left px-3 py-2 mb-3 rounded-md hover:bg-green-200 cursor-pointer planets-btn">${categorie.category_name}</button>
        `;
        categoriesContainer.appendChild(btnDiv);
    });
};

let planetsTree = [];
const cardContainer = document.getElementById('cart-items');
const treeContainer = document.getElementById('trees-container');
const cardTotal = document.getElementById('cart-total');

treeContainer.addEventListener("click", (e) => {
    if (e.target.innerText === 'Add to Cart') {
        handelPlanets(e);
    }
});

const handelPlanets = (e) => {
    const planetsName = e.target.parentNode.children[1].innerText;
    const planetsPrice = e.target.parentNode.children[3].children[1].innerText;

    const confirmAd = confirm(`Do you want to add "${planetsName}" to your cart? It will be saved in your cart and available at checkout.`);
    if (!confirmAd) return;

    const found = planetsTree.find(item => item.planetsName === planetsName);

    if (found) {
        found.qty += 1;
    } else {
        planetsTree.push({
            planetsName: planetsName,
            planetsPrice: planetsPrice,
            qty: 1
        });
    }

    ShowPlanets(planetsTree);
};

const ShowPlanets = (planets) => {
    cardContainer.innerHTML = "";
    let total = 0;

    planets.forEach(planet => {
        const priceNumber = parseFloat(String(planet.planetsPrice).replace(/[^\d.]/g, ""));
        total += priceNumber * planet.qty;

        const createLi = document.createElement('li');
        createLi.className =
            "bg-green-50 px-3 py-2 rounded-md flex justify-between items-start";
        createLi.innerHTML = `
            <div>
                <p class="font-medium">${planet.planetsName}</p>
                <p class="text-sm text-gray-600">৳${priceNumber} × ${planet.qty}</p>
            </div>
            <button class="remove text-red-500 font-bold ml-2 cursor-pointer">✖</button>
        `;

        createLi.querySelector(".remove").addEventListener("click", () => {
            const item = planetsTree.find(p => p.planetsName === planet.planetsName);
            if (item) {
                if (item.qty > 1) {
                    item.qty -= 1;
                } else {
                    planetsTree = planetsTree.filter(p => p.planetsName !== planet.planetsName);
                }
                ShowPlanets(planetsTree);
            }
        });
        cardContainer.appendChild(createLi);
    });
    cardTotal.textContent = `৳${total}`;
};

loadCategories();
